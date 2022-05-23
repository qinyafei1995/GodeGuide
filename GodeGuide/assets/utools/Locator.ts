
import { _decorator, assert , Node, Canvas} from 'cc';
/**
 * Locator主要用从场景树中检索UI节点
 */
export class Locator {
    timeout: 5000; //超时
    locating: any;
    startTime: number;
    static locating: any;
    static startTime: number;
    static timeout: number;

    /**
     * 定位解析
     * @param locator
     * @returns {Array}
     */
    public static parse(locator: string): { symbol: string, name: string }[] {
        assert(locator, 'locator string is null');
        //使用正则表达示分隔名字
        let names = locator.split(/[.,//,>,#]/g);
        let segments = names.map((name) => {
            let index = locator.indexOf(name);
            let symbol = locator[index - 1] || '>';
            return { symbol: symbol, name: name.trim() };
        });
        console.log("定位解析==>", segments);
        return segments;
    }

    /**
     * 通过节点名搜索节点对象, 地柜查找子节点
     * @param root
     * @param name
     * @returns {*}
     */
    public static seekNodeByName(root: Node, name: string) {
        if (!root)
            return null;

        if (root.name == name)
            return root;
        let arrayRootChildren = root.children;
        let length = arrayRootChildren.length;
        for (let i = 0; i < length; i++) {
            let child = arrayRootChildren[i];
            let res = this.seekNodeByName(child, name);
            if (res != null)
                return res;
        }
        return null;
    }

    /**
     * 在root节点中，定位locator
     * @param root
     * @param locator
     * @param cb
     */
    public static locateNode(root: Node, locator: string, cb: Function) {
        if (!Locator.locating) {
            this.startTime = Date.now();
            this.locating = true;
        }
        let segments = Locator.parse(locator);
        assert(segments && segments.length);
        // console.log('locateNode:' + locator);
        let child = null;
        let node: Node = root;

        for (let i = 0; i < segments.length; i++) {
            let item = segments[i];
            switch (item.symbol) {
                case '/':
                    child = node.getChildByName(item.name);
                    break;
                case '.':
                    child = node[item.name];
                    break;
                case '>':
                    child = this.seekNodeByName(node, item.name);
                    break;
                // case '#':
                //     child = this.seekNodeByName(node, item.name);
                //     break;
            }

            if (!child) {
                node = null;
                break;
            }
            node = child;
        }

        if (node && node.active && cb) {
            this.locating = false;
            cb(null, node);
        } else if (cb) {
            if (Date.now() - this.startTime > this.timeout) {
                cb({ error: 'timeout', locator });
            } else {
                setTimeout(function () {
                    this.locateNode(root, locator, cb);
                }, 10);
            }
        }

        return node;
    }
    
    /**
     * 获取节点完整路径(包含canvas)
     * @param node 
     * @returns 
     */
    public static getNodeFullPath(node: Node): string {
        let array = [];
        let temp = node;
        let isRun = true;
        do {
            if (temp.getComponent(Canvas) instanceof Canvas) {
                isRun = false
            }
            array.unshift(temp.name);
            temp = temp.parent;
        } while (temp && isRun)
        return array.join('/');
    }
}