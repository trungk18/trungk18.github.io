---
title: "JavaScript: Understanding the Weird Parts Notes"
categories: experience
---

Below notes were taken from an Udemy course - [JavaScript: Understanding the Weird Parts][udemy] that I learned about four years ago. At that time, I had a shallow knowledge of how JS is working. I only know some basic stuff:

- `var x` to create a variable
- How to write a function. Most of the newbie don't even know what is the difference between `function declaration` and `function expression`.
- How to invoke a callback for asynchronous operation such as HTTP calls.
- How to work with Object - `{}`
- How to work with array and some easy manipulation - `[]`
- Some jQuery knowledge for DOM modification. Personally, I got some good knowledge working with jQuery, such as the module pattern, and revealing module pattern. That lead me to learn more about Immediately Invoked Function Expressions (IIFE).

Only with this simple knowledge without a deep understanding of JS, I could even build a [mobile app][mhearing] by myself. It is still live today with many users :) It was not the best I could do, but at least this gave me a real chance to work with `AngularJS`, not just only a simple Todo app or the like.

Gradually, I felt like I have to learn JS properly. That's why I started this course. And it was really helpful to shape my knowledge until today.

## Syntax Parser

A program that reads your code and determines what it does and If its grammar is valid

- The compiler translates the entire program before it is run.
- The interpreters translate a line at a time while the program is being run.

## Lexical Environment

Exists in programming languages in where you write something is important. Where it was written and what surrounds it.

## Execution Context

A wrapper to help manage the code that is running. There are lots of lexical environments. Which one is currently running is managed via execution contexts.

## Single Threaded, Synchronous Execution

One command at a time. Under the hood of the browser, maybe not.

## Synchronous vs Asynchronous

| Synchronous  | One at a time and in order that it appeared |
| ------------ | ------------------------------------------- |
| Asynchronous |  More than one at a time.                   |

## Invocation

Running a function in JS by using parenthesis `()`

## Variable Environment

Where the variable lives and how they relate to each other in the `memory -> scope`

## Execution Stack and Event Queue

## Dynamic Typing

You don't tell the engine what type of data a variable holds, it figures it out while your code is running

## Primitive type

A type of data that represents a single value, not an object. They are Case-sensitive.

- Undefined: represents a lack of existence
- Null
- Boolean: true or false
- Number: floating-point number, essentially there's always some decimals)
- String: a sequence of characters (both '' and "" can use)
- Symbol

## Operator

A special function that is written differently. Generally, it takes two parameters and returns one result. Such as add `+` operator. `+(3, 4) = 3 + 4`.

- Operator Precedence: which operator function gets called first. If you have more than one operator, the highest will be called first.

- Associativity: Which order operator functions get called in: left-right or right-left when functions have the same precedence.

```javascript
let sum = 3 + 4 * 5;
let a = 2,
  b = 3,
  c = 4;

a = b = c = 4;
//1. b = c <=> b = 4
//2. a = 4
//3. return 4
```

### Type of Operator

- Arithmetic Operator: `+` `-` `*` `/` `++` `--`
- Comparison Operator: Not Equal to (!+)
- Logical Operator: && | !
- String Operator takes two string operators as operands and creates a new string
- Evaluation Operator (Ternary Operator) `let status = (age >= 18) ? "adult" : "minor"`

## Coercion

Convert a value from one type to another.

```javascript
var a = 1 + "2"; //'12'
let x = undefined || "hello"; //'hello' => return the first one that can be coerced to true
```

## Statement

Performs an action. Loops and if statements are examples of statements.

## Expression

A unit of code that results in a value. It doesn't have to save to a variable.

## this

### Invoking the function

Assign `this` to `window`. Even it is sitting inside a function. The short version is: a function invocation like `fn(...args)` is the same as `fn.call(window [ES5-strict: undefined], ...args)`.

### Invoking the method inside the object

`this` will be the object.

```javascript
// But caution if you reference the method of obj without calling it
var obj = {
  fn1: function () {
    alert(this);
    //inner function
    var x = () => {
      //closure
      alert(this);
      return this;
    };
    return x;
  },
  fn2: function () {
    alert(this);
  },
};
let f1 = obj.fn1();
f1(); //this === obj
let f2 = obj.fn2;
f2(); //this === window
```

## Arguments

The parameters you pass to a function

## Immediately Invoked Function Expressions (IIFE)

```javascript
//function declaration
function greet(name) {
  console.log("Hello " + name);
}

//function expression
var greetFunc = function (name) {
  console.log("Hello " + name);
};

//immediately invoked function expression
var greetFunc = (function (name) {
  console.log("Hello " + name);
})("John");

//create function and run it
(function (name) {
  return "Hello " + name;
})("World");
```

## Closure

Access to the outer variable that doesn't matter whether the outer function has finished running or not.

```javascript
function greet(hello) {
  return function (name) {
    console.log(hello + " " + name);
  };
}

var sayHi = greet("Hi");
sayHi("Trung");
```

## Bind, apply, call

| Bind        | Create a copy of function with different this variable                 |
| ----------- | ---------------------------------------------------------------------- |
| Apply, call | Call attaches this into function and executes the function immediately |

```javascript
var person = {
  firstName: "John",
  lastName: "Doe",
  getFullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

var logName = function (lang) {
  console.log("Logged " + this.getFullName());
}.bind(person);

var logPersonName = logName.bind(person);
logPersonName(); //bind
logName.call(person, "en"); //call
logName
  .apply(person, ["en"])(
    //apply

    function (lang) {
      console.log("Logged " + this.getFullName());
    }
  )
  .apply(person);

var person2 = {
  firstName: "Trung",
  lastName: "Tuan",
};
```

## Reflection

An object and look at itself, listing and changing its property and method.

## Function Constructor

A normal function that is used to construct object. This variable points to a new empty object and that object are returned from the function automatically.

For method, I only need one so that I added to the prototype.

[udemy]: https://www.udemy.com/course/understand-javascript/
[mhearing]: https://www.statecourts.gov.sg/cws/Pages/mHearing.aspx
