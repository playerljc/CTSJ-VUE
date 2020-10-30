import { hasVAttr } from './util';
import { DIRECT_PREFIX } from '../../shared/constants';

/**
 * hasVModel
 * @param attrNames
 * @return {*}
 */
export function hasVModel(attrNames) {
  return hasVAttr(attrNames, `${DIRECT_PREFIX}model`);
}
