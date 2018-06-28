import { Injectable } from '@angular/core';
import { Category } from './category.type';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient ) { }

  getCategoryList = (): Observable<Category[]> => {

    return this.httpClient.get<Category[]>('http://localhost/bugetMaker/api/categoryList');
    //Make this go to an actuall HTTP Service
    // const catetoryList: Category[] =
    //   [
    //     { id: 1, name: 'Misc' },
    //     { id: 2, name: 'Entertainment' },
    //     { id: 3, name: 'Food' },
    //     { id: 4, name: 'Energy Utilities' },
    //     { id: 5, name: 'Transportation' },
    //     { id: 6, name: 'Education' },
    //     { id: 7, name: 'Housing' },
    //     { id: 8, name: 'Fuel-Gas' }
    //   ];

    // return of(catetoryList);
  }

  sortCategoryByName = (categoryList: Category[]): Category[] => {
    //I made a chnageS
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
