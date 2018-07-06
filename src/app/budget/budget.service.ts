import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BudgetItem, Budget } from './budget.types';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {



  //TODO figure this out, what do you do when this is for Prod and not local host
  //What is the best way to do this? Inject a config?  
  getBudgetItemsListUrl = 'http://localhost/BugetMaker/api/budgetItemList';
  budgetControllerUrl = 'http://localhost/BugetMaker/api/budget';
  budgetItemControllerUrl = 'http://localhost/BugetMaker/api/budgetItem';
  constructor(private httpClient: HttpClient) { }

  getBudgetList = (): Observable<Budget[]> => {
    return this.httpClient.get<Budget[]>(this.budgetControllerUrl);
  }

  deleteBudgetItem = (budgetItemId: number): Observable<any> => {

    const options = {
      params: {
        id: budgetItemId.toString()
      }
    };

    return this.httpClient.delete<any>(this.budgetItemControllerUrl, options)
  }

  addBudgetItem = (budgetItem: BudgetItem): Observable<BudgetItem> => {

    return this.httpClient.post<BudgetItem>(this.budgetItemControllerUrl, budgetItem)
  }

  updateBudgetItem = (budgetItem: BudgetItem): Observable<BudgetItem> => {

    return this.httpClient.put<BudgetItem>(this.budgetItemControllerUrl, budgetItem)
  }

  getBudget = (budgetId: number): Observable<Budget> => {

    const options = {
      params: {
        id: budgetId.toString()
      }
    };

    return this.httpClient.get<Budget>(this.budgetControllerUrl, options);
  }

  getBudgetItemList = (budgetId: number): Observable<BudgetItem[]> => {

    const options = {
      params: {
        id: budgetId.toString()
      }
    };

    const params = new HttpParams();
    return this.httpClient.get<BudgetItem[]>(this.getBudgetItemsListUrl, options);
  }
}
