# How it works

```typescript
import { decorateAccessors } from "./mod.ts";

const myObj = {
  name: "John",
  age: 34,
};

const p = decorateAccessors(myObj, (v) => {
  console.log(v); // new value
  // do something when setter is called
});

// now you can just assign values and have the call-back triggered
p.age = 9999;
```
