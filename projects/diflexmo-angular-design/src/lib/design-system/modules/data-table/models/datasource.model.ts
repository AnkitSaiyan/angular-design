import { TableRow } from "./table-row.model";

export interface DfmDatasource<T> {
    items: Array<TableRow<T>>;
    total?: number;
    isInitialLoading?: boolean;
    isLoading?: boolean;
    isLoadingMore?: boolean;
}