---
title: "Understand and prevent the most common memory leaks in Angular application - Subscription unsubscribe"
categories: experience
tags: angular typescript
---

TL;DR - Remember to **clean up your Rx subscriptions**. In my experience, this is by far the **most common cause of memory leaks** in Angular applications.

## Working Example

<iframe class="iframe-full-w" src="https://stackblitz.com/edit/angular-common-memory-leaks?embed=1&file=src/app/leaked-fix/child.leaked-fix.component.ts"></iframe>

## Problem

A memory leak is one of the worst types of issues you can have. It’s hard to find, hard to debug, and often hard to solve. As a developer, it’s essential to know how memory leaks are created and how to deal with them. It could be criteria to differentiate between a good and an-average-developer. At a certain time, you started wondering how the memory is managed in the browser. This knowledge is especially important once your application reaches a certain size.

Memory leaks occur in every programming language or framework, including Angular.

## Javascript Memory Management

> Low-level languages like C, have manual memory management primitives such as malloc() and free(). In contrast, JavaScript automatically allocates memory when objects are created and frees it when they are not used anymore (garbage collection). This automaticity is a potential source of confusion: it can give developers the false impression that they don't need to worry about memory management.

Regardless of the programming language, the memory life cycle is **pretty much always the same**:

1. Allocate the memory you need
2. Use the allocated memory (read, write)
3. Release the allocated memory when it is not needed anymore

The second part is explicit in all languages. The first and last parts are explicit in low-level languages but are mostly implicit in high-level languages like JavaScript. The majority of memory management issues occur at the third phase - to release the allocated memory. The most difficult aspect of this stage is determining when the allocated memory is no longer needed.

For more detail on how JS memory allocation works, see [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management).

## Memory leaks in Angular

**Memory leaks most often arise over time when components are re-rendered multiple times**, e.g through routing or by using the `*ngIf` directive, or you are listening to a WebSocket connection in the background and update the UI subsequently. For example, when a user works a whole day on our application without refreshing the browser and it is becoming increasingly slower.

When the application started to get slower, we tended to reload the browser. By doing so, the browser release all the memory accumulated from the beginning, and our application started fresh again. But what if there are memory leaks happened and you didn't even notice, so the QA team.

To mimic a scenario, I created a setup with two components, `ParentMemoryLeakedComponent` and `ChildMemoryLeakedComponent`.

```javascript
export class ChildMemoryLeakedComponent implements OnInit, OnDestroy {
  componentId: number;
  public counter: number;
  public counterSubscription: Subscription;

  ngOnInit() {
    this.componentId = new Date().getTime();
    this.counterSubscription = timer(0, 1000)
      .pipe(tap(counter =>{
        console.log(`Counter ${this.componentId} ${counter}`);
      }))
      .subscribe(counter => {
        this.counter = counter;
      });
  }

  ngOnDestroy() {
    console.log(`Counter ${this.componentId} stopped at ${this.counter}`);
  }
}
```

The child component has a timer to run **every 1 second** and do `console.log`. You will see the counter on the template as well. I also set the uniqueId for the component based on the current date by using `new Date().getTime()`.

```javascript
@Component({
  selector: "parent-leaked",
  template: `
    <h2 class="mb-5">Memory Leaked - example</h2>
    <button class="btn btn-primary mr-1" (click)="relive()">
      Relive
    </button>
    <button class="btn btn-danger" (click)="destroy()">
      Destroy
    </button>
    <child-leaked *ngIf="isAlive"></child-leaked>
  `
})
export class ParentMemoryLeakedComponent {
  isAlive = false;

  destroy() {
    this.isAlive = false;
  }

  public relive() {
    this.isAlive = true;
  }
}
```

The parent has two buttons to toggle a flag. The child component will be displayed based on that flag.

See my demonstration below, you will understand how easily we can create a memory leak in Angular by not unsubscribe from the subscription.

![Understand and prevent the most common memory leaks in Angular application](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/angular-common-memory-leak-use-case-observable-01.gif)

**The flow:**

1. I click on `Relive` button, the child component is rendered
2. After a couple of seconds, I click `Destroy`. The child component is disappeared from the UI, but the `console.log` keeps running. I can see two different component ids on the console
3. I clicked `Relive` and `Destroy` back end forth multiple times, the `console.log` keeps repeating multiple times. Think about it this way. If you click 100 times, you will see 100 `console.log` every second
4. If you keep the browser open, your application keeps eating the computer memory up to a point the application became unsurprisingly slow
5. You have to refresh the browser to free up the memory

**Stress test:**

