import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SumComponent } from './sum/sum.component';
import { CategoryListResolver } from './category/category-list.resolver';
import { BudgetItemListResolver } from './sum/budget-item-list.resolver';

const routes: Routes = [
  // { path: 'home', component: SumComponent },
  {
    path: 'sum',
    component: SumComponent,
    resolve: {
      categoryList: CategoryListResolver,
      budgetItemList: BudgetItemListResolver
    }
  },
  { path: '', redirectTo: '/sum', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
