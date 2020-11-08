import { hasVAttr, getDirectiveEntry } from './util';
import { DIRECT_PREFIX } from '../../shared/constants';
import { execExpression, isArray, toCamelCase } from '../../shared/util';

/**
 * hasVBind
 * @param attrNames
 * @return {*}
 */
export function hasVBind(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}bind`);
}

/**
 * getVBindEntrys
 * @param context
 * @param el
 * @param vAttrNames
 * @return Array
 */
export function getVBindEntrys({ context, el, vAttrNames }) {
  const bindAttrs = vAttrNames.filter((n) => n.indexOf(`${DIRECT_PREFIX}bind`) !== -1);
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

/**
 * parseVBind
 * @param context
 * @param el
 * @param vAttrNames
 * @param VNode
 * @return {*}
 */
export function parseVBind({ context, el, vAttrNames, VNode }) {
  const entrys = getVBindEntrys.call(this, { context, el, vAttrNames });

  entrys.forEach((entry) => {
    if (entry.arg === 'key') {
      VNode.key = entry.value;
    } else if (entry.arg === 'class') {
      Object.assign(VNode.data.class, entry.value);
    } else if (entry.arg === 'style') {
      Object.assign(VNode.data.style, entry.value);
    } else if (entry.arg.startsWith('data-')) {
      VNode.data.dataset[toCamelCase(entry.arg.substring('data-'.length))] = entry.value;
    } else {
      VNode.data.props[entry.arg] = entry.value;
    }
  });
  return entrys;
}
