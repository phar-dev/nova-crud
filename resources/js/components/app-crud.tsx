import { Link } from '@inertiajs/react';
import Grid from '@/components/app-grid';
import type { CrudConfig, DataItem } from '@/types/crud';
import type { PaginationMeta } from '@/types/pagination';
import { Button } from './ui/button';

type CrudProps<T extends DataItem> = {
    config: CrudConfig<T>;
    data: T[];
    meta?: PaginationMeta;
};

const Crud = <T extends DataItem>({ config, data, meta }: CrudProps<T>) => {
    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{config.title}</h1>
                    {config.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                            {config.description}
                        </p>
                    )}
                </div>
                {config.createRoute && (
                    <Link href={config.createRoute}>
                        <Button variant="outline">
                            {config.createButtonLabel ?? 'Add New'}
                        </Button>
                    </Link>
                )}
            </div>
            <Grid config={config} data={data} meta={meta} />
        </>
    );
};

export default Crud;
