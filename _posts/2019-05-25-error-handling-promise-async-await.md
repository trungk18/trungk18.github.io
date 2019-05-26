---
title: "Error handling in ES6 Promises and async/await"
categories: experience
tags: javascript es6
---

# Basic error handling

Error handling in JavaScript has been always straightforward, at least for synchronous code. Consider the following example:

```javascript
function makeAnError() {
  throw Error("A system error occurred.");
}

try {
  makeAnError();
} catch (error) {
  console.log(`${error}`);
}

//Output 
//Error: A system error occurred.
```

The error got in the catch block as expected. Now let's try with an asynchronous function:

```javascript
function makeAnError() {
  throw Error("A system error occurred.");
}

try {
  setTimeout(makeAnError, 1000);
} catch (error) {
  console.error(`${error}`);
}
```

The above code is asynchronous because of `setTimeout`. What happens if we run it?

```javascript
Uncaught Error: A system error occurred.
    at makeAnError (<anonymous>:2:9)
makeAnError @ VM86:2
setTimeout (async)
(anonymous) @ VM86:6
```

This time the output is different. The error didn’t go through the catch block. It was free to propagate up in the stack.

That's because try/catch only works with **synchronous code**.

**Functions scheduled to run with setTimeout are executed in the main loop, outside the body of code that originated them**.

### 1. To handle errors, put the try-catch inside the setTimeout handler:

```javascript
setTimeout(function () {
  try {
    throw Error("A system error occurred.");
  } catch (e) {
    console.error(`${error}`);
  }
}, 1000)
```

### 2. If you need to access the Error object from block that called setTimeout. Use [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(function () {
    try {
      throw Error("A system error occurred.");
    } catch (e) {
      reject(e)
    }
  }, 1000)
})

promise
  .then(result => console.log("Ok " + result))
  .catch(error => console.error("Ouch " + error))
```

# Async/await and error handling

