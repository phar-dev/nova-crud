export type Row = {
    id: number;
    name: string;
    email: string;
};

export type Column = {
    name: keyof Row;
    label: string;
};

export type Config = {
    columns: Column[];
    data: Row[];
    title: string;
};
