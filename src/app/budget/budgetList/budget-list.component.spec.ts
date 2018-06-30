import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetListComponent } from './budget-list.component';
import { of } from 'rxjs/internal/observable/of';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('BudgetListComponent', () => {
  let component: BudgetListComponent;
  let fixture: ComponentFixture<BudgetListComponent>;
  const activateRouteMock = {
    data: of({
      budgetList: []
    })
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetListComponent],
      providers: [{ provide: ActivatedRoute, useValue: activateRouteMock }],
      imports: [RouterModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
