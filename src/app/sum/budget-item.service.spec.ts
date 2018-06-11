import { TestBed, inject } from '@angular/core/testing';

import { BudgetItemService } from './budget-item.service';

describe('BudgetItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetItemService]
    });
  });

  it('should be created', inject([BudgetItemService], (service: BudgetItemService) => {
    expect(service).toBeTruthy();
  }));
});
