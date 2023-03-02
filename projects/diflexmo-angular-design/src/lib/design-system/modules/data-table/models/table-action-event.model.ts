import { TableRow } from './table-row.model';

export interface DfmTableActionEvent<T> {
  actionId: string;
  row: TableRow<T>;
}
