---
title: "Preloading @ngrx/store with Angular Router"
categories: experience
tags: angular typescript
---

TL;DR
1. 

<iframe class="iframe-full-w" src="https://stackblitz.com/edit/angular-validate-at-least-one-checkbox-was-selected?embed=1&file=src/app/app.component.ts"></iframe>

---

Imagine you have an application that display a list of product. Also, when click into each product, the application will open a product detail page to show more data. Most of the time, you want to have data ready before displaying the page to the end user. While the application is loading, you will simply show a loading indicator. Sounds simple enough.

The angular official docs will suggest us to use a Resolver or a Guard to make sure your data ready before activating the actual route. But with that approach, the data will most of the time tie to the route component itself. If you have many component in the same product detail that want to retrieve the product object. It will gradually become an headache. Either you will expose it through a share service, or use a proper state management for that purpose. And today I will show you both approaches.



