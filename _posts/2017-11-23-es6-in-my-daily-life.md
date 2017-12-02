---
title: "ES6 in my daily life"
categories: javascript es6 es2015
---

ES2015/ES6 has been around for more than two years with all the exciting feature and syntax. After working with TypeScript and Angular 2 in a project for more than a year, there are few part and features that I often apply in my code.

### [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

It provides the syntax for constructing strings. Basically, it helps us to:
- Write multiple lines of string
- Interpolate JavaScript into your string using `${}` 

```javascript
//basic literal string creation
`This is a pretty little template string.`

// Multiline strings
`in ES5 this is
 not legal.`

//construct string without the need to concat
const promise = fetch('/api/v1/users/${userId}', {
    method: 'post',
    headers: {        
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
})
```

### [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

It provides a better way to unpack value from arrays, or properties from an object into a variable.

```javascript
var a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20
```

### [Default Parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

It allows formal parameters to be initialized with default values if no value or undefined is passed.

```javascript
//es5
//function multiply(a, b) {
//  b = (typeof b !== 'undefined') ?  b : 1;
//  return a * b;
//}

//es6
function multiply(a, b = 1) {
  return a * b;
}

multiply(5, 2); // 10
multiply(5, 1); // 5
multiply(5);    // 5
```

### [… (spread operator and rest parameters)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

These provide a convenient way to shove any unnamed arguments passed to your function into an array, or do the inverse by calling a function with arguments extracted from an array.
```javascript
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
//append all items from arr2 onto arr1
arr1 = arr1.concat(arr2);

//with spread syntax this becomes:
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1 = [...arr1, ...arr2];
```

### My useful tips collection :)
#### 1. Swap variable
Using array destructive syntax
```javascript
let a = 'world', b = 'hello'
[a, b] = [b, a]
console.log(a) // -> hello
console.log(b) // -> world
```

#### 2. Concat/merge array
I often use spread operator to extract array value instead of concat function.

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

//old es5 way
const result = arr1.concat(arr2, arr3);

//another old es5 way 
const result = [].concat(arr1, arr2, arr3);

//new es6 way
const result = [...arr1, ...arr2, ...arr3];
```

#### 3. Default variable with ||
You will find it sometimes very very helpful.
```javascript
//old es5 way
function doSomething(options){
    options = options || {};
}

//new es6 way
function doSomething(options = {}){
    //todo
}
```

#### 4. Time testing
Ever wonder what’s faster: Looping with an i++ or looping with an i-- ? Just use [console's timing](https://developer.mozilla.org/en-US/docs/Web/API/console#Timers) method to test

```javascript
var a = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
console.time('testing with i++');
for (var i = 0; i < a.length; i++){
}
console.timeEnd('testing with i++'); //testing with i++: 0.010009765625ms


console.time('testing with i--');
for (var i = a.length - 1; i >= 0; i--){
}
console.timeEnd('testing with i--'); //testing with i--: 0.0107421875ms
```


### To learn ES6
- [https://babeljs.io/learn-es2015/](https://babeljs.io/learn-es2015/)
- [http://exploringjs.com/es6/](http://exploringjs.com/es6/)

Starting with the release of ES2015, the language has continued to evolve at a rapid pace. We saw there is the tons of feature of [ES2017](http://exploringjs.com/es2016-es2017/) on the way, such as `async/await` function. So hurry up and digest the ES 2015 before it become outdated.