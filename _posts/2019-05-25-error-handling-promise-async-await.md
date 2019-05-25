---
title: "Error handling in ES6 Promises and async/await"
categories: experience
tags: javascript es6
---

Error handling in JavaScript has been always straightforward, at least for synchronous code. Consider the following example:

```javascript
function makeAnError() {
  throw Error("A system error occurred.");
}
try {
  makeAnError();
} catch (error) {
  console.log("Catching the error! " + error);
}

//Output 
//Catching the error! Error: Sorry mate!
```
