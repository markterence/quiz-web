// Not sure about reactive support for `Map` in Vue 3. Use _groupBy instead
export function groupBy(data: any, field: any, mapper?: any) {
  const res = new Map();
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const key = item[field];
    const existing = res.get(key) || [];
    res.set(key, existing.concat([mapper ? mapper(item) : data[i]]));
  }
  return res;
}

export function _groupBy(data: unknown[], field: any, mapper?: any) {
  const result: any = {};
  data.forEach((item: any) => {
    result[mapper ? mapper(item[field]) : item[field]] = item;
  });
  return result;
}
