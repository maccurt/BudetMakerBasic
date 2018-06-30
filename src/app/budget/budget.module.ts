import { NgModule } from '@angular/core';
import { BudgetComponent } from './budget.component';
import { BudgetItemListResolver } from './budgetItemList/budget-item-list.resolver';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from '../category/category.module';
import { BudgetListComponent } from './budgetList/budget-list.component';
import { BudgetListResolver } from './budgetList/budget-list.resolver';

@NgModule({
    declarations: [
        BudgetComponent,
        BudgetListComponent
    ],
    imports: [SharedModule, CategoryModule],
    providers: [
        BudgetItemListResolver,
        BudgetListResolver
    ]
})
export class BudgetModule {

}
