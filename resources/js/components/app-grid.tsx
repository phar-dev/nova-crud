import { type ReactNode } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { Config, DataItem } from '@/types/crud';

type GridProps = {
    config: Config;
    data: DataItem[];
};

const Grid = ({ config, data }: GridProps) => {
    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {config.columns.map((column) => (
                            <TableHead key={column.name}>
                                {column.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            {config.columns.map((column) => (
                                <TableCell key={column.name}>
                                    {row[column.name] as ReactNode}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Grid;
