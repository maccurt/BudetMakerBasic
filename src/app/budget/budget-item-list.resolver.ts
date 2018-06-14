import { Injectable } from '@angular/core/';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/';
import { Observable } from 'rxjs';
import { BudgetItem } from './budget-item.type';
import { BudgetItemService } from './budget-item.service';

@Injectable()
export class BudgetItemListResolver implements Resolve<BudgetItem[]> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): BudgetItem[] | Observable<BudgetItem[]> | Promise<BudgetItem[]> {

        return this.budgetItemService.getBudgetItemList();
    }
    constructor(private budgetItemService: BudgetItemService) { }
}