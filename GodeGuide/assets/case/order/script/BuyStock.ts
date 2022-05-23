import { Order } from "./Order";
import { Stock } from "./Stock";

export class BuyStock implements Order {
    private abdStock: Stock;

    constructor(stock: Stock) {
        this.abdStock = stock;
    }

    execute(): void {
        this.abdStock.buy();
    }
}