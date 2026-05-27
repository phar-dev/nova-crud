import { useState, type ReactNode } from 'react';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { CrudAction, CrudColumn, DataItem } from '@/types/crud';
import { Button } from './ui/button';

type GridProps = {
    columns: CrudColumn<DataItem>[];
    data: DataItem[];
    actions?: CrudAction<DataItem>[];
    deleteRoute?: (item: DataItem) => string;
};

const getColKey = (col: CrudColumn<DataItem>): string =>
    typeof col.key === 'string' ? col.key : String(col.key);

const getColValue = (row: DataItem, col: CrudColumn<DataItem>): ReactNode => {
    const key = getColKey(col);
    if (col.render) return col.render(row);

    return row[key] as ReactNode;
};

const Grid = ({ columns, data, actions, deleteRoute }: GridProps) => {
    const [deleteTarget, setDeleteTarget] = useState<DataItem | null>(null);

    const hasActions = (actions && actions.length > 0) || deleteRoute;

    const handleDelete = () => {
        if (!deleteTarget || !deleteRoute) return;

        router.delete(deleteRoute(deleteTarget));
        setDeleteTarget(null);
    };

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={getColKey(column)}>
                                {column.label}
                            </TableHead>
                        ))}
                        {hasActions && (
                            <TableHead className="w-[100px] text-right">
                                Actions
                            </TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            {columns.map((column) => (
                                <TableCell key={getColKey(column)}>
                                    {getColValue(row, column)}
                                </TableCell>
                            ))}
                            {hasActions && (
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        {actions?.map((action) => (
                                            <Button
                                                key={action.label}
                                                variant={
                                                    action.variant ?? 'ghost'
                                                }
                                                size="icon"
                                                asChild
                                            >
                                                <a
                                                    href={
                                                        action.href?.(row) ?? '#'
                                                    }
                                                >
                                                    {action.icon}
                                                </a>
                                            </Button>
                                        ))}
                                        {deleteRoute && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive"
                                                onClick={() =>
                                                    setDeleteTarget(row)
                                                }
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this item? This
                            action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteTarget(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Grid;
