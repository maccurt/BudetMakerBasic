import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetComponent } from './budget/budget.component';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from './directives/directives.module';
import { SharedModule } from './shared/shared.module';
import { CategoryModule } from './category/category.module';
import { BudgetItemListResolver } from './budget/budget-item-list.resolver';



@NgModule({
  declarations: [
    AppComponent, BudgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DirectivesModule,
    SharedModule,
    CategoryModule
  ],
  providers: [BudgetItemListResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
