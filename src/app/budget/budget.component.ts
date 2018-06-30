import { CategoryService } from './../category/category.service';
import { Component, OnInit, AfterViewInit, ViewChild, QueryList } from '@angular/core';
import { MathService } from '../shared/math.service';
import { Category } from '../category/category.type';
import { ActivatedRoute } from '@angular/router';
import { BudgetItem } from './budget.types';

@Component({
  selector: 'app-sum',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.less']
})
export class BudgetComponent implements OnInit, AfterViewInit {
  budgetItemList: BudgetItem[] = [];
  categoryList: Category[] = [];
  public categoryDefault: Category;
  total = 0;
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

  ngAfterViewInit(): void { }

  //This is going to be a problem how do you add from the handler in the html. A pass thru?
  addItem = (): void => {
    const item = new BudgetItem();
    item.amount = 0;
    item.categoryId = this.categoryDefault.id;
    this.budgetItemList.push(item);
  }
  //TODO why pass the item in here if you are not doing anything with it
  itemChanged = (item?: BudgetItem): void => {

    
    this.total = this.sumAmountList(this.budgetItemList);
    this.setSumItemFields(this.total, this.budgetItemList);
    this.setCategoryTotal(this.categoryList, this.budgetItemList);
    this.setCategoryPercent(this.total, this.categoryList);
  }

  deleteItem = (item: BudgetItem) => {
    this.deleteItemFromList(item, this.budgetItemList);
    //If you delete an item you have alert that an item was changed
    //Perhaps this is not the best name, it could be itemListChanged
    //because the item was delete and it was the itemList that was changed
    //not the item perse    
    this.itemChanged();
  }

  deleteItemFromList = (item: BudgetItem, budgetItemList: BudgetItem[]) => {
    const index = budgetItemList.indexOf(item);
    if (index > -1) {
      budgetItemList.splice(index, 1);
    }
  }

  categoryChanged = () => {
    //What is a good test for this?
    //You are testing the method it call already
    //Is it good enough to just test that it calls these methods?
    //What if you change the name of the methods in here?
    //Would the test still be valid. 
    //I want to know that if I change a category something happens
    //not that is just got called    

    this.setCategoryTotal(this.categoryList, this.budgetItemList);
    this.setCategoryPercent(this.total, this.categoryList);
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