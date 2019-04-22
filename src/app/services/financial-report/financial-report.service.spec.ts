import { TestBed } from '@angular/core/testing';

import { FinancialReportService } from './financial-report.service';

describe('FinancialReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinancialReportService = TestBed.get(FinancialReportService);
    expect(service).toBeTruthy();
  });
});
