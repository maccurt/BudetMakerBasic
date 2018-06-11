import { CategoryService } from './../category/category.service';
import { Component, OnInit } from '@angular/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { MathService } from '../shared/math.service';
import { Category } from '../category/category.type';
import { ActivatedRoute } from '@angular/router';
import { SumItem } from './budget-item.type';

@Component({
  selector: 'app-sum',
  templateUrl: './sum.component.html',
  styleUrls: ['./sum.component.less']
})
export class SumComponent implements OnInit {
  itemList: SumItem[] = [];
  categoryList: Category[] = [];
  public categoryDefault: Category;
  sum = 0;
  constructor(private activatedRoute: ActivatedRoute, private mathService: MathService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.categoryList = data['categoryList'];
      this.itemList = data['budgetItemList'];
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
    const item = new SumItem();
    item.amount = 0;
    item.categoryId = this.categoryDefault.id;
    this.itemList.push(item);
  }
  //TODO why pass the item in here if you are not doing anything with it
  itemChanged = (item?: SumItem): void => {

    //TODO this should not be called sum it should be called total fix this
    this.sum = this.sumAmountList(this.itemList);
    this.setSumItemFields(this.sum, this.itemList);
    this.setCategoryTotal(this.categoryList, this.itemList);
    this.setCategoryPercent(this.sum, this.categoryList);
  }

  deleteItem = (item: SumItem) => {
    this.deleteItemFromList(item, this.itemList);
    this.itemChanged();
  }

  deleteItemFromList = (item: SumItem, itemList: SumItem[]) => {
    const index = itemList.indexOf(item);
    if (index > -1) {
      itemList.splice(index, 1);
    }
  }

  categoryChanged = () => {
    this.setCategoryTotal(this.categoryList, this.itemList);
    this.setCategoryPercent(this.sum, this.categoryList);
  }
  setCategoryTotal = (categoryList: Category[], itemList: SumItem[]): void => {

    categoryList.forEach((category: Category) => {
      category.total = 0;
    });

    itemList.forEach((item: SumItem) => {
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

  setSumItemFields = (sumTotal: number, itemList: SumItem[]): void => {
    itemList.forEach((item: SumItem) => {
      if (item.amount) {
        item.percent = this.mathService.getPercent(item.amount, sumTotal);
      }
    });
  }

  sumAmountList = (itemList: SumItem[]): number => {
    let sum = 0;
    itemList.forEach((item: SumItem) => {
      if (item.amount) {
        sum += item.amount;
      }
    });

    return sum;
  }
}