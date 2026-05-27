import { Form, Head } from '@inertiajs/react';
import roles, { store } from '@/routes/roles';
import RoleForm from './components/RoleForm';
import config from './config';

export default function Create({ permissions }: { permissions: Array<{ id: number; name: string }> }) {
    return (
        <>
            <Head title="Create Role" />

            <h1 className="mb-6 text-2xl font-semibold">Create Role</h1>

            <Form {...store.form()} className="max-w-lg space-y-6">
                {({ processing, errors }) => (
                    <RoleForm
                        config={config}
                        errors={errors}
                        processing={processing}
                        permissions={permissions}
                    />
                )}
            </Form>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Roles',
            href: roles.index() as never,
        },
        {
            title: 'Create',
            href: roles.create() as never,
        },
    ],
};
