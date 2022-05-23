import { Order } from "./Order";
export class Broker {
    private orderList: Order[] = [];
    public takeOrder(order: Order) {
        this.orderList.push(order);
    }
    public placeOrders() {
        this.orderList.forEach((oItem: Order) => {
            oItem.execute()
        })
        this.orderList.length = 0;
    }
}