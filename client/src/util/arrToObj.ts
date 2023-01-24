const arrToObj = (arr: [string, any][]) =>
  arr.reduce<{ [key: string]: any }>((res, [key, value]) => {
    res[key] = value;
    return res;
  }, {});

export default arrToObj;
