import { Injectable } from '@angular/core/';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/';
import { Category } from './category.type';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryListResolver implements Resolve<Category[]> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Category[] | Observable<Category[]> | Promise<Category[]> {
        return this.categoryService.getCategoryList();
    }

    constructor(private categoryService: CategoryService) {

    }
}