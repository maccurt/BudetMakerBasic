import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from './category.type';
import { CategoryService } from './category.service';
import { Budget } from '../budget/budget.types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {

  categoryList: Category[];
  budget: Budget;
  selectedCategoryIdList: number[] = [];

  constructor(private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CategoryComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { budget: Budget }) { }

  ngOnInit() {
    this.budget = this.data.budget;
    this.categoryService.getCategoryListNotInBudget(this.budget.id)
      .subscribe((categoryList: Category[]) => {
        this.categoryList = categoryList;
      })

  }
  addSelectedCategories = () => {

    let categoryListSelected: Category[] = [];
    this.selectedCategoryIdList.forEach((categoryId: number) => {
      const category = this.categoryList.find((cat: Category) => {
        return cat.id === categoryId
      })
      if (category) {
        category.budgetId = this.budget.id
        categoryListSelected.push(category)
      }
    });

    this.categoryService.addCategoryListToBudget(categoryListSelected).subscribe((categoryList: Category[]) => {
      this.dialogRef.close(categoryList);
    })
  }

  cancelDialog = () => {
    this.dialogRef.close(null)
  }

  disableAdd = (): boolean => {
    return this.selectedCategoryIdList.length === 0
  }
  change(item: any) {
    console.log('change', item, this.selectedCategoryIdList);
  }

}
