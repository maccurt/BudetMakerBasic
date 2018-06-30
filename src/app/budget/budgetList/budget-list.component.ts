import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Budget } from '../budget.types';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.less']
})
export class BudgetListComponent implements OnInit {

  budgetList: Budget[]
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.data.subscribe((data) => {
      
      this.budgetList = data.budgetList;
    })
  }

}
