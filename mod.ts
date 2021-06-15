export function decorateAccessors<T extends Record<string, unknown>>(
  obj: T,
  callBack: (val: unknown) => void,
) {
  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val === "object") {
      (obj[key] as unknown) = decorateAccessors(val as any, callBack);
    }
  });
  return new Proxy(obj, {
    set: (obj, modifiedKey, value) => {
      Reflect.set(obj, modifiedKey, value);
      callBack(value);
      return true;
    },
  });
}
