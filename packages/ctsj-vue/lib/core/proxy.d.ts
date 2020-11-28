/**
 * createContext - 创建上下文(主要是在v-for的时候需要重新创建一个新的上下文)
 * @param srcContext - Object 原始的srcContext对象
 * @param argv - Object 上下文的参数
 * @return Object 新的上下文
 */
export function createContext(srcContext: any, argv?: {}): any;
/**
 * createVueProxy - Vue实例创建代理
 * @param srcObj - Object | Array 被代理的对象
 * @param depth - boolean 是否深度创建代理
 * @return {Proxy} - 代理对象
 */
export function createVueProxy(srcObj: any, depth?: boolean): ProxyConstructor;
/**
 * createComponentProxy - 组件实例创建代理
 * @param srcObj - Object | Array 被代理的对象
 * @param depth - boolean 是否深度创建代理
 * @return {Proxy} - 代理对象
 */
export function createComponentProxy(srcObj: any, depth?: boolean): ProxyConstructor;
/**
 * createPropsProxy - 创建props的代理
 * @param props - Object props
 * @return Proxy
 */
export function createPropsProxy(props: any): any;
/**
 * getPropertyVisitPathStr - 获取属性访问的完整字符串路径 a.b.c.d.e.f
 * @param target Proxy中set的target参数
 * @param key Proxy中set的key参数
 * @return {string}
 */
export function getPropertyVisitPathStr(target: any, key: any): string;
/**
 * isProxyProperty - 是否是代理属性 一般对$开头的属性不进行任何处理
 * @param property - Object
 * @return {boolean}
 */
export function isProxyProperty(property: any): boolean;
