import { NgModule } from '@angular/core';
import { BudgetComponent } from './budget.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from '../category/category.module';
import { BudgetListComponent } from './budgetList/budget-list.component';
import { BudgetListResolver } from './budgetList/budget-list.resolver';
import { BudgetResolver } from './budget.resolver';

@NgModule({
    declarations: [
        BudgetComponent,
        BudgetListComponent
    ],
    imports: [SharedModule, CategoryModule],
    providers: [
        BudgetResolver,
        BudgetListResolver
    ]
})
export class BudgetModule {

}
