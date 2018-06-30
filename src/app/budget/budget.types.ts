export class Budget {
    id: number;
    name: string;
}

export class BudgetItem {
    id: number;
    amount: number;
    percent?: number;
    categoryId?: number;
    description?: string;
}