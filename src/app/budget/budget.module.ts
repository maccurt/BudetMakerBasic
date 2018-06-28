import { NgModule } from '@angular/core';
import { BudgetComponent } from './budget.component';
import { BudgetItemListResolver } from './budget-item-list.resolver';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from '../category/category.module';

@NgModule({
    declarations: [
        BudgetComponent
    ],
    imports: [SharedModule, CategoryModule],
    providers: [BudgetItemListResolver]
})
export class BudgetModule {

}