I opened the [Chrome Performance monitor](https://developers.google.com/web/updates/2017/11/devtools-release-notes#perf-monitor) and started to click `Relive` and `Destroy` continuously. Noticed that the CPU usage and heap size is increasing so quickly. When the CPU is above 60%, my browser is unresponsive, I couldn't even scroll up to the page or select any text on the screen.

![Understand and prevent the most common memory leaks in Angular application](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/angular-common-memory-leak-use-case-observable-02.gif)

## Solution

**The easiest way to fix the problem above is to clean the subscription when you destroy the component, or when you don't need it anymore.**

```javascript
ngOnDestroy() {
    this.counterSubscription.unsubscribe();
    console.log(`Counter ${this.componentId} stopped at ${this.counter}`);
}
```

A single line of code `this.counterSubscription.unsubscribe()` could save you from a lot of problems in the future...

See the below screenshot when I unsubscribe properly from the subscription. There are no memory leaked occurred.

![Understand and prevent the most common memory leaks in Angular application](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/angular-common-memory-leak-use-case-observable-03.gif)

There are multiple ways to clean up Rx subscription. You could do as my example by assigning the subscription to a variable and then call `unsubscribe()` when you don't need it. But if your component has many subscriptions as below code, your code will be ugly very soon.

```javascript
export class LuckyComponent implements OnInit, OnDestroy {
 private mySubscription1: Subscription;
 private mySubscription2: Subscription;
 private mySubscription3: Subscription;
 private mySubscription4: Subscription;
 private mySubscription5: Subscription;
 private mySubscription6: Subscription;

 public ngOnInit(): void {
   /*
      subscribing to multiple observables comes here
  */
 }

 public ngOnDestroy(): void {
   this.mySubscription1.unsubscribe();
   this.mySubscription2.unsubscribe();
   this.mySubscription3.unsubscribe();
   this.mySubscription4.unsubscribe();
   this.mySubscription5.unsubscribe();
   this.mySubscription6.unsubscribe();
 }
```

I recommend to use:

1. [until-destroy](https://github.com/ngneat/until-destroy). A neat way to unsubscribe from observables when the component destroyed.
2. [takeUntil() Angular component's ngOnDestroy()](https://stackoverflow.com/q/42490265/3375906)

I personally use `until-destroy` in my project at Zyllem.

## Real-world use case

Usually, we don't write an application just to do `console.log` as my above example. I hope that simplicity can help you to understand the problem easier. Some of the real-world use cases that I have seen during development could be:

### 1. You subscribe to route events on the component but forgot to unsubscribe

It is very similar to my example, but instead of the timer run every second. You do as below

```javascript
export class ChildDetailComponent implements OnInit, OnDestroy {
  constructor(private _route: ActivatedRoute){
    this._route.params.subscribe(this.onParamsChange.bind(this));
  }

  onParamsChange(params){
      let carId = params["carId"];
      //call API to get car detail by carId
  }
}
```

I saw my team always got that problem when we build master-detail UI where we have:

1. A list of something. For instance, a list of cars
2. Select one, display a car detail view on a different component
3. When I open the detail view, I need the `carId` to get the detail data from the API

If I open different cars with different Id, It creates a memory leak every time I instantiate the component. `onParamsChange` will be executed x times where x is the number of times `ChildDetailComponent` get initialized.

To fix it, simply unsubscribe from the route event on component destroy.

```javascript
export class ChildDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(private _route: ActivatedRoute){
    this.subscription = this._route.params.subscribe(this.onParamsChange.bind(this));
  }

  onParamsChange(params){
      let carId = params["carId"];
      //call API to get car detail by carId
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
```

### 2. Websocket Connections

Very similarly, WebSocket connections must always be closed when unused. I have prepared a simple Websocket component to display crypto prices. You can see the detail inside [stackblitz](https://stackblitz.com/edit/angular-common-memory-leaks?file=src%2Fapp%2Fwebsocket%2Fcoin-price.component.ts).

```javascript
const Endpoint = "wss://ws.coincap.io/prices/";

@Component({
  selector: "coin-price",
  template: `
    {{ id | titlecase }}: {{ (price$ | async) || "loading..." }}
  `
})
export class CoinPriceComponent {
  @Input() id: string;

  public price$ = new Subject();

  private webSocket: WebSocket;

  ngOnInit() {
    const id = this.id;
    this.webSocket = new WebSocket(this.getEndpoint(id));

    this.webSocket.onmessage = (msg: MessageEvent) => {
      const data = JSON.parse(msg.data);
      let price = data[id];
      console.log(`${id}: ${price}`)
      this.price$.next(price);
    };
  }

  ngOnDestroy() {
    //Remove this line to see memory leak happen.
    this.webSocket.close();
  }

  private getEndpoint(id: string) {
    return `${Endpoint}?assets=${id}`;
  }
}
```

If I remove this line `this.webSocket.close()`, you will see the memory leak.

![Understand and prevent the most common memory leaks in Angular application](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/angular-common-memory-leak-use-case-observable-04.gif)

### 3. Event Listeners

Another common cause of memory leaks is DOM events that are never unregistered. Some folks may think that using Angular Renderer may take care of it, but that is only the cause if the events are defined in the template, just as with the async pipe.

Let’s see a quick and common example of a component that registers a scroll listener on the body, without un-register the event:

```javascript
@Component({...})
export class ScrollComponent {
  constructor(private renderer: Renderer2) {}
  ngOnInit() {
    this.renderer.listen(document.body, 'scroll', () => {
      this.updatePosition();
    });
  }
  updatePosition() { /* implementation */ }
}
```

This does, indeed, create a memory leak every time we instantiate `ScrollComponent` — so let’s fix it:

```javascript
@Component({...})
export class ScrollComponent {
  private listeners = [];
  constructor(private renderer: Renderer2) {}
  ngOnInit() {
    const listener = this.renderer.listen(
      document.body,
      'scroll',
      () => {
        this.updatePosition();
      });
    this.listeners.push(listener);
  }
  ngOnDestroy() {
    this.listeners.forEach(listener => listener());
  }
  updatePosition() { /* implementation */ }
}
```

## Conclusion

1. Memory Leaks are quite hard to find and debug
2. Angular does a great job at managing memory; with that said, we need to watch out for open subscriptions (Observables, Subjects, NgRx Store Selections), DOM events, WebSocket connections, etc. **Remember to unsubscribe from Rx subscription**

### Resource

- [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
- [Angular Renderer2 remove listener](https://stackoverflow.com/q/44454203/3375906)
- [Debugging Memory Leaks in Angular](https://blog.bitsrc.io/debugging-memory-leaks-in-angular-4bc7b3eab569)