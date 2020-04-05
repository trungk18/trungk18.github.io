---
title: "Angular [(ngModel)] and debounce "
categories: experience
tags: angular typescript
---

In AngularJS I can debounce a model by using ng-model options.

```javascript
ng-model-options="{ debounce: 1000 }"
```

If you don't know what is debounce. Take a look at the simple definition below. 

> Debouncing enforces that a function not be called again until a certain amount of time has passed without it being called. As in "execute this > function only if 300ms milliseconds have passed without it being called." 
> [Source](https://css-tricks.com/the-difference-between-throttling-and-debouncing/) 

In the use case of search, we don't want to hit the server endpoint every time user presses a key, it should flood them with a storm of HTTP requests. Basically, we only want to hit it once the user has stopped typing after sometimes (for instance 300ms) instead of with every keystroke.

In Angular, there are many different to archive it, but there is no built-in option as in AngularJS. I often leverage the capability of [`RxJS Subject`](http://reactivex.io/documentation/subject.html) in order to archive that. Noted this method will trigger the **change detection**. It is not efficient. Every keystroke, even though they are debounced, results in change detection running. Debouncing should not affect how often change detection runs. You can implement the DoCheck and see how many times ngDoCheck() is being called when you type into the input box.

For a way that doesn't trigger change detection, check out [this answer](https://stackoverflow.com/a/36849347/3375906)

```html
<input [(ngModel)]="model" (ngModelChange)="changed($event)" placeholder="Search..." />
```

```javascript
export class AppComponent {
  model: string;
  modelChanged = new Subject<string>();
  searchResult$: Observable<SearchResult[]>;

  constructor(private api: AppService) {
    this.modelChanged
      .pipe(
        debounceTime(300))
      .subscribe(() => {
        this.searchResult$ = this.api.search(this.model);
      })
  }

  changed() {
    this.modelChanged.next();
  }
}
```

## Working Example

<iframe class="iframe-full-w" src="https://stackblitz.com/edit/angular-ngmodel-debounce?embed=1&file=src/app/app.component.html&view=preview"></iframe>
