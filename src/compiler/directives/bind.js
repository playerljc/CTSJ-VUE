import { hasVAttr, getDirectiveEntry } from './util';
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
    const entry = getDirectiveEntry(el, attrName);

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
