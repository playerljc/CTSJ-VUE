import { hasVAttr, getDirectName, getDirectArg, getDirectModifiers } from './util';
import { DIRECT_PREFIX } from '../../shared/constants';

/**
 * hasVOn
 * @param attrNames
 * @return {*}
 */
export function hasVOn(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}on`);
}

/**
 * parseVOn
 * @param context
 * @param el
 * @param attrNames
 * @return {*}
 */
export function parseVOn(context, el, attrNames) {
  // 可以有多个v-on
  // <div v-on:click="count + 1" v-on:blur="" v-on:change="" v-on:input=""></div>

  const onAttrs = attrNames.filter((n) => n.indexOf(`${DIRECT_PREFIX}on`) !== -1);
  return onAttrs.map((attrName) => {
    // entry.value = execExpression(context, entry.expression);
    return {
      name: getDirectName(attrName), // 指令名，不包括 v- 前缀。(on)
      value: '', // 指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
      expression: el.getAttribute(attrName), // 字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
      arg: getDirectArg(attrName), // 传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
      modifiers: getDirectModifiers(attrName), // 一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
    };
  });
}
