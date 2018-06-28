import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListResolver } from './category/category-list.resolver';
import { BudgetComponent } from './budget/budget.component';
import { BudgetItemListResolver } from './budget/budget-item-list.resolver';
import { HomeComponent } from './home/home.component';

const resolve = {
  categoryList: CategoryListResolver,
  budgetItemList: BudgetItemListResolver
};

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'budget', component: BudgetComponent, resolve: resolve },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
