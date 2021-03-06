// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CategoryModule } from './category/category.module';
import { HomeComponent } from './home/home.component';
import { BudgetModule } from './budget/budget.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressIntereceptor } from './progress.intereceptor';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [    
    AppRoutingModule,
    SharedModule,
    CategoryModule,
    BudgetModule,   

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProgressIntereceptor, multi: true } //QUESTION: Should this be in shared?
  ],
  entryComponents: [
    CategoryComponent
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }