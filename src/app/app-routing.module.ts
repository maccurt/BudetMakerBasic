import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListResolver } from './category/category-list.resolver';
import { BudgetComponent } from './budget/budget.component';
import { HomeComponent } from './home/home.component';
import { BudgetListComponent } from './budget/budgetList/budget-list.component';
import { BudgetListResolver } from './budget/budgetList/budget-list.resolver';
import { BudgetResolver } from './budget/budget.resolver';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'budget/:id',
    component: BudgetComponent,
    resolve: {
      categoryList: CategoryListResolver,
      budget: BudgetResolver
    }
  },
  {
    path: 'budgetlist',
    component: BudgetListComponent,
    resolve: {
      budgetList: BudgetListResolver
    }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
