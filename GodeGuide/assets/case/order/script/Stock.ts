export class Stock  {
    name: string = "abc";
    quantity: number = 10;
    buy() {
        console.log("Stock", this.name + ":buy" + this.quantity + "个");
    }
    sell() {
        console.log("Stock", this.name + ":sell" + this.quantity + "个");
    }
}