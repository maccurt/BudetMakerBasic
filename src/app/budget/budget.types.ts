export class Budget {
    id: number;
    name: string;
    itemList:BudgetItem[];
    defaultCategoryId:number;
}

export class BudgetItem {    
    id: number;
    budgetId:number;
    amount: number;
    percent?: number;
    categoryId?: number;
    description?: string;
}