import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BudgetItem } from './budget-item.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetItemService {

  //TODO figure this out, what do you do when this is for Prod and not local host
  //What is the best way to do this? Inject a config?
  getBudgetItemsListUrl = 'http://localhost/BugetMaker/api/budgetItemList';
  constructor(private httpClient: HttpClient) { }

  getBudgetItemList = (): Observable<BudgetItem[]> => {
    return this.httpClient.get<BudgetItem[]>(this.getBudgetItemsListUrl);    
  }
}
