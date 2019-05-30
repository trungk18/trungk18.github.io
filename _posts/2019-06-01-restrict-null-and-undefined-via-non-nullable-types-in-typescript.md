---
title: "Restrict null and undefined via Non-Nullable-Types in TypeScript"
categories: experience
tags: typescript
---

It is by default that you can assign null or undefined value to any type in TypeScript.

```javascript
function trimText(str: string) {
  console.log(str.trim());
}

let inputStr = "Hello I am Trung"; 

trimText(inputStr);

inputStr = null;
trimText(inputStr);
```

The later code will call `trimText` with null variable, the complier doesn't complain about that but we know it will break at runtime. Because there is no function `trim` on `null` type.


