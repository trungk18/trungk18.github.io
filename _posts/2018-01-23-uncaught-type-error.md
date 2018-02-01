---
title: "Uncaught TypeError: Cannot read property 'name' of undefined"
categories: experience
tags: javascript typescript angular errorhandling
---

It is a very common error when working with object and array to get a `TypeError: Cannot read property 'name' of undefined`. This happens when we try to access a property of a value that is undefined or null in JavaScript.

![uncaught type error](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/uncaught-type-error.png)

```javascript
var movie = {
  name: "Interstellar",
  director: {
    name: "Christopher Nolan",
    born: "July 30, 1970"
  },
  music: "Hans Zimmer"
};
console.log(movie.director.name); //Christopher Nolan
console.log(movie.music.name); //undefined
console.log(movie.cast[0].name); //Uncaught TypeError: Cannot read property '0' of undefined

var obj = {};
console.log(obj.prop1.deepProp); //Uncaught TypeError: Cannot read property 'deepProp' of undefined
```

### Workarounds

There are some ways to avoid this kind of errors.

**1. The simplest approach is using the logical `AND operator &&`. **

```javascript
var obj = {};
console.log(obj.prop1.deepProp); //Uncaught TypeError: Cannot read property 'deepProp' of undefined
console.log(obj.prop1 && obj.prop1.deepProp); //undefined
```

This works because the `&&` operators actually return one of the value of the specified operands if these operators are used with non-Boolean values. The rule is described as. If we had `expr1 && expr2`, it will 

- Returns expr1 if it can be converted to false; otherwise, returns expr2. 
- Thus, when used with Boolean values, && returns true if both operands are true; otherwise, returns false.

See more on [Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)

The `obj.prop1 && obj.prop1.deepProp` returns `undefined` because `obj.prop1` is undefined which will be converted/coerced to `false`. The reason behind how JavaScript uses type coercion in Boolean contexts. You can read more, [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).

I often use the `&&` to check If the property is actually existed before going down further.

```javascript
//good
if (obj.prop1 && obj.prop1.deepProp) doSomething();

//error prone
if (obj.prop1.deepProp)
  //Uncaught TypeError: Cannot read property 'deepProp' of undefined
  doSomething();
```

It works well for small chains of properties, but getting ugly very soon If we are going too deep into a property.

```javascript
var obj = {
  prop1: {}
};
let neededProperty = obj.prop1.deepProp.veryVeryDeepProp;
//Uncaught TypeError: Cannot read property 'deepProp' of undefined

let deepProperty =
  obj.prop1 && 
  obj.prop1.deepProp.veryDeepProp.veryVeryDeepProp;
//Uncaught TypeError: Cannot read property 'deepProp' of undefined.
//Same error as above because prop1 is an object which will be coerced to true so that
//obj.prop1.deepProp.veryVeryDeepProp operand will be evaluated and throw and error

let safeProperty =
  obj.prop1 &&
  obj.prop1.deepProp &&
  obj.prop1.deepProp.veryDeepProp &&
  obj.prop1.deepProp.veryVeryDeepProp;
//undefined
//This is a very safe check but the code will be messy.
```

**2. Using try/catch blocks.**

Because some things can go wrong...

```javascript
try {
  let deepProperty =
    obj.prop1 && obj.prop1.deepProp.veryDeepProp.veryVeryDeepProp;
} catch (exception) {
  // do something else
}
```

But placing many try/catch blocks throughout your code just to access properties is neither practical nor readable.

**3. Helper function**

We will write a simple helper function that does nothing else but calling a provided function in a try/catch block. With the support of [ES6 Arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), we can call the helper function in just a one-line callback.

```javascript
var obj = {};

function getSafe(fn) {
  try {
    return fn();
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

// use it like this
let deepProperty = getSafe(() => obj.prop1.deepProp.veryDeepProp.veryVeryDeepProp);
```

![uncaught type error](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/uncaught-type-error-2.png)

That way, you will either get the property value or undefined. That works because JavaScript only evaluates the content of the inner callback (or closure) when it is actually executed. So it will only be evaluated inside of the try/catch block and not yet in the code calling the helper function. This version down below will **never work** because the property argument will be evaluated when we pass it into the function.

```javascript
var obj = {};

function getSafeNaive(property) {
  try {
    return property
  } catch (e) {    
    return undefined;
  }
}

let deepProperty = getSafeNaive(obj.prop1.deepProp.veryDeepProp.veryVeryDeepProp);
//error from here, so that cannot go inside the try catch block
```

### Elvis Operator

Some programming languages also support the so called elvis operator `?.` that is yet another approach to the same problem. Applying it to the dirty example from above would like this `obj?.prop1?.deepProp?.veryDeepProp?.veryVeryDeepProp`. Essentially, it makes the compiler stop accessing more nested properties as soon as one of them is null (or undefined, or whatever null-type(s) that language uses).

Currently, there is no elvis operator in neither JavaScript nor TypeScript.

In Angular, there is the support elvis operator to protect against a view render failure. They call it [safe navigation operator](https://angular.io/guide/template-syntax#expression-operators). Take the example below

```javascript
{% raw %}
The current person name is {{nullObject?.name}}
{% endraw %}
```

Since it is trying to access `name` property of a null value, **the whole view disappears** and you can see the error inside the browser console. It works perfectly with long property paths such as `a?.b?.c?.d`. So I recommend you to use it everytime you need to access a property inside a template.

