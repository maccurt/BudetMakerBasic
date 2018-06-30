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
  getBudgetListUrl = 'http://localhost/BugetMaker/api/budget';
  constructor(private httpClient: HttpClient) { }

  getBudgetList = (): Observable<Budget[]> => {
    return this.httpClient.get<Budget[]>(this.getBudgetListUrl);
  }

  getBudgetItemList = (budgetId: number): Observable<BudgetItem[]> => {

    var options = {
      params: {
        id: budgetId.toString()
      }
    }

    let params = new HttpParams();
    return this.httpClient.get<BudgetItem[]>(this.getBudgetItemsListUrl, options);
  }
}
