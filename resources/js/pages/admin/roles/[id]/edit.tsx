import { Form, Head } from '@inertiajs/react';
import roles, { update } from '@/routes/roles';
import RoleForm from '../components/RoleForm';
import config from '../config';

export default function Edit({ role, permissions }: {
    role: { id: number; name: string; permissions: Array<{ id: number }> };
    permissions: Array<{ id: number; name: string }>;
}) {
    return (
        <>
            <Head title="Edit Role" />

            <h1 className="mb-6 text-2xl font-semibold">Edit Role</h1>

            <Form {...update.form(role.id)} className="max-w-lg space-y-6">
                {({ processing, errors }) => (
                    <RoleForm
                        config={config}
                        errors={errors}
                        processing={processing}
                        role={role}
                        permissions={permissions}
                    />
                )}
            </Form>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Roles',
            href: roles.index() as never,
        },
        {
            title: 'Edit',
            href: roles.edit({ id: ':id' } as never) as never,
        },
    ],
};
