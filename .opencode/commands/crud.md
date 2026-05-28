---
description: Scaffold full CRUD resource (migration→frontend)
---

Load the `crud-scaffolder` skill then scaffold a complete CRUD resource.

## Usage

```
/crud Name column1:type:db_type column2:type:db_type
```

## Arguments ($ARGUMENTS)

First argument = singular PascalCase resource name (e.g., `Product`, `Category`).

Remaining arguments = column definitions in `name:type:db_type` format:
- `name` = snake_case column name (e.g., `title`, `is_active`)
- `type` = form field type: `text`, `email`, `number`, `password`, `textarea`, `select`, `date`
- `db_type` = migration column type: `string`, `text`, `integer`, `boolean`, `date`, `datetime`, `float`, `json`

If db_type omitted, infer from form type: `text`→`string`, `number`→`integer`, `date`→`date`, `password`→`string`.

## Examples

```
/crud Product title:text name:string description:text:text is_active:select:boolean price:number:float
/crud Category name:text name:string slug:text:string
/crud Tag name:text name:string
```

## Workflow

1. Load `crud-scaffolder` skill from `.agents/skills/crud-scaffolder/SKILL.md`
2. Parse $ARGUMENTS: first token = Name, rest = columns
3. Derive: table name (plural snake_case), model variable (camelCase), route name (plural snake_case)
4. Generate ALL 18 files listed in the skill manifest (migration → sidebar link)
5. Run `php artisan wayfinder:generate` after route registration
6. Run `vendor/bin/pint --format agent`
7. Run `php artisan test --compact --filter={Name}Controller`
8. Report each file created and test results
