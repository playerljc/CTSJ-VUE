/**
 * 本地持久化一对键值
 */
function putString(key, value, storage) {
  storage.setItem(key, value);
}

/**
 * 本地取出值
 */
function getString(key, storage) {
  return storage.getItem(key);
}

/**
 * 本地持久化一对键值
 */
function putObject(key, object, storage) {
  const val = JSON.stringify(object);
  putString(key, val, storage);
}

/**
 * 本地取出值
 */
function getObject(key, storage) {
  const val = storage.getItem(key);
  if (val == null) return null;

  return JSON.parse(val);
}

/**
 * 删除键值
 */
function remove(key, storage) {
  storage.removeItem(key);
}

export default {
  /**
   * 本地持久化一对键值(值为String)
   */
  putStringByLocal(key, value) {
    putString(key, value, window.localStorage);
  },

  /**
   * 本地取出值(值为String)
   */
  getStringByLocal(key) {
    return getString(key, window.localStorage);
  },

  /**
   * 本地持久化一对键值(值为对象)
   */
  putObjectByLocal(key, object) {
    putObject(key, object, window.localStorage);
  },

  /**
   * 本地取出值(值为对象)
   */
  getObjectByLocal(key) {
    return getObject(key, window.localStorage);
  },

  /**
   * 本地删除一个键值
   */
  removeByLocal(key) {
    remove(key, window.localStorage);
  },

  /**
   * 会话持久化一对键值(值为String)
   */
  putStringBySession(key, value) {
    putString(key, value, window.sessionStorage);
  },

  /**
   * 会话取出值(值为String)
   */
  getStringBySession(key) {
    return getString(key, window.sessionStorage);
  },

  /**
   * 会话持久化一对键值(值为对象)
   */
  putObjectBySession(key, object) {
    putObject(key, object, window.sessionStorage);
  },

  /**
   * 会话取出值(值为对象)
   */
  getObjectBySession(key) {
    return getObject(key, window.sessionStorage);
  },

  /**
   * 会话删除一个键值
   */
  removeBySession(key) {
    remove(key, window.sessionStorage);
  },
};
