import { hasVAttr, getDirectiveEntry } from './util';
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
    return getDirectiveEntry(el, attrName);
  });
}
