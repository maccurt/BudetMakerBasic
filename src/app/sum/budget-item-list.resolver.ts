import { Injectable } from '@angular/core/';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/';
import { Observable } from 'rxjs';
import { SumItem } from './budget-item.type';
import { BudgetItemService } from './budget-item.service';

@Injectable()
export class BudgetItemListResolver implements Resolve<SumItem[]> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SumItem[] | Observable<SumItem[]> | Promise<SumItem[]> {

        return this.budgetItemService.getBudgetItemList();
    }
    constructor(private budgetItemService: BudgetItemService) { }
}