import { format, parseISO } from 'date-fns';
import { Pencil } from 'lucide-react';
import users from '@/routes/users';
import type { User } from '@/types';
import type { CrudConfig } from '@/types/crud';

const config: CrudConfig<User> = {
    title: 'Users',
    description: 'Manage system users',
    createRoute: users.create.url(),
    createButtonLabel: 'New User',
    createPermission: 'users.create',
    deletePermission: 'users.delete',
    emptyMessage: 'No users found',
    resourceName: 'user',

    columns: [
        {
            key: 'id',
            label: 'ID',
        },
        {
            key: 'name',
            label: 'Name',
        },
        {
            key: 'email',
            label: 'Email',
        },
        {
            key: 'created_at',
            label: 'Created At',
            render: (user) => format(parseISO(user.created_at), 'dd/MM/yyyy'),
        },
    ],

    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            autoComplete: 'name',
            placeholder: 'Full name',
            showFor: 'both',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            autoComplete: 'username',
            placeholder: 'email@example.com',
            showFor: 'both',
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            autoComplete: 'new-password',
            placeholder: 'Password',
            showFor: 'create',
        },
        {
            name: 'password_confirmation',
            label: 'Confirm Password',
            type: 'password',
            autoComplete: 'new-password',
            placeholder: 'Confirm password',
            showFor: 'create',
        },
    ],

    actions: [
        {
            label: 'Edit',
            icon: <Pencil />,
            variant: 'ghost',
            href: (user) => users.edit.url(user.id),
            permission: 'users.edit',
        },
    ],

    deleteRoute: (user) => users.destroy.url(user.id),
};

export default config;
