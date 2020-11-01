import { execExpression, isArray } from '../../shared/util';
import { getDirectiveEntry, hasVAttr } from './util';
import {
  FORM_CONTROL_BINDING_TAGNAMES,
  FORM_CONTROL_CHECKED_TAGNAMES,
  DIRECT_PREFIX,
} from '../../shared/constants';

/**
 * hasVModel
 * @param attrNames
 * @return {*}
 */
export function hasVModel(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}model`);
}

/**
 * getInputType
 * @param context
 * @param el
 * @return String
 */
function getInputType(context, el) {
  return getInputProp({ context, el, propName: 'type' }) || 'text';
}

/**
 * getInputValue
 * @param context
 * @param el
 * @return String
 */
function getInputValue(context, el) {
  return getInputProp({ context, el, propName: 'value' });
}

/**
 * getInputProp
 * @param context
 * @param el
 * @param propName
 * @return {string|*}
 */
function getInputProp({ context, el, propName }) {
  const attrNames = el.getAttributeNames();
  if (attrNames.includes(propName)) {
    return el.getAttribute(propName);
  }
  if (attrNames.includes(`${DIRECT_PREFIX}bind:${propName}`)) {
    const value = el.getAttribute(`${DIRECT_PREFIX}bind:${propName}`);
    return execExpression(context, value);
  }

  return '';
}

/**
 * parseVModel
 * @param context
 * @param el
 * @param vAttrNames
 * @param tagName
 * @param VNode
 * @return {*}
 */
export function parseVModel({ context, el, vAttrNames, tagName, VNode }) {
  const self = this;

  const attrs = vAttrNames.filter((n) => n.indexOf(`${DIRECT_PREFIX}model`) !== -1);

  if (!attrs.length) return null;

  // 取出最后一个attr
  const attrName = attrs[attrs.length - 1];

  // 获取v-model="xxx" 的 xxx
  const entry = getDirectiveEntry(el, attrName);

  if (!entry) return null;

  // v-model的值
  const value = execExpression(context, entry.expression);

  const inputType = getInputType(context, el);
  const inputValue = getInputValue(context, el);

  // 1.赋值
  if (tagName === 'input') {
    // radio | checkbox
    if (FORM_CONTROL_CHECKED_TAGNAMES.includes(inputType)) {
      // value属性
      if (inputValue) {
        //  <input type="radio" value="1" v-model="sex" />男
        //  <input type="radio" value="2" v-model="sex" />女
        if (inputType === 'radio') {
          VNode.data.props.checked = value == inputValue;
        }
        // checkbox
        //  <input type="checkbox" value="1" v-model="data" />java
        //  <input type="checkbox" value="2" v-model="data" />c++
        //  <input type="checkbox" value="3" v-model="data" />javascript
        else if (inputType === 'checkbox') {
          if (isArray(value)) {
            VNode.data.props.checked = value.includes(inputValue);
          } else {
            VNode.data.props.checked = value == inputValue;
          }
        }
      }
      // 没有value属性
      else {
        VNode.data.props.checked = value;
      }
    }
    // text | number | ...
    else {
      VNode.data.props.value = value;
    }
  }
  // textarea | select
  else {
    VNode.data.props.value = value;
  }

  const { lazy } = entry.modifiers;

  // 2.事件
  // select标签
  if (tagName === 'select') {
    VNode.data.on.change = (e) => {
      // select 的change
      self.$dataProxy[entry.expression] = filterChain(e.target.value, entry);
    };
  }
  // input标签
  else if (tagName === 'input') {
    // radio | checkbox
    if (FORM_CONTROL_CHECKED_TAGNAMES.includes(inputType)) {
      // 有value属性
      if (inputValue) {
        //  <input type="radio" value="1" v-model="sex" />男
        //  <input type="radio" value="2" v-model="sex" />女
        if (inputType === 'radio') {
          VNode.data.on.change = (e) => {
            self.$dataProxy[entry.expression] = e.target.checked ? inputValue : '';
          };
        }
        //  <input type="checkbox" value="1" v-model="data" />java
        //  <input type="checkbox" value="2" v-model="data" />c++
        //  <input type="checkbox" value="3" v-model="data" />javascript
        else if (inputType === 'checkbox') {
          if (isArray(value)) {
            VNode.data.on.change = (e) => {
              if (e.target.checked) {
                self.$dataProxy[entry.expression].push(inputValue);
              } else {
                const deleteIndex = self.$dataProxy[entry.expression].indexOf(inputValue);
                if (deleteIndex !== -1) {
                  self.$dataProxy[entry.expression].splice(deleteIndex, 1);
                }
              }
            };
          }
          // 不是数组
          else {
            VNode.data.on.change = (e) => {
              self.$dataProxy[entry.expression] = e.target.checked ? inputValue : '';
            };
          }
        }
      }
      // 没有value属性
      else {
        VNode.data.on.change = (e) => {
          self.$dataProxy[entry.expression] = e.target.checked;
        };
      }
    }
    // text | number ... lazy
    else if (lazy) {
      VNode.data.on.change = (e) => {
        self.$dataProxy[entry.expression] = filterChain(e.target.value, entry);
      };
    }
    // text | number ... 没有lazy
    else {
      VNode.data.on.input = (e) => {
        self.$dataProxy[entry.expression] = filterChain(e.target.value, entry);
      };
    }
  }
  // textarea标签 lazy
  else if (lazy) {
    VNode.data.on.change = (e) => {
      self.$dataProxy[entry.expression] = filterChain(e.target.value, entry);
    };
  }
  // textarea标签 没有lazy
  else {
    VNode.data.on.input = (e) => {
      self.$dataProxy[entry.expression] = filterChain(e.target.value, entry);
    };
  }

  return entry;
}

/**
 * isFormTag
 * @param tagName
 * @return {boolean}
 */
export function isFormTag(tagName) {
  return FORM_CONTROL_BINDING_TAGNAMES.includes(tagName);
}

/**
 * filterChain
 * @param value
 * @param directiveEntry
 */
export function filterChain(value, directiveEntry) {
  let result = value;

  const chains = [
    {
      condition: directiveEntry.modifiers.trim,
      handler: (val) => {
        return val.trim();
      },
    },
    {
      condition: directiveEntry.modifiers.number,
      handler: (val) => {
        return Number(val);
      },
    },
  ];

  chains.forEach(({ condition, handler }) => {
    if (condition) {
      result = handler(result);
    }
  });

  return result;
}
