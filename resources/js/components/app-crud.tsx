import { usePage } from '@inertiajs/react';
import Grid from '@/components/app-grid';
import type { CrudConfig, DataItem } from '@/types/crud';
import { Button } from './ui/button';

type CrudProps = {
    config?: CrudConfig;
    data?: DataItem[];
    meta?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number | null;
        to: number | null;
    };
};

const Crud = ({ config, data, meta }: CrudProps) => {
    const { auth } = usePage().props;

    const defaultConfig: CrudConfig = {
        columns: [
            {
                key: 'id',
                label: 'ID',
            },
            {
                key: 'created_at',
                label: 'Created At',
            },
        ],
        title: 'CRUD',
    };

    const merged = config || defaultConfig;

    const canCreate =
        !merged.createPermission ||
        auth.permissions.includes(merged.createPermission);

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{merged.title}</h1>
                {merged.createRoute && canCreate && (
                    <Button variant="outline" asChild>
                        <a href={merged.createRoute}>
                            {merged.createButtonLabel || 'Add New'}
                        </a>
                    </Button>
                )}
            </div>

            {merged.description && (
                <p className="mb-4 text-sm text-muted-foreground">
                    {merged.description}
                </p>
            )}

            {data && data.length > 0 ? (
                <Grid
                    columns={merged.columns}
                    data={data}
                    actions={merged.actions}
                    deleteRoute={merged.deleteRoute}
                    deletePermission={merged.deletePermission}
                />
            ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">
                    {merged.emptyMessage || 'No records found'}
                </p>
            )}

            {meta && (
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                        Showing {meta.from ?? 0} to {meta.to ?? 0} of{' '}
                        {meta.total}
                    </span>
                </div>
            )}
        </>
    );
};

export default Crud;
