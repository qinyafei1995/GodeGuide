
import { _decorator, Component, Node, Vec3, Size, UITransform, EventTouch, Color, color, UIOpacity, CCInteger, Sprite } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 黑洞(挖空)
 */
@ccclass('Hollow')
export class Hollow extends Component {
    @property(Node)
    uNode: Node = null;

    @property(Node)
    dNode: Node = null;

    @property(Node)
    lNode: Node = null;

    @property(Node)
    rNode: Node = null;

    private _setOut(size: Size) {
        const x = size.width / 2;
        const y = size.height / 2;
        const uPos = this.uNode.position;
        const dPos = this.dNode.position;
        const lPos = this.lNode.position;
        const rPos = this.rNode.position;
        const lSize = this.lNode.getComponent(UITransform).contentSize;
        const rSize = this.rNode.getComponent(UITransform).contentSize;

        this.uNode.setPosition(uPos.x, y, uPos.z);
        this.dNode.setPosition(dPos.x, y * -1, dPos.z);
        this.lNode.setPosition(x * -1, lPos.y, lPos.z);
        this.rNode.setPosition(x, rPos.y, rPos.z);

        this.lNode.getComponent(UITransform).setContentSize(lSize.width,size.height);
        this.rNode.getComponent(UITransform).setContentSize(rSize.width,size.height);
    }

    public open() {
        this.node.active = true;
    }

    public close() {
        this.node.active = false;
    }

    public setPos(worldPos: Vec3, size: Size) {
        this.node.setWorldPosition(worldPos);
        this._setOut(size);
    }

    public setColor(color: Color) {
        this.uNode.getComponent(Sprite).color = color;
        this.dNode.getComponent(Sprite).color = color;
        this.lNode.getComponent(Sprite).color = color;
        this.rNode.getComponent(Sprite).color = color;
    }

    public setOpcity(opacity: number) {
        this.uNode.getComponent(UIOpacity).opacity = opacity;
        this.dNode.getComponent(UIOpacity).opacity = opacity;
        this.lNode.getComponent(UIOpacity).opacity = opacity;
        this.rNode.getComponent(UIOpacity).opacity = opacity;
    }
}