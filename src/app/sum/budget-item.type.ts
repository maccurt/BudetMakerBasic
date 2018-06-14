import { Category } from '../category/category.type';

export class BudgetItem {
    id: number;
    amount: number;
    percent?: number;
    categoryId?: number;
    description?: string;
}