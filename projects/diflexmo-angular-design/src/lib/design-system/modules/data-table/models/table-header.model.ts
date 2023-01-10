import { ColumnSort } from "../types/column-sort.type";

export interface DfmTableHeader {
    title: string;
    isSortable?: boolean;
    sort?: ColumnSort;
    tooltip?: string;
    isDisabled?: boolean;
}
  