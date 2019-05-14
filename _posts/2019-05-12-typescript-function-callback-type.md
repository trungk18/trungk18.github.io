---
title: "TypeScript - Declare a function callback type"
categories: experience
tags: typescript
---

A "callback" is a term that refers to a coding design pattern, available in any language that has function pointers. In this pattern, you pass a pointer to a function to another function, so that within the called function, it can "call back" the function you passed to it.

You have to know to use callback in JavaScript. Often see it in many scenario. Let take a look at the example below.

```typescript
function sayHi(callback) {
    callback("Hi!");
}

function greeter(message){
	console.log(`${message}, how are you doing?`)
}

sayHi(greeter)
```
So I have a function `sayHi`, that accept another function as an argument and will execute this function when I start to call `sayHi`.  

When convert these code to TypeScript, it will look like