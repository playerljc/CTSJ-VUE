// 生命周期钩子
export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
];

// 表达式的开始标签
export const START_TAG = '{{';
// 表达式的结束标签
export const END_TAG = '}}';

// 私有属性的符号
export const PRIVATE_SYMBOL = '$';

// 指令的前缀
export const DIRECT_PREFIX = 'v-';
// 指令的符号
export const DIRECT_SYMBOLS = [':', '.'];
// 指令的分割线
export const DIRECT_DIVIDING_SYMBOL = '-';
// 指令名字
export const DIRECT_TAGS = ['bind', 'on', 'show', 'if', 'else', 'else-if', 'for', 'html', 'model'];

// 特殊符号
export const SPECIAL_SYMBOL = '__';

// 创建代理排除的属性前缀
export const CREATE_PROXY_EXCLUDE_PREFIX = [PRIVATE_SYMBOL, SPECIAL_SYMBOL];
// 创建代理排除的属性后缀
export const CREATE_PROXY_EXCLUDE_SUFFIX = [SPECIAL_SYMBOL];
// 记录对象路径的变量
export const PATH_SYMBOLS = [
  `${SPECIAL_SYMBOL}parentName${SPECIAL_SYMBOL}`,
  `${SPECIAL_SYMBOL}parent${SPECIAL_SYMBOL}`,
];