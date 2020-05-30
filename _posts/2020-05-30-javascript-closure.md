---
title: "What is JavaScript Closure?"
categories: experience
---

In short, a closure is not the function that is returned in another function. A closure is a combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function.

--

I still remember an interview with the customer five years ago when I worked in Hanoi. I was just graduated from university at that time and didn't have much experience.

There were some basic questions such as `"1" + 1 will evaluate in what value?`. I knew the answer is `"11"` but have no idea what is [type coercion](https://medium.freecodecamp.org/js-type-coercion-explained-27ba3d9a2839) and why the value is `"11"`.

And then the guys started asking about **Closure**. I answered in a very naive way `It is a function which is return in another function...`. The guys on the phone weren't laughing but I know that I was wrong. I only read about Closure from [w3schools][0] before.

After more than four years working with JavaScript and has built many applications from small to large scale that serve ten of thousands of users, I hope that I can properly answer this question.

> Many parts of this blog post are heavily influenced by and taken from an excellent article on [MDN][3].

## What is a Closure?

Consider the following example

```javascript
//add: outer function
function add(a) {

  //addMore: inner function
  return function addMore(b) {
    return a + b;
  };
}

var addOne = add(1);
var sumOfOnePlusTwo = addOne(2); //3
```

1. Function `add` was created with an argument `a`. When invoke `add`, it will return another function `addMore` that has `b` as the local argument. Noted that how `addMore` also has access to `a`, which is the argument of the outer function `add`.

2. I created a variable `addOne` and assigned it to the return value of `add(1)`. At this point, `addOne` is actually another function that can be invoked.

3. I created another variable `sumOfOnePlusTwo` and assigned it to the return value of `addOne(2)`, which is 3. 
It means that somehow, the `addOne` function has access to `1`, and then do the add operation with `2` that I passed in.

Where is the value `1` of an argument `a` stored, even the function `add` has already been executed and its value was assigned to `addOne`?

In some programming languages, the local variables within a function exist for just the duration of that function's execution. Once `add()` finishes executing, you might expect that the `a` argument would no longer be accessible. However, because the code still works as expected, this is obviously not the case in JavaScript.

The reason is that functions in JavaScript form **closures**.

A closure is a combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives **you access to an outer function’s scope from an inner function**. <u>Even if the outer function has already been invoked.</u>

![What is JavaScript Closure?](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/javascript-closure-01.png)

Look at the above screenshot from VSCode debugger, you will see that when invoked the `addOne(2)`, the closure contains `a : 1`. While the local scope contains `b : 2`.

## Usage

### Emulating private methods with closures

I usually rely on [Revealing Module Pattern][1] to have the ability to define private property and method. One of the examples I have already published, you can read [Limit the number of simultaneous ajax requests][2]. 

I only exposed the `addRequest` to the outside world. The rest will stay inside the closure and nobody else can access it. By doing so, I have control over my code, and also don't pollute the global context by introducing global variables.

### Event handler

Much of the code written in front-end JavaScript is **event-based**. You define some behavior, and then attach it to an event that is triggered by the user (such as a click or a keypress). The code is attached as a callback (a single function that is executed in response to the event).

For instance, suppose we want to add buttons to a page to adjust the text size. One way of doing this is to specify the font-size of the body element (in pixels), and then set the size of the other elements on the page (such as headers) using the relative em unit:

```css
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
}

h1 {
  font-size: 1.5em;
}

h2 {
  font-size: 1.2em;
}
```

Such interactive text size buttons can change the font-size property of the body element, and the adjustments are picked up by other elements on the page thanks to the relative units.

Here's the JavaScript:

```javascript
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);
```

`size12`, `size14`, and `size16` are now functions that resize the body text to 12, 14, and 16 pixels, respectively. You can attach them to buttons (in this case hyperlinks) as demonstrated in the following code example.

```javascript
document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```

```html
<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
```

<iframe width="100%" height="300" src="//jsfiddle.net/vnkuZ/7726/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## References

- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures][3]
- [https://stackoverflow.com/a/111111/3375906][4]

[0]: https://www.w3schools.com/js/js_function_closures.asp
[1]: https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
[2]: https://trungk18.com/experience/limit-the-number-of-simultaneous-ajax-requests/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
[4]: https://stackoverflow.com/a/111111/3375906