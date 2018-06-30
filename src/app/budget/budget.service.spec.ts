import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { BudgetItem } from './budget.types';
import { BudgetService } from './budget.service';


describe('BudgetItemService', () => {

  const budgetItemList: BudgetItem[] = [];
  budgetItemList.push({ id: 1, amount: 1900, description: 'Mortgage', categoryId: 7 });
  budgetItemList.push({ id: 2, amount: 200, description: 'OPPD', categoryId: 8 });

  let service: BudgetService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(BudgetService);
  });

  afterEach(() => {    
    //Question: What does this do? What is it's important be able to explain.
    httpTestingController.verify();
  });

  it('It should call GET with the correcty URL', () => {

    service.getBudgetItemList(1).subscribe((data: BudgetItem[]) => {
      //Question: What good is this expect What are you testing?
      expect(data).toEqual(budgetItemList);
    });

    const request: TestRequest = httpTestingController.expectOne(service.getBudgetItemsListUrl + '?id=1');

    expect(request.request.method).toEqual('GET');
    request.flush(budgetItemList);   

  });

});