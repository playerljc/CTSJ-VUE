import { MULIT_SPLIT_REGEX, PATH_SPLIT } from './constants';

/**
 * wrapPathByBase - 使用base包裹path
 * @param base - String 项目的base
 * @param path - String 路径
 * @return string wrapPath
 */
export function wrapPathByBase(base, path) {
  return `${base}/${path}`.replace(MULIT_SPLIT_REGEX, PATH_SPLIT);
}

/**
 * getCurRoutePath - 获取route向上的完整路径
 * @param route - Object 当前的路由对象
 * @return string
 */
export function getCurRoutePath(route) {
  const result = [];

  let curRoute = route;

  while (curRoute) {
    result.push(curRoute.path);

    // 不是以/结尾在添加/
    if (curRoute.path.lastIndexOf(PATH_SPLIT) === -1) {
      result.push(PATH_SPLIT);
    }

    curRoute = curRoute.parent;
  }

  if (result.length) {
    // 不是以/开头
    if (result[0].indexOf(PATH_SPLIT) === -1) {
      result.unshift(PATH_SPLIT);
    }

    // 不是以/结尾
    if (result[result.length - 1].indexOf(PATH_SPLIT) === -1) {
      result.push(PATH_SPLIT);
    }
  }

  return result.reverse().join('').replace(MULIT_SPLIT_REGEX, PATH_SPLIT);
}
