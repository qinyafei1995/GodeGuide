
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = HollowTouchPenetrate
 * DateTime = Tue May 10 2022 20:29:12 GMT+0800 (中国标准时间)
 * Author = ChinaQin
 * FileBasename = HollowTouchPenetrate.ts
 * FileBasenameNoExtension = HollowTouchPenetrate
 * URL = db://assets/GuideCore/script/HollowTouchPenetrate.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('HollowTouchPenetrate')
export class HollowTouchPenetrate extends Component {

    private _isPenetrate: boolean = false;

    public setOnceTouchEndEvent(cb: () => void) {
        this.node.children.forEach((nd: Node) => {
            
        })
    }

    public setOnTouchEvent(cb: () => void) {
        
    }

    public setPenetrate(isPenetrate: boolean) {
        this._isPenetrate = isPenetrate;
    }
}