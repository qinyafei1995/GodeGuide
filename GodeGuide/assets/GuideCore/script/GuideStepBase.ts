import { Color, Node, size, Size, sys, v3, Vec3, view } from "cc";
//#region 
export interface WorldPos {
    /**
     * 挖空位置
     * 注意: 世界坐标
     */
    worldPosition: Vec3
}

/**
 * 挖空数据
 */
export interface HollowOutData extends WorldPos {
    /**
     * 挖空大小
     */
    size: Size,

    /**
     * 遮罩透明度
     */
    opacity: number,

    /**
     * 颜色
     */
    color: Color
}

/**
 * 小手数据
 */
export interface FingerData extends WorldPos {
    /**
     * 移动速度
     */
    moveSpeed: number
}

export interface ImageData extends WorldPos {
    /**
     * 图片路径,resourecs目录下
     */
    imageUrl: string,
}

/**
 * 提示数据
 */
export interface TextData extends WorldPos {
    /**
     * 提示内容
     */
    content: string
}

/**
 * 设置引导动作数据
 */
export interface IGuideSetActionData {
    /**
     * 获取触摸节点,动态添加被注册按钮点击事件
     */
    getTouchNodes(): Node[];

    /**
     * 获取触摸节点,克隆显示到黑色遮罩上,动态添加被注册按钮点击事件
     */
    getCloneTouchNodes(): Node[];
    
    /**
     * 获取挖空数据
     */
    getHollowOutData(): HollowOutData;

    /**
     * 显示手指,并移动到指定位置
     */
    getFingerData(): FingerData;

    /**
     * 显示图片到指定位置
     */
    getImageData(): ImageData;

    /**
     * 显示文本内容
     */
    getTextData(): TextData

}
//#endregion

/**
 * 新手引导命令枚举
 */
export enum GuideCommondEnum {
    /**
     * 添加触摸事件
     */
    ADD_TOUCH_EVENT = 1,

    /**
     * 克隆节点并添加触摸事件
     */
    CLONE_NODE_AND_ADD_TOUCH_EVENT,

    /**
     * 挖空
     */
    HOLLOW_OUT,

    /**
     * 手指
     */
    FINGTER,

    /**
     * 图片
     */
    IMAGE,

    /**
     * 文字
     */
    TEXT
}

/**
 * 新手引导, 流程控制接口
 */
export interface IGuideProcessControl {

    /**
     * 执行命令列表
     */
    commondList: GuideCommondEnum[]

    /**
     * 是否展示当前引导
     */
    isOpen(): boolean;

    /**
     * 是否触摸穿透
     */
    isTouchPenetrate(): boolean;
}

/**
 * 新手引导, 生命周期接口
 */
export interface IGuideCallBack {
    /**
     * 引导开始时执行
     * 注意: 在isShow为true时执行
     */
    onOpen(stepIndex: number): void;

    /**
     * 触摸节点时执行
     */
    onTouchEnd(): void;

    /**
     * 引导结束时触发
     */
    onClose(): void;
}

export abstract class GuideStepBase implements IGuideProcessControl, IGuideCallBack, IGuideSetActionData {
    commondList: GuideCommondEnum[] = [];
    
    isOpen(): boolean {
        return true;
    }

    isTouchPenetrate(): boolean {
        return false;
    }


    onOpen(stepIndex: number): void {
        console.log("onOpen Guide Step" + stepIndex);
    }

    onTouchEnd(): void {
        throw new Error("Method not implemented.");
    }

    onClose(): void {
        throw new Error("Method not implemented.");
    }


    getTouchNodes(): Node[] {
        return null;
    }

    getCloneTouchNodes(): Node[] {
        return null;
    }

    getHollowOutData(): HollowOutData {
        const viewSize = view.getVisibleSize();
        const y = viewSize.height / 2;
        const x = viewSize.width / 2;
        const hoData: HollowOutData = {
            size: size(0,0),
            worldPosition: v3(x, y),
            opacity: 50,
            color: Color.BLACK
        }
        return hoData;
    }

    getFingerData(): FingerData {
        const fData: FingerData = {
            moveSpeed: 0,
            worldPosition: null
        }
        return fData;
    }

    getImageData(): ImageData {
        const imageData: ImageData = {
            imageUrl: null,
            worldPosition: null
        }
        return imageData;
    }

    getTextData(): TextData {
        return null;
    }
}
