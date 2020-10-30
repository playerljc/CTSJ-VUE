import { hasVAttr, getDirectName, getDirectArg, getDirectModifiers } from './util';
import { DIRECT_PREFIX } from '../../shared/constants';
import { execExpression, isArray } from '../../shared/util';

/**
 * hasVBind
 * @param attrNames
 * @return {*}
 */
export function hasVBind(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}bind`);
}

/**
 * parseVBind
 * @param context
 * @param el
 * @param attrNames
 * @return {*}
 */
export function parseVBind(context, el, attrNames) {
  const bindAttrs = attrNames.filter((n) => n.indexOf(`${DIRECT_PREFIX}bind`) !== -1);
  return bindAttrs.map((attrName) => {
    const entry = {
      name: getDirectName(attrName), // 指令名，不包括 v- 前缀。(on)
      value: '', // 指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
      expression: el.getAttribute(attrName), // 字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
      arg: getDirectArg(attrName), // 传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
      modifiers: getDirectModifiers(attrName), // 一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
    };

    if (entry.arg === 'class' || entry.arg === 'style') {
      if (entry.arg === 'class') {
        if (entry.expression.startsWith('{') && entry.expression.endsWith('}')) {
          // { active: isActive, 'text-danger': hasError }
          entry.expression = `Object(${entry.expression})`;
        }
        // <div v-bind:class="classObject"></div>
        // [activeClass, errorClass]
        entry.value = execExpression(context, entry.expression);
        if (isArray(entry.value)) {
          const classNames = entry.value;
          entry.value = {};
          classNames.forEach((className) => {
            entry.value[className] = true;
          });
        }
      }
      if (entry.arg === 'style') {
        if (
          entry.expression.indexOf('{') === 0 &&
          entry.expression.lastIndexOf('}') === entry.expression.length - 1
        ) {
          entry.expression = `Object(${entry.expression})`;
        }
        entry.value = execExpression(context, entry.expression);
      }
    } else {
      entry.value = execExpression(context, entry.expression);
    }

    return entry;
  });
}
