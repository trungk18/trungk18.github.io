---
title: "Angular tips: Avoid import RxJS in vendor.ts"
categories: experience
tags: webpack typescript
---

About 1.5 years ago, Angular was officially released the so-called Angular 2 after years in beta version. I was excited about this and even came and ask my boss to start building the new module in Angular, instead of current AngularJS. At the very beginning, Angular's document was also very limited in both quantity and quality. We were even ended up with SystemJS in the production site. It was even worse than AngularJS performance because SystemJS need to load the whole bunch of Angular code in the browser before our app start rendering. But finally, they published a guide to pack Angular with Webpack.

[https://angular.io/guide/webpack](https://angular.io/guide/webpack)

At the end, you just need one bundle output "app.js" to make your app work. The idea is to split our application in three parts: app, vendor and polyfills (this latter one is a requirement with ng2).

- polyfills: the polyfills needed to run Angular applications in most modern browsers.
- vendor: the third-party dependencies such as Angular, lodash, and bootstrap.css.
- app: the application code.

Focusing on `app` and `vendor`, the idea is to have one bundle with only the application code and one bundle with only with vendor code.

To make this separation to work, we need in `vendor.ts` to load our vendors too, so when webpack sees that we did an `import 'foo'` in `app.ts` (or any .ts in our application) and in `vendor.ts`, will see that they are in common so they will get removed from the application code.

So, if you for example comment out the line where you import the router in `vendor.ts` and you import the router only in application code, it will work but the entire router code will end in the final `app.ts` bundle instead of the vendor bundle.

In short, when an import appears both in `vendor.ts` and application code, that 3rd party library will be removed from the application code and put in a vendor bundle alone.

**This is only the first step to achieve better things like proper caching so if you update only the app code and not the vendor, you won't force the client to download the vendors again.**

---
So I followed the mentioned guide, and put this block of code inside `vendor.ts`

```javascript
// Angular
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';

// RxJS
import 'rxjs';
```

And you can see how big the `vendor.ts` is, even with minification, almost 1mb. And the rxjs is taken up **~250kb**, which is equivalent to **26%** of my vendor bundle.

![angular tips avoid import rxjs](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/import-rxjs-01.png)

![angular tips avoid import rxjs](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/import-rxjs-02.png)

With `import 'rxjs'`, you do not need to import each operator manually. However, **I highly recommend NOT to use this code since it imports the entire RxJS library, and we do not need all RxJS functionalities and operators in our projects.** You can see the big different below.

Then I replace the `import 'rxjs'` with the block of code below to import only the neccessary that I need.

```javascript
// RxJS
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/observable/empty'
import "rxjs/add/observable/forkJoin";

// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

```
Now we can the size was reduced significantly. The size of RxJS now will be just **60kb**, which is less **10%** of my vendor bundle.

![angular tips avoid import rxjs](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/import-rxjs-03.png)

![angular tips avoid import rxjs](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/import-rxjs-04.png)

I hope that the Angular team will update the document soon, at least to notice developer not to import the whole RxJS library. Because they might not be using it at all.