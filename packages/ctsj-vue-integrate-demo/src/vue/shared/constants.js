// 日志是否输出
export const IS_LOG_OUTPUT = true;

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

// 组的key名称
export const GROUP_KEY_NAME = '_group';

// 表单的触发控件
export const FORM_CONTROL_CHECKED_TAG_NAMES = ['radio', 'checkbox'];

// 表单的输入控件
export const FORM_CONTROL_INPUT_TAG_NAMES = ['input', 'textarea'];

// 受v-model控制的控件名称
export const FORM_CONTROL_BINDING_TAG_NAMES = ['input', 'textarea', 'select'];
