import { Injectable } from '@angular/core';
import { Category } from './category.type';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategoryList = (): Observable<Category[]> => {

    //Make this go to an actuall HTTP Service
    const catetoryList: Category[] =
      [
        { id: 1, name: 'Misc' },
        { id: 2, name: 'Entertainment' },
        { id: 3, name: 'Food' },
        { id: 4, name: 'Energy Utilities' },
        { id: 5, name: 'Zebra' },
        { id: 6, name: 'Apple' },
        { id: 7, name: 'Housing' },
        { id: 8, name: 'Fuel-Gas' }
      ];

    return of(catetoryList);
  }

  sortCategoryByName = (categoryList: Category[]): Category[] => {
    categoryList.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return categoryList;
  }
}
