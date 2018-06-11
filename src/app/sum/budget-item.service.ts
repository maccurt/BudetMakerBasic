import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SumItem } from './budget-item.type';

@Injectable({
  providedIn: 'root'
})
export class BudgetItemService {

  constructor() { }

  getBudgetItemList = (): Observable<SumItem[]> => {

    const itemList: SumItem[] = [];
    itemList.push({ amount: 1900, description: 'Mortgage', categoryId: 7 });
    itemList.push({ amount: 200, description: 'OPPD', categoryId: 8 });
    itemList.push({ amount: 100, description: 'Car Gas', categoryId: 8 });
    itemList.push({ amount: 200, description: 'MUD', categoryId: 8 });
    itemList.push({ amount: 11.99, description: 'Netflix', categoryId: 2 });
    itemList.push({ amount: 105.36, description: 'Cox Cable', categoryId: 2 });
    itemList.push({ amount: 500, description: 'Groceries', categoryId: 3 });
    return of(itemList);
  }
}
