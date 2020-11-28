import { execExpression, isArray, createExecutionContext } from '../../shared/util';
import { getDirectiveEntry, hasVAttr } from './util';
import {
  FORM_CONTROL_BINDING_TAG_NAMES,
  FORM_CONTROL_CHECKED_TAG_NAMES,
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
  return getInputProp.call(this,{ context, el, propName: 'type' }) || 'text';
}

/**
 * getInputValue
 * @param context
 * @param el
 * @return String
 */
function getInputValue(context, el) {
  return getInputProp.call(this,{ context, el, propName: 'value' });
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
    return execExpression.call(this, context, value);
  }

  return '';
}

/**
 * hasProp - 是否存在指定的属性
 * @param el
 * @param prop
 * @return {boolean}
 */
function hasProp({ el, prop }) {
  const attrNames = el.getAttributeNames();
  let exists = attrNames.includes(prop);

  if (!exists) {
    exists = attrNames.includes(`${DIRECT_PREFIX}bind:${prop}`);
  }

  return exists;
}

/**
 * getVModelEntrys
 * @param el
 * @param vAttrNames
 * @return {{expression: *, arg: string, name: string, modifiers: {}|{}, value: string}|null}
 */
export function getVModelEntrys({ el, vAttrNames }) {
  const attrs = vAttrNames.filter((n) => n.indexOf(`${DIRECT_PREFIX}model`) !== -1);

  if (!attrs.length) return null;

  // 取出最后一个attr
  const attrName = attrs[attrs.length - 1];

  // 获取v-model="xxx" 的 xxx
  return getDirectiveEntry(el, attrName);
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

  // const attrs = vAttrNames.filter((n) => n.indexOf(`${DIRECT_PREFIX}model`) !== -1);
  //
  // if (!attrs.length) return null;
  //
  // // 取出最后一个attr
  // const attrName = attrs[attrs.length - 1];

  // 获取v-model="xxx" 的 xxx
  // const entry = getDirectiveEntry(el, attrName);
  const entry = getVModelEntrys({ el, vAttrNames });

  if (!entry) return null;

  // v-model的值
  const value = execExpression.call(this, context, entry.expression);

  const inputType = getInputType(context, el);
  const inputValue = getInputValue(context, el);

  // 1.赋值
  if (tagName === 'input') {
    // radio | checkbox
    if (FORM_CONTROL_CHECKED_TAG_NAMES.includes(inputType)) {
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
  // textarea
  else if (tagName === 'textarea') {
    VNode.data.props.value = value;
  }
  // select
  else if (tagName === 'select') {
    debugger;
    //  <select>
    //    <option>java</option>
    //    <option>c++</option>
    //    <option>javascript</option>
    //  </select>

    // 获取select下所有的option
    const optionEls = Array.from(el.querySelectorAll('option'));
    optionEls.forEach((optionEl) => {
      // 获取option的value value表示的是text或value
      const val = optionEl.value.trim();

      // model的值是数组
      if (isArray(value)) {
        if (value.includes(val)) {
          optionEl.setAttribute('selected', 'selected');
        }
      }
      // model的值不是数组
      else if (val == value) {
        optionEl.setAttribute('selected', 'selected');
      }
    });
  }

  const { lazy } = entry.modifiers;

  // 2.事件
  // select标签
  if (tagName === 'select') {
    VNode.data.on.change = (e) => {
      createExecutionContext.call(self, self, function () {
        const { selectedOptions } = e.target;

        // 多选的模式
        if (hasProp({ el, prop: 'multiple' })) {
          // model的值是数组
          if (isArray(value)) {
            self.$dataProxy[entry.expression] = Array.from(selectedOptions).map((selectedOption) =>
              filterChain(selectedOption.value, entry),
            );
          }
          // 不是数组不处理
        }
        // 非多选的模式
        else {
          // 不是数组才处理
          if (!isArray(value)) {
            self.$dataProxy[entry.expression] = filterChain(selectedOptions[0].value, entry);
          }
        }
      });
    };
  }
  // input标签
  else if (tagName === 'input') {
    // radio | checkbox
    if (FORM_CONTROL_CHECKED_TAG_NAMES.includes(inputType)) {
      // 有value属性
      if (inputValue) {
        //  <input type="radio" value="1" v-model="sex" />男
        //  <input type="radio" value="2" v-model="sex" />女
        if (inputType === 'radio') {
          VNode.data.on.change = (e) => {
            createExecutionContext.call(self, self, function () {
              self.$dataProxy[entry.expression] = e.target.checked ? inputValue : '';
            });
          };
        }
        //  <input type="checkbox" value="1" v-model="data" />java
        //  <input type="checkbox" value="2" v-model="data" />c++
        //  <input type="checkbox" value="3" v-model="data" />javascript
        else if (inputType === 'checkbox') {
          if (isArray(value)) {
            VNode.data.on.change = (e) => {
              createExecutionContext.call(self, self, function () {
                if (e.target.checked) {
                  self.$dataProxy[entry.expression].push(inputValue);
                } else {
                  const deleteIndex = self.$dataProxy[entry.expression].indexOf(inputValue);
                  if (deleteIndex !== -1) {
                    self.$dataProxy[entry.expression].splice(deleteIndex, 1);
                  }
                }
              });
            };
          }
          // 不是数组
          else {
            VNode.data.on.change = (e) => {
              createExecutionContext.call(self, self, function () {
                self.$dataProxy[entry.expression] = e.target.checked ? inputValue : '';
              });
            };
          }
        }
      }
      // 没有value属性
      else {
        VNode.data.on.change = (e) => {
          createExecutionContext.call(self, self, function () {
            self.$dataProxy[entry.expression] = e.target.checked;
          });
        };
      }
    }
    // text | number ... lazy
    else if (lazy) {
      VNode.data.on.change = (e) => {
        createExecutionContext.call(self, self, function () {
          self.$dataProxy[entry.expression] = filterChain(e.target.value, entry);
        });
      };
    }
    // text | number ... 没有lazy
    else {
      VNode.data.on.input = (e) => {
        createExecutionContext.call(self, self, function () {
          self.$dataProxy[entry.expression] = filterChain(e.target.value, entry);
        });
      };
    }
  }
  // textarea标签 lazy
  else if (lazy) {
    VNode.data.on.change = (e) => {
      createExecutionContext.call(self, self, function () {
        self.$dataProxy[entry.expression] = filterChain(e.target.value, entry);
      });
    };
  }
  // textarea标签 没有lazy
  else {
    VNode.data.on.input = (e) => {
      createExecutionContext.call(self, self, function () {
        self.$dataProxy[entry.expression] = filterChain(e.target.value, entry);
      });
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
  return FORM_CONTROL_BINDING_TAG_NAMES.includes(tagName);
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
