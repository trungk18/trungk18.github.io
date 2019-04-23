---
title: "CSS Layout - Horizontal & Vertical Align"
categories: experience
---

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="html,result" data-user="trungk18" data-slug-hash="pbNLpM" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="centering-in-css-horizontal-vertical">
  <span>See the Pen <a href="https://codepen.io/trungk18/pen/pbNLpM/">
  centering-in-css-horizontal-vertical</a> by Trung Vo (<a href="https://codepen.io/trungk18">@trungk18</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async="async" src="https://static.codepen.io/assets/embed/ei.js"></script>

<br/>
<br/>

In CSS, several properties can be used to align elements horizontally and vertically. I hope these below tips will help you understand and able to align the element center horizontal and vertical.
Before going deeply, you can refer to these below source with good explanation and example.

- http://www.w3schools.com/css/css_align.asp
- https://www.w3.org/Style/Examples/007/center.en.html
- https://css-tricks.com/centering-css-complete-guide/
- And this repository :)
 
## Center Horizontal

### 1. Inline element (like text or button..)

To simply center text inside a block element is using: __text-align: center__

HTML
```html
<div class="border-wrapper horizontal-inline-element-center">
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    <button>Submit</button>
</div>
```

CSS
```css
.horizontal-inline-element-center {
    text-align: center;
}
```

### 2. Block element (div)

To horizontally center a block element (like div), use __margin: auto;__

HTML
```html
<div class="border-wrapper horizontal-block-element-center">
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
</div>
```

CSS
```css
.horizontal-block-element-center {
    max-width: 40em;
    margin: 0 auto;
}
```

## Center Vertical

### 3. Vertical Anything

This is a bit more tricky, but with __position: absolute__ and __transform: translate(0, -50%)__, we will be able to align center vertically, even if we don't know its height.
Translate negative 50% means move an element from its current position to middle of element's height based on Y-axis

HTML
```html
<div class="wrap-col">
    <div class="text-wrap">
        <h1>
            <a href="#">Pizza</a>
        </h1>
        <p>
            <a href="#">Pizza is a flatbread generally topped with tomato sauce and cheese and baked in an oven</a>
        </p>
    </div>
    <div class="wrap-background backstretch" style="background-image: url(pizza.jpg)"></div>
</div>
```

CSS
```css
.wrap-col {
    float: left;
    width: 33.333333%;
    position: relative;
}

    .wrap-col::before {
        position: absolute;
        content: '';
        height: 100%;
        width: 100%;
        z-index: 1;
        background: rgba(128, 128, 128, 0.4);
    }

.wrap-background {
    min-height: 250px;
}

.text-wrap {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 100%;
    z-index: 1;
    text-align: center;
}

    .text-wrap a {
        color: #fff;
    }
```
