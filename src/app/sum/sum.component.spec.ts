import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SumComponent } from './sum.component';
import { By } from '@angular/platform-browser';
import { DirectivesModule } from '../directives/directives.module';
import { CategoryService } from '../category/category.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from '../category/category.type';
import { BudgetItem } from './budget-item.type';

describe('SumComponent', () => {
  let component: SumComponent;
  let fixture: ComponentFixture<SumComponent>;
  const itemToDelete: BudgetItem = { id: 7, amount: 500, description: 'Groceries', categoryId: 3 };

  beforeEach(async(() => {

    const categoryList: Category[] =
      [
        { id: 1, name: 'Misc' }, { id: 2, name: 'Entertainment' },
        { id: 3, name: 'Food' }, { id: 4, name: 'Energy Utilities' },
        { id: 5, name: 'Zebra' }, { id: 6, name: 'Apple' },
        { id: 7, name: 'Housing' }, { id: 8, name: 'Fuel-Gas' }
      ];

    const budgetItemList: BudgetItem[] = [];
    budgetItemList.push({ id: 1, amount: 1900, description: 'Mortgage', categoryId: 7 });
    budgetItemList.push({ id: 2, amount: 200, description: 'OPPD', categoryId: 8 });
    budgetItemList.push({ id: 3, amount: 100, description: 'Car Gas', categoryId: 8 });
    budgetItemList.push({ id: 4, amount: 200, description: 'MUD', categoryId: 8 });
    budgetItemList.push({ id: 5, amount: 11.99, description: 'Netflix', categoryId: 2 });
    budgetItemList.push({ id: 6, amount: 105.36, description: 'Cox Cable', categoryId: 2 });
    budgetItemList.push(itemToDelete);

    const activateRouteMock = {
      data: of({
        categoryList: categoryList,
        budgetItemList: budgetItemList
      })
    };

    TestBed.configureTestingModule({
      declarations: [SumComponent],
      providers: [CategoryService, { provide: ActivatedRoute, useValue: activateRouteMock }],
      imports: [FormsModule, DirectivesModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      expect(component.budgetItemList.length).toBe(7);
      deleteLink.click();
      expect(component.budgetItemList.length).toBe(6);
    });

    it('it should call the delete function with the correct item', () => {
      const deleteLink = fixture.debugElement.query(By.css('#id-7'))
        .nativeElement.querySelector('.delete-item');
      expect(component.budgetItemList.length).toBe(7);
      spyOn(component, 'deleteItem');
      deleteLink.click();
      expect(component.deleteItem).toHaveBeenCalledWith(itemToDelete);
    });

  });
});