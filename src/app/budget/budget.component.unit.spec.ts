import { BudgetComponent } from './budget.component';
import { MathService } from '../shared/math.service';
import { Category } from '../category/category.type';
import { BudgetItem } from './budget-item.type';
import { of } from 'rxjs';
import { CategoryService } from '../category/category.service';

//This is a test without all the set up, just newing up the class
describe('BudgetComponent', () => {

  const categoryList: Category[] = [];
  categoryList.push(
    { id: 1, name: 'A', total: 0 },
    { id: 2, name: 'B', total: 0 }
  );
  const activateRouteMock = {
    data: of({ categoryList: categoryList })
  };

  let component: BudgetComponent;
  beforeEach(() => {
    component = new BudgetComponent(<any>activateRouteMock, new MathService(), new CategoryService());
    component.categoryDefault = categoryList[0];
  });

  it('add row should add an item to the list', () => {
    component.addItem();
    expect(component.budgetItemList.length).toEqual(1);
    expect(component.budgetItemList[0].amount).toEqual(0);
  });

  describe('deleteItemFromList', () => {
    it('it should remove correct  item from list', () => {

      const amountList: BudgetItem[] = [];
      const item: BudgetItem = { id: 1, amount: 4.6 };
      amountList.push(
        item,
        { id: 2, amount: 9.99 }
      );
      component.deleteItemFromList(item, amountList);
      expect(amountList.length).toBe(1);
      expect(amountList[0].amount).toBe(9.99);
    });

  });

  describe('sumAmountList', () => {
    it('adding 1 + 4.6 should result in 5.6', () => {
      const amountList = [];
      amountList.push({ amount: 1 },
        { amount: 4.6 },
        { amount: 0 },
        { amount: -1 },
        { amount: 1 },
        { amount: null },
        { amount: undefined }
      );
      const sum = component.sumAmountList(amountList);
      expect(sum).toBe(5.6);
    });

    describe('categoryChanged', () => {

      it('should call the correct methods', () => {
        //Is this really a good test?
        //Should you not be testing the outcome?
        //I can live with this because I am unit testing those method
        //Here I would be testing that it got called correctly        
        spyOn(component, 'setCategoryPercent');
        spyOn(component, 'setCategoryTotal');
        component.categoryChanged();
        expect(component.setCategoryTotal)
          .toHaveBeenCalledWith(component.categoryList, component.budgetItemList);
        expect(component.setCategoryPercent)
          .toHaveBeenCalledWith(component.sum, component.categoryList);
      });

      it('should set the percent and total correctly', () => {

        //Is this test worth it? Does not the unit test of the methods inside test this?
        component.budgetItemList = [{ id: 1, categoryId: 99, amount: 100 }];
        component.categoryList = [{ id: 99, name: 'dummy' }];
        component.sum = 200;
        component.categoryChanged();
        expect(component.categoryList[0].percent).toEqual(50);
        expect(component.categoryList[0].total).toEqual(100);
      });

    });

    describe('setCategoryTotal', () => {

      it('should behave...', () => {
        const amountList: BudgetItem[] = [];

        const catList: Category[] = [];
        catList.push(
          { id: 1, name: 'A' },
          { id: 2, name: 'B' }
        );
        amountList.push(
          { id: 1, amount: 100, categoryId: catList[0].id },
          { id: 2, amount: 150, categoryId: catList[0].id },
          { id: 3, amount: 50, categoryId: catList[1].id },
          { id: 4, amount: 75, categoryId: catList[1].id }
        );

        component.setCategoryTotal(catList, amountList);
        expect(catList[0].total).toEqual(250);
        expect(catList[1].total).toEqual(125);
      });
    });

    describe('setSumItemFields', () => {

      it('a sum total of 200 and item of 50,25,25 should return correct.', () => {

        const amountList: BudgetItem[] = [];
        amountList.push(
          { id: 1, amount: 100 },
          { id: 2, amount: 50 },
          { id: 3, amount: 50 }
        );
        component.setSumItemFields(200, amountList);
        expect(amountList[0].percent).toEqual(50);
        expect(amountList[1].percent).toEqual(25);
        expect(amountList[2].percent).toEqual(25);
      });

      it('a sum total of 75 and item of 50,25 should return correct.', () => {
        const amountList: BudgetItem[] = [];
        amountList.push(
          { id: 1, amount: 50 },
          { id: 2, amount: 25 }
        );

        component.setSumItemFields(75, amountList);
        expect(amountList[0].percent).toEqual(66.67);
        expect(amountList[1].percent).toEqual(33.33);
      });
    });

    describe('setCategoryPercent', () => {
      it('should calculate correctly', () => {
        const catList: Category[] = [];
        catList.push({ id: 1, name: '', total: 50 });
        catList.push({ id: 2, name: '', total: 20 });
        catList.push({ id: 2, name: '', total: 30 });

        component.setCategoryPercent(200, catList);
        expect(catList[0].percent).toEqual(25);
        expect(catList[1].percent).toEqual(10);
        expect(catList[2].percent).toEqual(15);
      });
    });

    describe('sortCategoryByName', () => {
      it('should calculate correctly', () => {
        const catList: Category[] = [];
        catList.push({ id: 1, name: '', total: 50 });
        catList.push({ id: 2, name: '', total: 20 });
        catList.push({ id: 2, name: '', total: 30 });

        component.setCategoryPercent(200, catList);
        expect(catList[0].percent).toEqual(25);
        expect(catList[1].percent).toEqual(10);
        expect(catList[2].percent).toEqual(15);
      });
    });

  });
});
