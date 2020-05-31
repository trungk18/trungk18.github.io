---
title: "TypeScript - Declare a function callback type"
categories: experience
tags: typescript
---

TL;DR To define the function callback type. You could declare an interface that has a call signature. Or define a new type.

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

## What is a callback?

A <u>callback</u> is a term that refers to a coding design pattern where you can pass a function to another function. So that within the called function, it can "call back" the function you passed to it.

Do you use a callback in JavaScript before ?!. Often seen in many scenarios. Let take a look at the example below.

```javascript
function greeter(message){
  console.log(`${message}, how are you doing?`)
}

function sayHi(callback) {
    callback("Hi!");
}

sayHi(greeter)
```

So there is a function `sayHi`, that accept another function as an argument and will execute this function when I start to call `sayHi`.  The problem is I don't know how the callback looks like, what is the type of its arguments. You can even call the function without any parameter, or multiple parameters. It doesn't matter at all.

In TypeScript, more often I would define an interface with a call signature like that.

```javascript
interface Greeter {
  (message: string): void;
}

function sayHi(callback: Greeter) {
  callback("Hi!");
}
```

By declaring an interface that has a call signature named `Greeter` which accepts a string as an argument. We can start to see callback detail.

![TypeScript - Declare a function callback type](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/typescript-function-callback-type-01.png)

If we change the signature of function `greeter` to number instead of string, it will show you an error that the type doesn't match. Now you have a strong type callback instead of just passing around function as we usually do in JavaScript.

![TypeScript - Declare a function callback type](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/typescript-function-callback-type-02.png)

## Generalize the callback type

We could also use `generic` to generalize the use case of callback with one parameter as below. By doing so, you don't have to define a new interface with a new name each time you need to use a callback with one parameter. Usually, the callback will not return any value, I default the `T2` type to `void`. But if you need to return a value from a callback function, you can specify the type for `T2`.

```javascript
interface CallbackOneParam<T1, T2 = void> {
  (param1: T1): T2;
}
```

See the two below examples in action.

### Void

```javascript
function greeter(message: string){
  console.log(`${message}, how are you doing?`)
}

function sayHi(callback: CallbackOneParam<string>) {
  callback("Hi!");
}

sayHi(greeter);
```

### With type

```javascript
function greeter(message: string) {
  return `${message}, how are you doing?`;
}

function sayHi(greeter: CallbackOneParam<string, string>) {
    let message = greeter("Hi!");
    console.log(message)
}

sayHi(greeter);
```

## Alternative

There are other ways to do it, you can refer to this [question][1]. One that worth mentioned is to define a type, but doing so will enforce the parameter name of this type and the function that you declare to be the same.

```javascript
type MyHandler = (message: string) => void;
```

## Reference

- [TypeScript handbook function type][0]
- [Stack][1]

[0]: https://www.typescriptlang.org/docs/handbook/interfaces.html#function-types
[1]: https://stackoverflow.com/q/13137350/3375906