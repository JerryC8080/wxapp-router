export const setter = <ValueType>(obj, key, value: ValueType) => {
  const keys = key.split('.');
  const pres = keys.slice(0, -1);
  const last = keys[keys.length - 1];
  const deepObj =
    keys.length === 1
      ? obj
      : pres.reduce((curObj, curKey) => {
          if (!curObj[curKey]) curObj[curKey] = {};
          return curObj[curKey];
        }, obj);
  deepObj[last] = value;
  return obj;
};

export const obj2Params = (obj = {}, encode = false) => {
  const result: string[] = [];
  Object.keys(obj).forEach((key) =>
    result.push(`${key}=${encode ? encodeURIComponent(obj[key]) : obj[key]}`)
  );

  return result.join('&');
};

/**
 * 将url后的参数string转成object
 * @param str - query部分参数，如：abc=foo&def=%5Basf%5D&xyz=5
 */
export const urlStrToObj = (str: string, urlDeocde = false) => {
  let cookedStr = urlDeocde ? decodeURIComponent(str) : str;

  cookedStr =
    '{"' +
    cookedStr.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
    '"}';
  return JSON.parse(cookedStr);
};
