import { CategoryService } from './../category/category.service';
import { Component, OnInit } from '@angular/core';
import { MathService } from '../shared/math.service';
import { Category } from '../category/category.type';
import { ActivatedRoute } from '@angular/router';
import { BudgetItem } from './budget-item.type';

@Component({
  selector: 'app-sum',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.less']
})
export class BudgetComponent implements OnInit {
  budgetItemList: BudgetItem[] = [];
  categoryList: Category[] = [];
  public categoryDefault: Category;
  sum = 0;
  constructor(private activatedRoute: ActivatedRoute, private mathService: MathService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.categoryList = data['categoryList'];
      this.budgetItemList = data['budgetItemList'];
      //How do you want to handle the default category in the future ??
      //it should just not be simply the first one. In the future
      //should the user be able to define it. Don't over think this. stay on target
      this.categoryDefault = this.categoryList[0];
      this.categoryList = this.categoryService.sortCategoryByName(this.categoryList);
      this.itemChanged();
    });
  }

  //This is going to be a problem how do you add from the handler in the html. A pass thru?
  addItem = (): void => {
    const item = new BudgetItem();
    item.amount = 0;
    item.categoryId = this.categoryDefault.id;
    this.budgetItemList.push(item);
  }
  //TODO why pass the item in here if you are not doing anything with it
  itemChanged = (item?: BudgetItem): void => {

    //TODO this should not be called sum it should be called total fix this
    this.sum = this.sumAmountList(this.budgetItemList);
    this.setSumItemFields(this.sum, this.budgetItemList);
    this.setCategoryTotal(this.categoryList, this.budgetItemList);
    this.setCategoryPercent(this.sum, this.categoryList);
  }

  deleteItem = (item: BudgetItem) => {
    this.deleteItemFromList(item, this.budgetItemList);
    this.itemChanged();
    this.categoryChanged();
  }

  deleteItemFromList = (item: BudgetItem, budgetItemList: BudgetItem[]) => {
    const index = budgetItemList.indexOf(item);
    if (index > -1) {
      budgetItemList.splice(index, 1);
    }
  }

  categoryChanged = () => {
    this.setCategoryTotal(this.categoryList, this.budgetItemList);
    this.setCategoryPercent(this.sum, this.categoryList);
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