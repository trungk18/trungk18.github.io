---
title: "Why I don't like ngrx and what are the alternative options?"
categories: experience
tags: angular typescript
---

TL;DR - We started using [ngxs](https://www.ngxs.io/) on some projects. I might give [akita](https://github.com/datorama/akita) a try soon.

## Problem

I like the Redux concept. It allows developers to avoid state manipulation to be spread across the application, leading to difficult to detect inconsistencies, especially when dealing with asynchronous events such as calls to HTTP services, or handling real time update. It is not, however, an easy concept to grasp. It may look like an overthought solution that creates more troubles than it solves. Anyway, after a few years using `ngrx`, I still don't like it. And not only that, I was trying to avoid it when started a new project. Why? 

### Too much boilerplate

Let's start with the boilerplate issue. Whenever I needed to use `ngrx`, I had to:

- Create a set of `actions`.
- Create a reducer function with a big and ugly switch statement. I knew they have added new syntax when [create a new reducer](https://ngrx.io/guide/store/reducers). But there were still codes that I wrote ages ago didn't get migrated to the new concept.
- Add the reducer to the `StoreModule.forRoot` or `StoreModule.forFeature` call.
- Call select function in my component or create selectors to get the current state. I did follow the [facade pattern](https://auth0.com/blog/ngrx-facades-pros-and-cons/). But again, it is more code to write. In the beginning, I would have to import Store for every single component that I need data from `ngrx store`.
- Call the `dispatch` function to dispatch an action.

### What if I needed to fetch data from a service? Well, then I'd have to:

- Add an action that will be dispatched when data needs to be fetched.
- Add an action that will be dispatched when the call finished successfully.
- Add an action that will be dispatched when the call fails.
- Add an Effects class that will call the data service itself to fetch and do the action dispatching.
- Add the Effects class to the EffectsModule call.

It's not a big problem if it's not often needed. But fetching data from API is what front end dev do, though! Effects can become huge and not so easy to maintain.

### Too many concepts

I have to admit, a part of our problem is that not all of our front end developers are familiar with the latest technology. They didn't even know AngularJS or jQuery. And now with `Angular`, they had to learn about components, modules, DI and so on. They also had to learn about `RxJS`, `Observables`, and other concepts that aren't trivial. And then, suddenly with `ngrx`, they also had to learn about `Actions`, `Dispatchers`, `Reducers`, `Effects`, `Selectors`! Maybe I should've seen it coming, but even if they already felt comfortable with Angular, it seems that those concepts aren't easy to grasp unless you knew `Redux(-ey)`  libraries before.

### ngrx feels alien to Angular

Whenever I was using `ngrx`, I felt like maybe it could make more use of Angular. For example, instead of the big and ugly reducer, decorators should be used by default. Some libraries try to solve that problem, but they felt subpar to me, and they sometimes introduced even more complexity, like needing specific work to avoid problems with AOT compilation. If you're using `ngrx`, I recommend [ngrx-actions](https://github.com/amcdnl/ngrx-actions).

My coworker had a very difficult time "getting" `ngrx`, and he spent more time trying to understand `ngrx` along with Angular than developing the application itself.

### Alternative

That's why I have to look for a new alternative option. Two of them looked more mature and well-tested:

- [ngxs](https://netbasal.gitbook.io/akita/): More simple than ngrx, I did try it in one new project. The syntax is very simple with extensive use of decorator. They are adding more and more plugin to make our life even easier. For instance, they have [@ngxs-labs/dispatch-decorator](https://www.npmjs.com/package/@ngxs-labs/dispatch-decorator) so that we don't have to inject the Store class to dispatch actions. The `@Dispatch` decorator does it for you underneath.

- [akita](https://github.com/datorama/akita): Even simpler than `ngxs`. Instead of actions and dispatchers, just a plain service, even for async calls. I like their Router Store, it looks much simpler than what [ngrx router](https://ngrx.io/guide/router-store/configuration) has offered, which I gave up last year when trying to integrate it into my application. I haven't applied it in any of my applications but probably will start to do it soon. Because a new front end developer will join our team next week.