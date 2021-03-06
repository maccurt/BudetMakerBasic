import { Injectable } from '@angular/core';
import { Category } from './category.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  getCategoryListUrl = 'http://localhost/bugetMaker/api/categoryList';
  constructor(private httpClient: HttpClient) {

  }

  addCategoryListToBudget = (categoryList: Category[]): Observable<Category[]> => {
    return this.httpClient.post<Category[]>(this.getCategoryListUrl + '/addCategoryListToBudget', categoryList);
  }

  getCategoryList = (budgetId: number): Observable<Category[]> => {
    const options = {
      params: {
        budgetId: budgetId.toString()
      }
    };
    return this.httpClient.get<Category[]>(this.getCategoryListUrl, options);
  }

  getCategoryListNotInBudget = (budgetId: number): Observable<Category[]> => {
    const options = {
      params: {
        budgetId: budgetId.toString()
      }
    };
    return this.httpClient.get<Category[]>(this.getCategoryListUrl + '/notInBudget', options);
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
