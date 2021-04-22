type objectType = Record<string, unknown>;
function makeDefaultProperty(obj: objectType, name: string, callBack: (val: unknown, obj: objectType)=>void) {
    let value = obj[name];
    return Object.defineProperty(obj, name, {
      set: function (val) {
        value = val;
        callBack(value, obj);
      },
      get: function () {
        return value;
      }
    });
}
export function decorateAccessors(obj: objectType, callBack: (val: unknown, obj?: objectType)=>void){
    Object.entries(obj).forEach(([key, val])=>{
        if(typeof val === "object"){
            decorateAccessors(val as any, callBack);
        }
        makeDefaultProperty(obj, key, callBack); // NOTE: obj here needs to be the scope that the key is in..
    });
}