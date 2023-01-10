import { TableRow } from "./table-row.model";

export interface DfmDatasource {
    items: Array<TableRow>;
    total?: number;
    isInitialLoading?: boolean;
    isLoading?: boolean;
    isLoadingMore?: boolean;
}