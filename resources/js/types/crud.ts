export type Column = {
    name: string;
    label: string;
};

export type Config = {
    columns: Column[];
    title: string;
};

export type DataItem = {
    id: string | number;
    [index: string]: unknown;
};
