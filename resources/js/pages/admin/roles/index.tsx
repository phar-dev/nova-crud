import { Head } from '@inertiajs/react';
import Crud from '@/components/app-crud';
import roles from '@/routes/roles';
import type { PaginationMeta } from '@/types/pagination';
import type { Role } from '@/types';
import config from './config';

export default function Roles({
    data,
    meta,
}: {
    data: Role[];
    meta?: PaginationMeta;
}) {
    return (
        <>
            <Head title="Roles" />
            <Crud config={config} data={data} meta={meta} />
        </>
    );
}

Roles.layout = {
    breadcrumbs: [
        {
            title: 'Roles',
            href: roles.index().url,
        },
    ],
};
