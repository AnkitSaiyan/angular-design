import { TestBed } from '@angular/core/testing';

import { DataTableSizeService } from './data-table-size.service';

describe('DataTableSizeService', () => {
  let service: DataTableSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTableSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
