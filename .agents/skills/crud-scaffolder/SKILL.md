---
name: crud-scaffolder
description: 'Scaffold full CRUD stack (backend + frontend) following nova-crud conventions. Trigger: "scaffold crud", "generate crud", "create crud for", "/crud", or when user wants to create a new admin-managed resource.'
license: Apache-2.0
metadata:
    version: 1.0.0
---

# CRUD Scaffolder

Scaffold a complete CRUD resource following the exact patterns used in this project. Generates all backend (migration, model, contract, service, controller, routes, form request) and frontend (Inertia pages, config, shared form) files with proper DI binding and Wayfinder integration.

## Expected Parameters

- **Name** (singular, PascalCase): e.g., `Product`, `Category`, `OrderItem`
- **Columns**: Array of `{name, type, db_type}` for migration and form fields

Valid column types for forms: `text`, `email`, `number`, `password`, `textarea`, `select`, `date`

Valid DB types: `string`, `text`, `integer`, `boolean`, `date`, `datetime`, `timestamp`, `float`, `json`

## Critical Patterns

### Naming Conventions

| Artifact            | Pattern                                   | Example (Name=Product)                                      |
| :------------------ | :---------------------------------------- | :---------------------------------------------------------- |
| Table               | snake_case, plural                        | `products`                                                  |
| Model               | PascalCase, singular                      | `app/Models/Product.php`                                    |
| Controller          | PascalCase, singular + `Controller`       | `app/Http/Controllers/Admin/ProductController.php`          |
| Service             | PascalCase, singular + `Service`          | `app/Services/ProductService.php`                           |
| Interface           | PascalCase, singular + `ServiceInterface` | `app/Contracts/Services/ProductServiceInterface.php`        |
| Form Request        | PascalCase, singular + `FormRequest`      | `app/Http/Requests/Products/ProductFormRequest.php`         |
| Migration           | snake_case, plural                        | `XXXX_XX_XX_XXXXXX_create_products_table.php`               |
| Frontend routes dir | kebab-case, plural                        | `resources/js/routes/products/`                             |
| Frontend pages dir  | kebab-case, plural                        | `resources/js/pages/admin/products/`                        |
| Frontend config     | camelCase                                 | `config.tsx`                                                |
| Frontend form       | PascalCase + `Form`                       | `components/ProductForm.tsx`                                |
| Nav item            | Title Case, plural                        | `'Products'` in sidebar                                     |
| Route name          | snake_case, plural                        | `products.index`, `products.create`, etc.                   |
| Route URI           | kebab-case, plural                        | `/products`, `/products/create`, `/products/{product}/edit` |

### Column → Form Field Mapping

```
string/char → type: 'text'
email       → type: 'email'
text        → type: 'textarea'
integer     → type: 'number'
boolean     → type: 'select' with Yes/No options
date        → type: 'date'
password    → type: 'password' (showFor: 'create' only)
```

## Quick Start

```bash
# Bootstrap: generates 10 files (model, migration, factory, seeder, policy, controller, form requests, tests)
php artisan make:model {Name} --all --pest
```

This creates: `app/Models/{Name}.php`, `database/factories/{Name}Factory.php`, `database/migrations/..._create_{table}_table.php`, `database/seeders/{Name}Seeder.php`, `app/Http/Requests/Store{Name}Request.php`, `app/Http/Requests/Update{Name}Request.php`, `app/Http/Controllers/{Name}Controller.php`, `app/Policies/{Name}Policy.php`, `tests/Feature/Models/{Name}Test.php`, `tests/Feature/Http/Controllers/{Name}ControllerTest.php`.

Then EDIT the generated files and CREATE the missing pieces below.

## Complete File Manifest

### Backend (PHP) — Edit generated files

1. **Migration** — `database/migrations/..._create_{table}_table.php` (generated, EDIT)
    - Follow `0001_01_01_000000_create_users_table.php` pattern
    - `$table->id();` + columns + `$table->timestamps();`

2. **Model** — `app/Models/{Name}.php` (generated, EDIT)
    - Follow `User.php` pattern: PHP 8 attributes (`#[Fillable]`, `#[Hidden]`), `HasFactory` trait, `casts()` method, PHPDoc property types
    - Make columns fillable. Hidden fields only for sensitive data (passwords, secrets)
    - No relationships unless specified

3. **Factory** — `database/factories/{Name}Factory.php` (generated, EDIT)
    - Follow `UserFactory.php`: `extends Factory`, define `definition()` with fake data per column
    - Add custom states for variations (e.g., `active()`, `inactive()`) if boolean

### Backend (PHP) — Create new files

