import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BudgetComponent } from './budget.component';
import { By, BrowserModule } from '@angular/platform-browser';
import { DirectivesModule } from '../directives/directives.module';
import { CategoryService } from '../category/category.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category/category.type';
import { BudgetItem, Budget } from './budget.types';
import { CategoryListComponent } from '../category/category-list.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { BudgetService } from './budget.service';
import { MatDialog, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from '../category/category.component';
import { NgModule } from '@angular/core';


//THis is worth learning why you had to do this, it was because of the entry component
@NgModule({
  declarations: [CategoryComponent],
  entryComponents: [
    CategoryComponent,
  ],
  imports: [FormsModule, BrowserModule, MatDialogModule],
  exports: [FormsModule, MatDialogModule]
})
class TestModule { }

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  const itemToDelete: BudgetItem = { budgetId: 1, id: 7, amount: 500, description: 'Groceries', categoryId: 3 };
  const groceryCategory: Category = { id: 3, name: 'Food' };
  let budgetService: BudgetService;
  let matDialogModal: MatDialog;
  let categoryService: CategoryService;

  beforeEach(async(() => {

    const categoryList: Category[] =
      [
        groceryCategory,
        { id: 1, name: 'Misc' },
        { id: 2, name: 'Entertainment' },
        { id: 4, name: 'Energy Utilities' },
        { id: 5, name: 'Zebra' },
        { id: 6, name: 'Apple' },
        { id: 7, name: 'Housing' },
        { id: 8, name: 'Fuel-Gas' }
      ];

    const budgetItemList: BudgetItem[] = [];
    budgetItemList.push({ budgetId: 1, id: 1, amount: 100, description: 'Mortgage', categoryId: 7 });
    budgetItemList.push({ budgetId: 1, id: 2, amount: 200, description: 'Gas', categoryId: 8 });
    budgetItemList.push({ budgetId: 1, id: 3, amount: 100, description: 'Gas For Car', categoryId: 8 });
    budgetItemList.push({ budgetId: 1, id: 4, amount: 200, description: 'MUD', categoryId: 8 });
    budgetItemList.push(itemToDelete);

    const budget: Budget = {
      id: 1,
      name: 'does not matter',
      itemList: budgetItemList,
      defaultCategoryId: 1
    }

    const activateRouteMock = {
      data: of({
        categoryList: categoryList,
        budget: budget
      })
    };

    TestBed.configureTestingModule({
      declarations: [BudgetComponent, CategoryListComponent],
      providers: [CategoryService, MatDialog,
        { provide: ActivatedRoute, useValue: activateRouteMock },
      ],
      imports: [DirectivesModule, HttpClientModule, BrowserAnimationsModule, TestModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    budgetService = TestBed.get(BudgetService);
    matDialogModal = TestBed.get(MatDialog)
    categoryService = TestBed.get(CategoryService)
    spyOn(budgetService, 'deleteBudgetItem').and.returnValue(of({}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the default category id to 1-misc', () => {
    expect(component.categoryDefault.id).toBe(1)
  });

  it('should create', () => {
    expect(component.categoryList.length > 0).toBeTruthy();
  });

  it('should call addItem function when add-item button is clicked', () => {

    spyOn(component, 'addItem');
    const addItemButton = fixture.debugElement
      .query(By.css('#add-item')).nativeElement;
    addItemButton.click();
    expect(component.addItem).toHaveBeenCalled();
    //1. Is this test worthless? Are you just checking the binding of angular?
    //2. Is it possible to break this test without the compiler complaining?    
    //   A: Yes if you don't have Angular Language Service
    //      You could change the name of the function and it would break    
    //3. Why does this test have any value?    
  });

  describe('delete item', () => {
    //This should make the video how to get an element from a native element

    it('it should delete an item', () => {
      const deleteLink = fixture.debugElement.query(By.css('#id-7'))
        .nativeElement.querySelector('.delete-item');
      //Does this test have to many expects
      //This test is to show you can have coverage but did not test the percent piece
      //should this show the total also. Yes!
      expect(component.budgetItemList.length).toBe(5);
      expect(groceryCategory.percent).toEqual(45.45);
      deleteLink.click();
      expect(component.budgetItemList.length).toBe(4);
      expect(groceryCategory.percent).toEqual(0);
    });


    it('it should call the delete function with the correct item', () => {
      const deleteLink = fixture.debugElement.query(By.css('#id-7'))
        .nativeElement.querySelector('.delete-item');
      expect(component.budgetItemList.length).toBe(5);
      spyOn(component, 'deleteItem');
      deleteLink.click();
      expect(component.deleteItem).toHaveBeenCalledWith(itemToDelete);
    });

    describe('click the add category', () => {

      let addCategoryButton: any;
      beforeEach(() => {
        addCategoryButton = fixture.nativeElement.querySelector('#add-budget-category');
        spyOn(categoryService, 'sortCategoryByName').and.callThrough();
      })

      it('should add the new category and sort the category list', () => {

        const categoryAdded: Category = { id: 999, name: 'AAASortedToTop' };
        const categoryListAdded = [categoryAdded];
        const matDialogRefMock = {
          afterClosed: () => {
            return of(categoryListAdded);
          }
        }

        spyOn(matDialogModal, 'open').and.returnValue(matDialogRefMock);
        spyOn(matDialogRefMock, 'afterClosed').and.callThrough();

        addCategoryButton.click();
        expect(matDialogModal.open).toHaveBeenCalled();

        //There was 8 and we added one
        expect(component.categoryList.length).toEqual(9);
        //It should have sorted the category and the category we added should be first
        expect(categoryService.sortCategoryByName).toHaveBeenCalled();
        expect(component.categoryList[0]).toEqual(categoryAdded);
      });

      it('it should not add a category and we should not call the sort method', () => {

        const matDialogRefMock = {
          afterClosed: () => {
            return of([]); //Return an empty array, we did not add category
          }
        }

        spyOn(matDialogModal, 'open').and.returnValue(matDialogRefMock);
        spyOn(matDialogRefMock, 'afterClosed').and.callThrough();

        addCategoryButton.click();

        //We did not add any categories so it should not add anything 
        expect(component.categoryList.length).toEqual(8);
        expect(categoryService.sortCategoryByName).not.toHaveBeenCalled();
      });

    });

  });
});