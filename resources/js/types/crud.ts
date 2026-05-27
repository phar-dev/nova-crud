import type { ReactNode } from 'react';

export type Column = {
    name: string;
    label: string;
};

export type FormField = {
    name: string;
    label: string;
    type?: 'text' | 'email' | 'password';
    autoComplete?: string;
    placeholder?: string;
    showFor?: 'create' | 'edit' | 'both';
};

export type Filter = {
    key: string;
    label: string;
    type: 'select';
    placeholder?: string;
    options: { value: string; label: string }[];
};

export type Config = {
    columns: Column[];
    fields?: FormField[];
    title: string;
};

export type DataItem = {
    id: string | number;
    [index: string]: unknown;
};

export type CrudColumn<T extends DataItem> = {
    key: keyof T | string;
    label: string;
    render?: (item: T) => ReactNode;
};

export type CrudAction<T extends DataItem> = {
    label: string;
    icon?: ReactNode;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    href?: (item: T) => string;
    permission?: string;
};

export type CrudConfig<T extends DataItem = DataItem> = {
    title: string;
    description?: string;
    columns: CrudColumn<T>[];
    fields?: FormField[];
    createRoute?: string;
    createButtonLabel?: string;
    createPermission?: string;
    emptyMessage?: string;
    resourceName?: string;
    filters?: Filter[];
    actions?: CrudAction<T>[];
    deleteRoute?: (item: T) => string;
    deletePermission?: string;
};
