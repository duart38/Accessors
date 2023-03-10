/*
 *   Copyright (c) 2023 Duart Snel
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

export function decorateAccessors<T extends Record<string, unknown>>(
  obj: T,
  getCallBack: (key: string | symbol) => void,
  setCallBack: (key: string | symbol, val: unknown) => void,
) {
  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val === "object") {
      (obj[key] as unknown) = decorateAccessors(val as any, getCallBack, setCallBack);
    }
  });
  return new Proxy(obj, {
    set: (obj, key, value) => {
      Reflect.set(obj, key, value);
      setCallBack(key, value);
      return true;
    },
    get: (target, key, receiver) => {
      const value = Reflect.get(target, key, receiver);
      getCallBack(key);
      return value;
    }
  });
}
