
import { _decorator, Component, Node } from 'cc';
import { GuideStepBase } from './GuideStepBase';
const { ccclass, property } = _decorator;

@ccclass('GuideActionBase')
export class GuideActionBase extends Component {
    private _guideStepData: GuideStepBase;

    /**
     * setGuideStepData
     */
    public setGuideStepData(guideStepData: GuideStepBase) {
        this._guideStepData = guideStepData;
    }

    public init() {

    }
}