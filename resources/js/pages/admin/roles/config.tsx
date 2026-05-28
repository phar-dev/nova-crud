import { format, parseISO } from 'date-fns';
import { Pencil } from 'lucide-react';
import roles from '@/routes/roles';
import type { Role } from '@/types';
import type { CrudConfig } from '@/types/crud';

const config: CrudConfig<Role> = {
    title: 'Roles',
    description: 'Manage system roles',
    createRoute: roles.create.url(),
    createButtonLabel: 'New Role',
    createPermission: 'roles.create',
    deletePermission: 'roles.delete',
    emptyMessage: 'No roles found',
    resourceName: 'role',

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
            key: 'created_at',
            label: 'Created At',
            render: (role) => format(parseISO(role.created_at), 'dd/MM/yyyy'),
        },
    ],

    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            autoComplete: 'name',
            placeholder: 'Role name',
            showFor: 'both',
        },
    ],

    actions: [
        {
            label: 'Edit',
            icon: <Pencil />,
            variant: 'ghost',
            href: (role) => roles.edit.url(role.id),
            permission: 'roles.edit',
        },
    ],

    deleteRoute: (role) => roles.destroy.url(role.id),
};

export default config;