4. **Service Interface** — `app/Contracts/Services/{Name}ServiceInterface.php`
    - Follow `UserServiceInterface.php` exactly: `list()`, `findById()`, `create()`, `update()`, `delete()`
    - `list()` returns `LengthAwarePaginator`, uses `array $filters = []`
    - `findById()` returns model, takes `int $id`
    - Use model as return type for `create()`, `update()`
    - `update()` and `delete()` take model instance as first param
    - Use `LengthAwarePaginator<int, Model>` PHPDoc on `list()`

5. **Service** — `app/Services/{Name}Service.php`
    - Follow `UserService.php`: implements interface, delegates to Model
    - `list()`: filter by `search` (LIKE on text columns), `sort` (with `-` prefix for DESC), `per_page`, `page`; fallback `orderBy('created_at', 'desc')`
    - `create()`: `Model::create($data)`
    - `update()`: `$model->fill($data)->save()`, skip empty password
    - `delete()`: `(bool) $model->delete()`

### Backend (PHP) — Replace generated files

6. **Form Request** (REPLACE generated `Store{Name}Request` + `Update{Name}Request`) — `app/Http/Requests/{Plural}/{Name}FormRequest.php`
    - Delete the two generated form requests
    - Follow `UserFormRequest.php`: get `$modelId` from route, unique rules ignore self
    - Validation rules based on column types

7. **Controller** (REPLACE generated `{Name}Controller`) — `app/Http/Controllers/Admin/{Name}Controller.php`
    - Delete the generated controller at `app/Http/Controllers/{Name}Controller.php`
    - Follow `UserController.php` exactly: constructor DI with interface, 6 resource actions
    - `index(Request)`: returns `inertia('admin/{plural}/index', ['data'=>..., 'meta'=>...])`
    - `create()`: returns `inertia('admin/{plural}/create')`
    - `store(FormRequest)`: `$service->create($validated)` → redirect to `{plural}.index`
    - `edit(Model)`: returns `inertia('admin/{plural}/[id]/edit', ['{model}'=>$model])`
    - `update(FormRequest, Model)`: `$service->update($model, $validated)` → redirect
    - `destroy(Model)`: `$service->delete($model)` → redirect

### Backend (PHP) — Register

8. **Route** — Add to `routes/web.php`
    - Add `use App\Http\Controllers\Admin\{Name}Controller;` at top
    - Add `Route::resource('{plural}', {Name}Controller::class);` inside the `auth,verified` middleware group (after the `users` resource line)

9. **Service Binding** — Update `app/Providers/AppServiceProvider.php`
    - Add `use App\Contracts\Services\{Name}ServiceInterface;` and `use App\Services\{Name}Service;`
    - Add `$this->app->bind({Name}ServiceInterface::class, {Name}Service::class);` in `register()`

### Backend (PHP) — Cleanup generated extras (delete if not needed)

- `database/seeders/{Name}Seeder.php` — delete unless explicitly requested
- `app/Policies/{Name}Policy.php` — delete; project uses service layer for auth
- `tests/Feature/Models/{Name}Test.php` — delete; replaced by feature test below
- `tests/Feature/Http/Controllers/{Name}ControllerTest.php` — delete; replaced by feature test below

10. **Test** — `tests/Feature/{Name}ControllerTest.php`
    - Follow `UserControllerTest.php` exactly: 8 tests covering:
        - index page renders
        - create page renders
        - can be created
        - creation requires valid data
        - edit page renders
        - can be updated
        - guests redirected to login (all 6 routes)
    - Use `User::factory()->create()->actingAs($this)` for auth

### Frontend (React/Inertia)

1. **Wayfinder Routes** — `resources/js/routes/{plural}/index.ts`
    - Generate by running `php artisan wayfinder:generate` AFTER routes are registered
    - OR manually create (but prefer generation)

2. **Index Page** — `resources/js/pages/admin/{plural}/index.tsx`

    ```tsx
    import { Head } from '@inertiajs/react';
    import Crud from '@/components/app-crud';
    import {plural} from '@/routes/{plural}';
    import type { {Name} } from '@/types';
    import type { PaginationMeta } from '@/types/pagination';
    import config from './config';

    export default function {Plural}({
        data,
        meta,
    }: {
        data: {Name}[];
        meta?: PaginationMeta;
    }) {
        return (
            <>
                <Head title="{Plural Title}" />
                <Crud config={config} data={data} meta={meta} />
            </>
        );
    }

    {Plural}.layout = {
        breadcrumbs: [
            {
                title: '{Plural Title}',
                href: {plural}.index().url,
            },
        ],
    };
    ```

