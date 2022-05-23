
import { _decorator, Component} from 'cc';
import { Broker } from './Broker';
import { BuyStock } from './BuyStock';
import { SellStock } from './SellStock';
import { Stock } from './Stock';
const { ccclass, property } = _decorator;

@ccclass('CommandPatternDemo')
export class CommandPatternDemo extends Component {
    start() {
        const abcStock = new Stock();
        const buyStockOrder = new BuyStock(abcStock);
        const sellStockOrder = new SellStock(abcStock);
        const brober = new Broker();
        brober.takeOrder(buyStockOrder);
        brober.takeOrder(sellStockOrder);
        brober.placeOrders();
    }
}