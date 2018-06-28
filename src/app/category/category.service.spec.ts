import { Category } from './category.type';
import { TestBed, inject } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CategoryService', () => {

  var categoryService: CategoryService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService],
      imports: [HttpClientTestingModule]
    });

    categoryService = TestBed.get(CategoryService);
  });

  it('should be created', inject([CategoryService], (service: CategoryService) => {
    expect(categoryService).toBeTruthy();
  }));

  describe('', () => {

    it('should be created', () => {
      const categoryList: Category[] = [
        { id: 1, name: 'Zebra', total: 1 },
        { id: 2, name: 'Apple', total: 2 },
        { id: 3, name: 'Apple', total: 3 }

      ];
      const sortedList = categoryService.sortCategoryByName(categoryList);

      expect(sortedList[0].name).toBe('Apple')
      expect(sortedList[1].name).toBe('Apple')
      expect(sortedList[2].name).toBe('Zebra')
    });

  })
});
