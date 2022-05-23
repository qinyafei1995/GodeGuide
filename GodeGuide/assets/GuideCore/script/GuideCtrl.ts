
import { _decorator, Component, Node } from 'cc';
import { GuideStepBase } from './GuideStepBase';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GuideCtrl
 * DateTime = Tue May 10 2022 18:16:56 GMT+0800 (中国标准时间)
 * Author = QinYaFei
 * FileBasename = GuideCtrl.ts
 * FileBasenameNoExtension = GuideCtrl
 * URL = db://assets/GuideCore/guide/GuideCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('GuideCtrl')
export class GuideCtrl extends Component {
    cloneAndAddTouchCom: any = null;
    addTouchCom: any = null;
    hollowOutCom:any = null;
    textCom: any = null;
    imageTipCom: any = null;
    textTipCom: any = null;

    private _steps: GuideStepBase[] = null;
    private _stepsIndex: number = 0;

    private _isRun: boolean = false;

    start () {
        
    }

    update () {
        if (!this._isRun) 
            return;

        const stepData = this._getCurStepData();
        if (stepData && stepData.isOpen()) {
            
        }
    }

    private _getCurStepData(): GuideStepBase | null {
        return this._getStepData(this._stepsIndex);
    }

    private _getStepData(stepIndex: number): GuideStepBase | null {
        if (stepIndex < this._steps.length) {
            return this._steps[stepIndex];
        } else {
            this._isRun = false;
            return null;
        }
    }

    public run(setps: GuideStepBase[], startSetpsIndex: number = 0) {
        if (!setps && setps.length === 0)
            return;

        this._steps = setps;
        this._stepsIndex = startSetpsIndex;

        this._isRun = true;
    }

    public jumpStep(stepIndex: number) {
        this._stepsIndex = stepIndex;
    }
}