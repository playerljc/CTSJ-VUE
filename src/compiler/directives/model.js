import { getDirectiveEntry, hasVAttr } from './util';
import { FORM_CONTROL_BINDING_TAGNAMES, DIRECT_PREFIX } from '../../shared/constants';

/**
 * hasVModel
 * @param attrNames
 * @return {*}
 */
export function hasVModel(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}model`);
}

/**
 * parseVModel
 * @param el
 * @param attrNames
 * @return {*}
 */
export function parseVModel(el, attrNames) {
  const attrs = attrNames.filter((n) => n.indexOf(`${DIRECT_PREFIX}model`) !== -1);
  if (attrs.length) {
    let attrName = attrs[attrs.length - 1];
    const tagName = el.tagName.toLowerCase();
    const lazyIndex = attrName.indexOf('.lazy');

    const { expression } = getDirectiveEntry(el, attrName);

    if (tagName === 'input' || tagName === 'textarea') {
      // v-model.lazy
      if (lazyIndex !== -1) {
        attrName = `${attrName.substring(0, lazyIndex)}:change${attrName.substring(lazyIndex)}`;
      } else {
        attrName = `${attrName}:input`;
      }
    } else if (tagName === 'select') {
      if (lazyIndex !== -1) {
        attrName = `${attrName.substring(0, lazyIndex)}:change${attrName.substring(lazyIndex)}`;
      } else {
        attrName = `${attrName}:change`;
      }
    }

    const entry = getDirectiveEntry(el, attrName);
    entry.expression = expression;
    return entry;
  }

  return null;
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
 * onFormTagTrigger
 * @param tagName
 * @param vAttrNames
 * @param directiveEntry
 * @param callback1
 * @param callback2
 * @param callback3
 */
export function onFormTagTrigger({
  tagName,
  vAttrNames,
  directiveEntry,
  callback1,
  callback2,
  callback3,
  callback4,
}) {
  // 是否是表单控件元素
  const isFormTagVal = isFormTag(tagName);

  // 是否有v-model
  const hasVModelVal = hasVModel(vAttrNames);

  if (isFormTagVal) {
    // 表单控件
    if (hasVModelVal) {
      // 设置了v-model
      if (directiveEntry.arg === 'input') {
        // input事件
        if (tagName === 'input' || tagName === 'textarea') {
          // 标签是 input | textarea
          if (!directiveEntry.modifiers.lazy) {
            // 没设置lazy
            if (callback1) {
              callback1();
              return false;
            }
          }
        }
      } else if (directiveEntry.arg === 'change') {
        // change事件
        if (tagName === 'select') {
          // select标签
          if (callback2) {
            callback2();
            return false;
          }
        } else if (tagName === 'input' || tagName === 'textarea') {
          // input | textarea 标签
          if (directiveEntry.modifiers.lazy) {
            // 设置了lazy
            if (callback3) {
              callback3();
              return false;
            }
          }
        }
      }
    }
  }

  if (callback4) {
    callback4();
  }

  return false;
}
