// import { Injectable } from '@angular/core/';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/';
// import { Observable } from 'rxjs';
// import { BudgetItem } from '../budget.types';
// import { BudgetService } from '../budget.service';

// @Injectable()
// export class BudgetItemListResolver implements Resolve<BudgetItem[]> {

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): BudgetItem[] | Observable<BudgetItem[]> | Promise<BudgetItem[]> {

//         const id = +route.paramMap.get('id');
//         return this.budgetItemService.getBudgetItemList(id);
//     }
//     constructor(private budgetItemService: BudgetService) { }
// }