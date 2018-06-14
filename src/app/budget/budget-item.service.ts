import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BudgetItem } from './budget-item.type';

@Injectable({
  providedIn: 'root'
})
export class BudgetItemService {

  constructor() { }

  getBudgetItemList = (): Observable<BudgetItem[]> => {

    const budgetItemList: BudgetItem[] = [];
    budgetItemList.push({ id: 1, amount: 1900, description: 'Mortgage', categoryId: 7 });
    budgetItemList.push({ id: 2, amount: 200, description: 'OPPD', categoryId: 8 });
    budgetItemList.push({ id: 3, amount: 100, description: 'Car Gas', categoryId: 8 });
    budgetItemList.push({ id: 4, amount: 200, description: 'MUD', categoryId: 8 });
    budgetItemList.push({ id: 5, amount: 11.99, description: 'Netflix', categoryId: 2 });
    budgetItemList.push({ id: 6, amount: 105.36, description: 'Cox Cable', categoryId: 2 });
    budgetItemList.push({ id: 7, amount: 500, description: 'Groceries', categoryId: 3 });
    return of(budgetItemList);
  }
}
