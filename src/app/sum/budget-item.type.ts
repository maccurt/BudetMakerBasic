import { Category } from '../category/category.type';

export class SumItem {
    id: number;
    amount: number;
    percent?: number;
    categoryId?: number;
    description?: string;
}