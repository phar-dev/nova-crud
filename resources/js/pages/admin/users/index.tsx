import { Head } from '@inertiajs/react';
import Crud from '@/components/app-crud';
import users from '@/routes/users';
import type { User } from '@/types';
import type { PaginationMeta } from '@/types/pagination';
import config from './config';

export default function Users({
    data,
    meta,
}: {
    data: User[];
    meta?: PaginationMeta;
}) {
    return (
        <>
            <Head title="Users" />
            <Crud config={config} data={data} meta={meta} />
        </>
    );
}

Users.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: users.index().url,
        },
    ],
};
