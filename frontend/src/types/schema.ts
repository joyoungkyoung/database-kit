export type ColumnType = {
    name: string;
    memo: string;
    type: "Number" | "String" | "Image" | "Boolean";
    isRequire?: boolean;
};
