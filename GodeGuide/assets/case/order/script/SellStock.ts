import { Order } from "./Order";
import { Stock } from "./Stock";

export class SellStock implements Order {
    private abcStocck: Stock;
    constructor(stock: Stock) {
        this.abcStocck = stock;
    }  
    execute(): void {
        this.abcStocck.sell();
    }
}