import { ColumnSort } from '../types/column-sort.type';

export interface DfmTableHeader {
  id?: string;
  title: string;
  isSortable?: boolean;
  sort?: ColumnSort;
  tooltip?: string;
  isDisabled?: boolean;
  isAction?: boolean;
}
