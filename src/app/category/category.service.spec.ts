import { Category } from './category.type';
import { TestBed, inject } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

describe('CategoryService', () => {

  let categoryService: CategoryService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService],
      imports: [HttpClientTestingModule]
    });

    categoryService = TestBed.get(CategoryService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(categoryService).toBeTruthy();
  });

  describe('getCategoryList', () => {

    it('should return call the correct url', () => {

      const categoryList: Category[] = [
        { id: 1, name: 'Boat', total: 1 },
        { id: 2, name: 'Car', total: 2 },
        { id: 3, name: 'Airplane', total: 3 }
      ];

      categoryService.getCategoryList(2).subscribe((data) => {
        expect(data).toEqual(categoryList);
      });

      const request: TestRequest = httpTestingController.expectOne(categoryService.getCategoryListUrl + '?budgetId=2');
      request.flush(categoryList);
      httpTestingController.verify();
    });
  });

  describe('SortCategoryByName', () => {

    it('should sort the categories correctly', () => {
      const categoryList: Category[] = [
        { id: 1, name: 'Zebra', total: 1 },
        { id: 2, name: 'Apple', total: 2 },
        { id: 3, name: 'Apple', total: 3 }
      ];

      const sortedList = categoryService.sortCategoryByName(categoryList);
      expect(sortedList[0].name).toBe('Apple');
      expect(sortedList[1].name).toBe('Apple');
      expect(sortedList[2].name).toBe('Zebra');
    });
  });
});