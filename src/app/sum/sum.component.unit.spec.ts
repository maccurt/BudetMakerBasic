import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SumComponent } from './sum.component';
import { MathService } from '../shared/math.service';
import { Category } from '../category/category.type';
import { SumItem } from './budget-item.type';
import { of } from 'rxjs';
import { CategoryService } from '../category/category.service';

//This is a test without all the set up, just newing up the class
describe('SumComponent', () => {

  const categoryList: Category[] = [];
  categoryList.push(
    { id: 1, name: 'A', total: 0 },
    { id: 2, name: 'B', total: 0 }
  );
  const activateRouteMock = {
    data: of({ categoryList: categoryList })
  };

  let component: SumComponent;
  beforeEach(() => {
    component = new SumComponent(<any>activateRouteMock, new MathService(),
    new CategoryService());
  });

  it('add row should add an item to the list', () => {
    component.addItem(categoryList[0]);
    expect(component.itemList.length).toEqual(1);
    expect(component.itemList[0].amount).toEqual(0);
  });

  describe('deleteItemFromList', () => {
    it('it should remove correct  item from list', () => {

      const amountList: SumItem[] = [];
      const item: SumItem = { amount: 4.6 };
      amountList.push(
        item,
        { amount: 9.99 }
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

    describe('setCategoryTotal', () => {

      it('should behave...', () => {
        const amountList: SumItem[] = [];

        const categoryList: Category[] = [];
        categoryList.push(
          { id: 1, name: 'A' },
          { id: 2, name: 'B' }
        );
        amountList.push(
          { amount: 100, categoryId: categoryList[0].id },
          { amount: 150, categoryId: categoryList[0].id },
          { amount: 50, categoryId: categoryList[1].id },
          { amount: 75, categoryId: categoryList[1].id }
        );

        component.setCategoryTotal(categoryList, amountList);
        expect(categoryList[0].total).toEqual(250);
        expect(categoryList[1].total).toEqual(125);
      });

    });

    describe('setSumItemFields', () => {

      it('a sum total of 200 and item of 50,25,25 should return correct.', () => {

        const amountList: SumItem[] = [];
        amountList.push(
          { amount: 100 },
          { amount: 50 },
          { amount: 50 }
        );
        component.setSumItemFields(200, amountList);
        expect(amountList[0].percent).toEqual(50);
        expect(amountList[1].percent).toEqual(25);
        expect(amountList[2].percent).toEqual(25);
      });

      it('a sum total of 75 and item of 50,25 should return correct.', () => {
        const amountList: SumItem[] = [];
        amountList.push(
          { amount: 50 },
          { amount: 25 }
        );

        component.setSumItemFields(75, amountList);
        expect(amountList[0].percent).toEqual(66.67);
        expect(amountList[1].percent).toEqual(33.33);
      });
    });

    describe('setCategoryPercent', () => {
      it('should calculate correctly', () => {
        const categoryList: Category[] = [];
        categoryList.push({ id: 1, name: '', total: 50 });
        categoryList.push({ id: 2, name: '', total: 20 });
        categoryList.push({ id: 2, name: '', total: 30 });

        component.setCategoryPercent(200, categoryList);
        expect(categoryList[0].percent).toEqual(25);
        expect(categoryList[1].percent).toEqual(10);
        expect(categoryList[2].percent).toEqual(15);
      });
    });

    describe('sortCategoryByName', () => {
      it('should calculate correctly', () => {
        const categoryList: Category[] = [];
        categoryList.push({ id: 1, name: '', total: 50 });
        categoryList.push({ id: 2, name: '', total: 20 });
        categoryList.push({ id: 2, name: '', total: 30 });

        component.setCategoryPercent(200, categoryList);
        expect(categoryList[0].percent).toEqual(25);
        expect(categoryList[1].percent).toEqual(10);
        expect(categoryList[2].percent).toEqual(15);
      });
    });
   
  });
});
