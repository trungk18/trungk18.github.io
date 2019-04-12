---
title: "Freeze screen in Chrome debugger / DevTools panel for inspect element that will be disappear on hover/click"
categories: experience
---

Today I need to use the chrome debugger to analyze the CSS of a time picker component, and I found it is not so straightforward...

Basically the UI will be triggering on click, and if there is any click event outside of the component itself, it will be disappeared. Or in the other word, be removed completely from the DOM. The same problem happened if you want to see the style of bootstrap popover, or any component where some UI will be displayed on hover/click, and hidden on hover/click outside.

![StackOverFlow](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/freeze-screen-debugger-chrome-1.gif)

After cross this question, I tested these two solutions that looks promising. Sounds easy but why I didn't think of it in the first place ?!

## Solution 1. Trigger the F8 button while the element is displaying.

1. Browse to the desired page, open the dev console.
2. Select the `Sources` tab in `Chrome debugger`.
3. In the browser window, hover/click over the desired element to initiate the UI to be displayed.
4. And press `F8`. This step is very important. *If you have clicked anywhere on the actual page F8 will do nothing. Your last click needs to be somewhere in the inspector, like the sources tab*
5. Go to the Elements tab in inspector
6. Find your element and have fun modifying the CSS

![Solution 1](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/freeze-screen-debugger-chrome-solution-1.gif)


## Solution 2. Run the setTimeout to trigger debugger.

1. Run the following javascript in the console. This will break into the debugger in 5 seconds.

```javascript
setTimeout(function(){debugger;}, 5000)
```

2. Go show your element (by hovering or however) and wait until Chrome breaks into the Debugger.
3. Go to the Elements tab in inspector
4. Find your element and have fun modifying the CSS

![Solution 2](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/freeze-screen-debugger-chrome-solution-2.gif)
