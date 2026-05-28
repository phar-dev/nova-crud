import { Form, Head } from '@inertiajs/react';
import users, { store } from '@/routes/users';
import UserForm from './components/UserForm';
import config from './config';

export default function Create({ roles }: { roles: Array<{ id: number; name: string }> }) {
  return (
    <>
      <Head title="Create User" />

      <h1 className="mb-6 text-2xl font-semibold">Create User</h1>

      <Form {...store.form()} className="max-w-lg space-y-6">
        {({ processing, errors }) => (
          <UserForm
            config={config}
            errors={errors}
            processing={processing}
            roles={roles}
          />
        )}
      </Form>
    </>
  );
}

Create.layout = {
  breadcrumbs: [
    {
      title: 'Users',
      href: users.index() as never,
    },
    {
      title: 'Create',
      href: users.create() as never,
    },
  ],
};
