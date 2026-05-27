import { Link, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import AppPagination from '@/components/app-pagination';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { CrudConfig, DataItem } from '@/types/crud';
import type { PaginationMeta } from '@/types/pagination';

type GridProps<T extends DataItem> = {
    config: CrudConfig<T>;
    data: T[];
    meta?: PaginationMeta;
};

const Grid = <T extends DataItem>({ config, data, meta }: GridProps<T>) => {
    const [deleteItem, setDeleteItem] = useState<T | null>(null);

    const handleDelete = () => {
        if (!deleteItem || !config.deleteRoute) {
            return;
        }

        const url = config.deleteRoute(deleteItem);
        router.delete(url, {
            onSuccess: () => setDeleteItem(null),
            onError: () => setDeleteItem(null),
        });
    };

    const hasActions =
        (config.actions && config.actions.length > 0) || config.deleteRoute;

    return (
        <>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {config.columns.map((column) => (
                                <TableHead key={String(column.key)}>
                                    {column.label}
                                </TableHead>
                            ))}
                            {hasActions && (
                                <TableHead className="w-25 text-right">
                                    Actions
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        config.columns.length +
                                        (hasActions ? 1 : 0)
                                    }
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    {config.emptyMessage ?? 'No data found'}
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row) => (
                                <TableRow key={row.id}>
                                    {config.columns.map((column) => (
                                        <TableCell key={String(column.key)}>
                                            {column.render
                                                ? column.render(row)
                                                : (row[
                                                      column.key as keyof T
                                                  ] as ReactNode)}
                                        </TableCell>
                                    ))}
                                    {hasActions && (
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                {config.actions?.map(
                                                    (action, i) => {
                                                        const href =
                                                            action.href?.(row);
                                                        const btn = (
                                                            <Button
                                                                key={i}
                                                                variant={
                                                                    action.variant ??
                                                                    'ghost'
                                                                }
                                                                size="sm"
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={
                                                                        href ??
                                                                        '#'
                                                                    }
                                                                >
                                                                    {
                                                                        action.icon
                                                                    }
                                                                    <span className="sr-only">
                                                                        {
                                                                            action.label
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </Button>
                                                        );

                                                        return btn;
                                                    },
                                                )}
                                                {config.deleteRoute && (
                                                    <Dialog
                                                        onOpenChange={(
                                                            open,
                                                        ) => {
                                                            if (!open) {
                                                                setDeleteItem(
                                                                    null,
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    setDeleteItem(
                                                                        row,
                                                                    )
                                                                }
                                                            >
                                                                <Trash2 className="text-destructive" />
                                                                <span className="sr-only">
                                                                    Delete
                                                                </span>
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    Delete{' '}
                                                                    {config.resourceName ??
                                                                        'item'}
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    This action
                                                                    cannot be
                                                                    undone. Are
                                                                    you sure you
                                                                    want to
                                                                    delete this{' '}
                                                                    {config.resourceName ??
                                                                        'item'}
                                                                    ?
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <DialogClose
                                                                    asChild
                                                                >
                                                                    <Button variant="outline">
                                                                        Cancel
                                                                    </Button>
                                                                </DialogClose>
                                                                <Button
                                                                    variant="destructive"
                                                                    onClick={
                                                                        handleDelete
                                                                    }
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                )}
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            {meta && <AppPagination meta={meta} />}
        </>
    );
};

export default Grid;
