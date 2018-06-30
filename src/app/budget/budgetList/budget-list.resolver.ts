import { Injectable } from '@angular/core/';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/';
import { Observable } from 'rxjs';
import { Budget } from '../budget.types';
import { BudgetService } from '../budget.service';

@Injectable()
export class BudgetListResolver implements Resolve<Budget[]> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Budget[]> {

        

        return this.budgetService.getBudgetList();
    }
    constructor(private budgetService: BudgetService) { }
}