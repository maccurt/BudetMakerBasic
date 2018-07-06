import { CategoryService } from './../category/category.service';
import { Component, OnInit, AfterViewInit, ViewChild, QueryList } from '@angular/core';
import { MathService } from '../shared/math.service';
import { Category } from '../category/category.type';
import { ActivatedRoute } from '@angular/router';
import { Budget, BudgetItem } from './budget.types';
import { BudgetService } from './budget.service';

@Component({
  selector: 'app-sum',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.less']
})
export class BudgetComponent implements OnInit, AfterViewInit {
  //TODO now that you are bringing the budget in why not just bring the whole payload
  //You get all the items and category as children of the budget
  //redo this
  budget: Budget;
  budgetItemList: BudgetItem[] = [];
  categoryList: Category[] = [];
  public categoryDefault: Category;
  total = 0;
  constructor(private activatedRoute: ActivatedRoute, private mathService: MathService,
    private categoryService: CategoryService, private budgetService: BudgetService) { }

  ngOnInit() {

    this.activatedRoute.data.subscribe((data) => {

      this.budget = data['budget'];
      //TODO QUESTION:Do you want this variable here are do you just want to use
      //budget.items
      this.budgetItemList = this.budget.itemList;
      //TODO QUESTION: should this be coming in on the budget item, one less call
      this.categoryList = data['categoryList'];

      this.categoryList = this.categoryService.sortCategoryByName(this.categoryList);
      this.categoryDefault = this.getDefaultCategory();
      this.recalculateTotals()
    });
  }

  ngAfterViewInit(): void { }

  //Perhaps this should just get category and you pass in the the id and list, so it can be used eleswere  
  getDefaultCategory = (): Category => {

    var category = this.categoryList.find((cat: Category) => {
      return cat.id === this.budget.defaultCategoryId
    })
    return category;
  }

  //This is going to be a problem how do you add from the handler in the html. A pass thru?
  addItem = (): void => {

    var item = this.getNewBudgetItem();
    this.budgetService.addBudgetItem(item).subscribe((data: BudgetItem) => {
      this.budgetItemList.push(data);
    })
  }

  getNewBudgetItem = (): BudgetItem => {
    //TODO in the future perhaps you pass these items in:amount, budgetId, etc.
    const item = new BudgetItem();
    item.amount = 0;
    item.budgetId = this.budget.id;
    item.categoryId = this.categoryDefault.id;
    return item;
  }

  itemChanged = (item: BudgetItem): void => {
    this.recalculateTotals();
    this.updateBudgetItem(item)
  }

  recalculateTotals = () => {
    this.total = this.sumAmountList(this.budgetItemList);
    this.setSumItemFields(this.total, this.budgetItemList);
    this.setCategoryTotal(this.categoryList, this.budgetItemList);
    this.setCategoryPercent(this.total, this.categoryList);
  }

  deleteItem = (item: BudgetItem) => {

    //There should be confirm here of some sort
    this.budgetService.deleteBudgetItem(item.id).subscribe(() => {
      event.stopPropagation();
      this.deleteItemFromList(item, this.budgetItemList);
      this.recalculateTotals()      
    })
  }

  deleteItemFromList = (item: BudgetItem, budgetItemList: BudgetItem[]) => {
    const index = budgetItemList.indexOf(item);
    if (index > -1) {
      budgetItemList.splice(index, 1);
    }
  }

  categoryChanged = (item: BudgetItem) => {
    this.setCategoryTotal(this.categoryList, this.budgetItemList);
    this.setCategoryPercent(this.total, this.categoryList);
    this.updateBudgetItem(item)
  }

  updateBudgetItem = (item: BudgetItem) => {
    console.log('updating item', item);
    this.budgetService.updateBudgetItem(item).subscribe(() => {

    })
  }

  setCategoryTotal = (categoryList: Category[], budgetItemList: BudgetItem[]): void => {

    categoryList.forEach((category: Category) => {
      category.total = 0;
      //You forgot to do this but your test did not show because you did not
      //write a test how do you show that in video
      //1. The issue is you have to test the outcome of you actions
      //You have to test that numbers changed, not just that it was called etc
      //You need an outcome test not that things just turn green
      category.percent = 0;
    });

    budgetItemList.forEach((item: BudgetItem) => {
      if (item.amount) {
        const category = categoryList.find((element: Category) => {
          return element.id === item.categoryId;
        });
        category.total += item.amount;
      }
    });

    //I hate to do this, but this prevents the total from 
    //having trailing digits. For instance when I took this away
    //category entertainment total was 222.70999999999998
    //when it should be 222.71.
    //TODO figure out why this is
    categoryList.forEach((category: Category) => {
      category.total = this.mathService.round(category.total, 2);
    });
  }

  setCategoryPercent = (total: number, categoryList: Category[]): void => {
    categoryList.forEach((category: Category) => {
      if (category.total) {
        category.percent = this.mathService.getPercent(category.total, total);
      }
    });
  }

  setSumItemFields = (sumTotal: number, budgetItemList: BudgetItem[]): void => {
    budgetItemList.forEach((item: BudgetItem) => {
      if (item.amount) {
        item.percent = this.mathService.getPercent(item.amount, sumTotal);
      }
    });
  }

  sumAmountList = (budgetItemList: BudgetItem[]): number => {
    let sum = 0;
    budgetItemList.forEach((item: BudgetItem) => {
      if (item.amount) {
        sum += item.amount;
      }
    });

    return sum;
  }
}