3. **Create Page** — `resources/js/pages/admin/{plural}/create.tsx`

    ```tsx
    import { Form, Head } from '@inertiajs/react';
    import {plural}, { store } from '@/routes/{plural}';
    import {Name}Form from './components/{Name}Form';
    import config from './config';

    export default function Create() {
        return (
            <>
                <Head title="Create {Name}" />
                <h1 className="mb-6 text-2xl font-semibold">Create {Name}</h1>
                <Form {...store.form()} className="max-w-lg space-y-6">
                    {({ processing, errors }) => (
                        <{Name}Form config={config} errors={errors} processing={processing} />
                    )}
                </Form>
            </>
        );
    }

    Create.layout = {
        breadcrumbs: [
            { title: '{Plural Title}', href: {plural}.index() as never },
            { title: 'Create', href: {plural}.create() as never },
        ],
    };
    ```

4. **Edit Page** — `resources/js/pages/admin/{plural}/[id]/edit.tsx`

    ```tsx
    import { Form, Head } from '@inertiajs/react';
    import {plural}, { update } from '@/routes/{plural}';
    import {Name}Form from '../components/{Name}Form';
    import config from '../config';

    export default function Edit({ {modelVar} }: { {modelVar}: {{ id: number; [key: string]: unknown } }) {
        return (
            <>
                <Head title="Edit {Name}" />
                <h1 className="mb-6 text-2xl font-semibold">Edit {Name}</h1>
                <Form {...update.form({modelVar}.id)} className="max-w-lg space-y-6">
                    {({ processing, errors }) => (
                        <{Name}Form config={config} errors={errors} processing={processing} {modelVar}={{{modelVar}}} />
                    )}
                </Form>
            </>
        );
    }

    Edit.layout = {
        breadcrumbs: [
            { title: '{Plural Title}', href: {plural}.index() as never },
            { title: 'Edit', href: {plural}.edit({ id: ':id' } as never) as never },
        ],
    };
    ```

5. **Config** — `resources/js/pages/admin/{plural}/config.tsx`
    - Follow `config.tsx` exactly: `CrudConfig<{Name}>` with `title`, `description`, `createRoute`, `createButtonLabel`, `emptyMessage`, `resourceName`
    - `columns`: map each column (date columns use `date-fns` render)
    - `fields`: map each column to form field (type mapping above)
    - `actions`: `Pencil` icon linking to edit
    - `deleteRoute`: (item) => model.destroy.url(item.id)
    - Import `{Name}` from `@/types`

6. **Form Component** — `resources/js/pages/admin/{plural}/components/{Name}Form.tsx`
    - Follow `UserForm.tsx`: receives `config`, `errors`, `processing`, optional `{modelVar}`
    - Filters fields by `showFor`
    - Renders `<Label>`, `<Input>` or `<PasswordInput>`, `<InputError>` per field
    - Submit button text depends on `{modelVar}` presence

7. **Sidebar Link** — Update `resources/js/components/app-sidebar.tsx`
    - Add import: `import {plural} from '@/routes/{plural}';`
    - Add nav item in `mainNavItems` array (after Users):

        ```ts
        {
            title: '{Plural Title}',
            href: {plural}.index(),
            icon: {iconComponent},
        }
        ```

    - Choose an icon from `lucide-react` that fits the resource

8. **TypeScript Type** — Add type to `resources/js/types/auth.ts` (or a dedicated file)
    - Add the type export:

        ```ts
        export type {Name} = {
            id: number;
            {column_name}: {ts_type};
            created_at: string;
            updated_at: string;
            [key: string]: unknown;
        };
        ```

## Commands

### After creating all files, run

```bash
# Generate Wayfinder TypeScript routes
php artisan wayfinder:generate

# Format PHP files
vendor/bin/pint --format agent

# Run tests
php artisan test --compact --filter={Name}Controller
```

## Dev workflow after scaffolding

```bash
# If frontend not reflected:
npm run build
# or
composer run dev
```

## Verification Checklist

- [ ] Migration: `id` + all columns + `timestamps()`
- [ ] Model: `#[Fillable]`, `#[Hidden]` (if needed), `casts()`, `HasFactory`
- [ ] Interface: `list()`, `findById()`, `create()`, `update()`, `delete()`
- [ ] Service: implements interface, delegates to Model
- [ ] Controller: constructor DI with interface, 6 resource actions, Inertia renders
- [ ] Routes: `Route::resource()` inside auth+verified group
- [ ] Service binding: registered in `AppServiceProvider::register()`
- [ ] All 8 controller tests pass
- [ ] Frontend pages: index, create, edit
- [ ] Shared form component with create/edit mode
- [ ] Config with columns, fields, actions, delete
- [ ] Sidebar nav item added
- [ ] Wayfinder routes generated
- [ ] TypeScript type for the resource
- [ ] `pint --format agent` passed

## Resources

- **Reference files**: See `app/Http/Controllers/Admin/UserController.php`, `app/Services/UserService.php`, `app/Contracts/Services/UserServiceInterface.php`, `app/Http/Requests/Users/UserFormRequest.php`, `resources/js/pages/admin/users/` for exact patterns
