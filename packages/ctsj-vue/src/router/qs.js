/**
 * parse - 解析window.location.search为对象
 * @param ?arg string 待解析的字符串
 * @return Object<key/value> | null
 */
export function parse(arg) {
  // window.location.search
  // "?context=%7B%22nid%22%3A%22news_9870254026469711477%22%7D&n_type=0&p_from=1"

  let searchStr = '';

  if (arg) {
    searchStr = arg.trim();
  } else {
    const { search } = window.location;

    searchStr = search.trim();
  }

  if (!searchStr) return {};

  if (searchStr.indexOf('?') === 0) {
    searchStr = searchStr.substring(1);
  }

  const entitys = searchStr.split('&');

  const result = {};

  for (let i = 0, len = entitys.length; i < len; i++) {
    const entity = entitys[i];

    if (!entity.trim()) continue;

    const entry = entity.split('=');

    if (entry.length < 2) continue;

    const [key, value] = entry;

    result[key] = value.trim() ? decodeURIComponent(value.trim()) : value.trim();
  }

  return result;
}

/**
 * stringify - 反序列化obj对象为query字符串
 * @param obj - Object
 * @return string
 */
export function stringify(obj) {
  const queryObj = obj || {};

  const keys = Object.keys(queryObj);

  const result = [];

  keys.forEach(function (key, index) {
    result.push(`${index === 0 ? '?' : ''}${key}=${encodeURIComponent(queryObj[key])}`);
  });

  return result.join('&');
}
