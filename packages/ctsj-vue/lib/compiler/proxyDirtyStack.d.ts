export default ProxyDirtyStack;
/**
 * ProxyDirtyStack
 * @class ProxyDirtyStack
 * @classdesc 执行了数据观测的DirtyStack
 */
declare class ProxyDirtyStack {
    $renderHandler: any;
    $stack: any[];
    /**
     * push - 放
     * @param renderHandler - Function
     * @param value - number | string | Object
     */
    push(renderHandler: any, value: any): void;
    /**
     * clear - 清空
     */
    clear(): void;
    /**
     * isEmpty - 是否为空
     * @return {boolean}
     */
    isEmpty(): boolean;
    /**
     * getRenderHandler - 获取渲染的句柄
     * @return {Function}
     */
    getRenderHandler(): Function;
}
