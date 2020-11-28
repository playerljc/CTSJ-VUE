/**
 * hasVElse - 是否有v-else属性
 * @param attrNames - Array 所有的指令属性集合
 * @return {boolean}
 */
export function hasVElse(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}else`);
}