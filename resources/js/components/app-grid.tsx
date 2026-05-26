import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { Config } from '@/types/crud';

type GridProps = {
    config: Config;
};

const Grid = ({ config }: GridProps) => {
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
                    {config.data.map((row) => (
                        <TableRow key={row.id}>
                            {config.columns.map((column) => (
                                <TableCell key={column.name}>
                                    {row[column.name]}
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
