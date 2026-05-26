import Grid from '@/components/app-grid';
import type { Config } from '@/types/crud';
import { Button } from './ui/button';

const Crud = () => {
    const config: Config = {
        columns: [
            {
                name: 'id',
                label: 'ID',
            },
            {
                name: 'name',
                label: 'Name',
            },
            {
                name: 'email',
                label: 'Email',
            },
        ],
        data: [
            {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
            },
            {
                id: 2,
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
            },
        ],
        title: 'Users',
    };

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <h1>{config.title}</h1>
                <Button variant="outline">Add New</Button>
            </div>
            <Grid config={config} />
        </>
    );
};

export default Crud;
