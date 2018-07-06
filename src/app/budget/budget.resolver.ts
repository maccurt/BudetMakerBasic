import { Injectable } from '@angular/core/';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/';
import { Observable } from 'rxjs';
import { BudgetService } from './budget.service';
import { Budget } from './budget.types';


@Injectable()
export class BudgetResolver implements Resolve<Budget> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Budget> {

        const id = +route.paramMap.get('id');
        return this.budgetService.getBudget(id);
    }
    constructor(private budgetService: BudgetService) { }
}