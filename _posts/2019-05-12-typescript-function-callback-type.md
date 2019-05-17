---
title: "TypeScript - Declare a function callback type"
categories: experience
tags: typescript
---

TL;DR To define the function callback type. You could.

```javascript
interface Greeter {
  (message: string): void;
}

//OR
//type Greeter = (message: string) => void;

function sayHi(callback: Greeter) {
  callback("Hi!");
}
```

---

A "callback" is a term that refers to a coding design pattern, available in any language that has function pointers. In this pattern, you pass a pointer to a function to another function, so that within the called function, it can "call back" the function you passed to it.

You have to use callback in JavaScript before ?!. Often seen in many scenarios. Let take a look at the example below.

```javascript
function sayHi(callback) {
    callback("Hi!");
}

function greeter(message){
	console.log(`${message}, how are you doing?`)
}

sayHi(greeter)
```

So there is a function `sayHi`, that accept another function as an argument and will execute this function when I start to call `sayHi`.  The problem is I don't know how the callback looks like, what is the type of its arguments. You can event call the function without any parameter, or multiple parameters. Doesn't matter at all.

In TypeScript, more often I would define an interface  with call signature like that.

```javascript
interface Greeter {
  (message: string): void;
}

function sayHi(callback: Greeter) {
  callback("Hi!");
}
```

By declaring an interface that has a call signature named `Greeter` which accept a string as an argument. We can start to see callback detail.

![TypeScript - Declare a function callback type](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/typescript-function-callback-type-01.png)

If we change the signature of function `greeter` to number instead of string, it will show you an error that the type doesn't match. Now you have a strongly type callback instead of just passing around function as we usually do in JavaScript.

![TypeScript - Declare a function callback type](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/typescript-function-callback-type-02.png)


We could also use generic to generalize the use case of callback with one parameter as below. By doing so, you don't have to define a new interface with new name each time you need to use a callback with one parameter. 

```javascript
interface CallbackOneParam<T> {
  (param1: string): void;
}

function sayHi(callback: CallbackOneParam<string>) {
  callback("Hi!");
}

function greeter(message: string){
  console.log(`${message}, how are you doing?`)
}

sayHi(greeter);
```

There are other ways to do it, you can refer from this [question](https://stackoverflow.com/q/13137350/3375906). One that worth mentioned is to define a type, but doing so will enforce the parameter name of this type and the function that you declare to be the same.

```javascript
type MyHandler = (message: string) => void;
```




