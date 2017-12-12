---
title: "JavaScript naming convention"
categories: javascript myexperience
---

> "There are only two hard things in Computer Science: cache invalidation and naming things" - Phil Karlton

### TL;DR

- Variable name is always camel case and should begin with a noun;
- Functions name should begin with a verb.
- Make the variable name as short as possible.
- A single-character variable name such as `i`, `j`, `k` are typically reserved for use in loops.
- The meaningless name should be avoided as well, such as `foo`, `bar`.
- To define a constant variable, remember to use all uppercase letters with underscores separating words.

------

I have been working with C# and JavaScript for the past few years and came to realize that each language seems to have its own set of naming conventions. I'd like to share with you some naming conventions for JavaScript that I personally prefer.

Most of the code you write involves variables and functions, so determining the naming for those is very important to a comprehensive code. JavaScript's core, ECMAScript, is written using a convention called **_camel case_**. Basically, its name begins with a lower case letter and each sub-sequent word begins with an uppercase letter. E.g

```javascript
var theName;
var anotherVariable;
```

Camel-case is also the most JavaScript developers name variable and function.

You might hear of [Hungarian notations](https://en.wikipedia.org/wiki/Hungarian_notation) was popular for JavaScript a few years back. It involved prepending a variable type identifier at the beginning of a name.

```javascript
var strName;//string
var bBusy;//boolean
```

### Variable and Functions

Variable name is always camel case and should begin with a noun to differentiate variables from functions, which normally should begin with a verb.

```javascript
//good
var count = 10;
var myName = "Trung";
var active = true;

//bad: confused with function
var getCount = 10;
var isActive = true;

//good
function getName(){
    return myName;
}

//bad: confused with variable
function name(){
    return myName;
}
```

Generally speaking, you should try to make the variable name as short as possible. Try to make the variable name indicate the data type of its value. For example, `count`, `length`, `size` suggest a data type is a number. `name`, `title` sounds like as string. A single-character variable name such as `i`, `j`, `k` are typically reserved for use in loops.

The meaningless name should be avoided as well, such as `foo`, `bar`.

For functions and methods name, the first word should always be a verb, and there are some common conventions used as described in the table below.

| Verb         | Meaning                        |
|--------------|--------------------------------|
| can/ has/ is | Function returns a boolean     |
| get          | Function returns a non-boolean |
| set          | Function to save a value       |

### Constants

To differentiate normal variables (which to have changes value) and constants (which initialized to a value and never change), I often use the all uppercase letters with underscores separating words.

```javascript
var MAX_ITEM = 15;
var URL = 'https://www.zyllem.com/discover-zyllem'
```

### More to come includes function constructor and literal values