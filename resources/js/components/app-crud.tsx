import Grid from '@/components/app-grid';
import type { Config, DataItem } from '@/types/crud';
import { Button } from './ui/button';

type CrudProps = {
    config?: Config;
    data?: DataItem[];
};

const Crud = ({ config, data }: CrudProps) => {
    const defaultConfig: Config = {
        columns: [
            {
                name: 'id',
                label: 'ID',
            },
            {
                name: 'created_at',
                label: 'Created At',
            },
        ],
        title: 'CRUD',
    };

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <h1>{config?.title || defaultConfig.title}</h1>
                <Button variant="outline">Add New</Button>
            </div>
            <Grid config={config || defaultConfig} data={data || []} />
        </>
    );
};

export default Crud;
