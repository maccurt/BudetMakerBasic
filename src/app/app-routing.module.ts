import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListResolver } from './category/category-list.resolver';
import { BudgetComponent } from './budget/budget.component';
import { BudgetItemListResolver } from './budget/budget-item-list.resolver';

const routes: Routes = [  
  {
    path: 'budget',
    component: BudgetComponent,
    resolve: {
      categoryList: CategoryListResolver,
      budgetItemList: BudgetItemListResolver
    }
  },
  { path: '', redirectTo: '/budget', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
