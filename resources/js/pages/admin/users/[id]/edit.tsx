import { Form, Head } from '@inertiajs/react';
import users, { update } from '@/routes/users';
import UserForm from '../components/UserForm';
import config from '../config';

export default function Edit({ user }: { user: { id: number; name: string; email: string } }) {
    return (
        <>
            <Head title="Edit User" />

            <h1 className="mb-6 text-2xl font-semibold">Edit User</h1>

            <Form {...update.form(user.id)} className="max-w-lg space-y-6">
                {({ processing, errors }) => (
                    <UserForm
                        config={config}
                        errors={errors}
                        processing={processing}
                        user={user}
                    />
                )}
            </Form>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: users.index() as never,
        },
        {
            title: 'Edit',
            href: users.edit({ id: ':id' } as never) as never,
        },
    ],
};
