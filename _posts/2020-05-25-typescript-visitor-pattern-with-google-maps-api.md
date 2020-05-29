---
title: "Angular - Using Visitor design pattern with Typescript"
categories: experience
tags: angular typescript 
---

TL;DR - If you have multiple concrete classes that inherit from the same base class, or implement the same interface. You should consider using visitor pattern. It will save you from dozens of if-else block or switch/case and typecasting.

## What is visitor pattern

> Visitor is a behavioral design pattern that allows adding new behaviors to existing class hierarchy without altering any existing code.

There weren't a lot of examples on Visitor pattern because of its popularity compared to the well-known Factory or Command pattern. And with the available example that I could find, it is [very abstraction][0], you wouldn't be able to imagine how to use it in your real-world use case.

In Zyllem, we are using it extensively on the server-side code. On the client-side, I took me sometimes to have my first visitor running on production. The example below was not that first one though :))

## Use case

In my application, I have a map view that displaying <u>a route</u> which contains:

1. A few places on sequence, such as 1 -> 2 > 3 -> 4. Let call it a Point.
2. A current driver's location. Let call it a real-time/live location.
3. A location where the route is started (noted that it isn't the first point that I mention above). Let call it a Start location.

So easily you could see there are three types of markers that I need to display on the maps. Each of them will have the behaviors:

1. Different icon on the maps.
2. Show a different message when hovering over.
3. Upon click/ mouseover/ mouse out events, do something.

See the gif below from my actual application.

![Using Visitor design pattern with Typescript](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/angular-typescript-visitor-pattern-with-google-maps-api-01.gif)

I will walk through how I built it with visitor design pattern. Noted that it is the much simpler version than the actual one. I have removed all the complicated icons with custom HTML real-time communication for the live location and so on. You can view the running example at the end of this post on [stackblitz][2]. Or view the completed [source code at github][1].

## Solution

I am using [Google Maps][3] (GM) to display all of these data on a map view. For GM, to display a marker/pin on maps, we could use [`google.maps.Marker`][4]. To display a route, It has [`google.maps.Polyline`][5].

GM will consider all the marker as `google.maps.Marker`. But from my point of view I will have one base class the representing a pin on GM. And three concrete classes that corresponded to three types of markers I listed above. Think about a base class name `CustomMarker`. And three concrete classes are:

- `CustomPointMarker`
- `CustomRealTimeMarker`
- `CustomStartMarker`

### API Data Model

A mentioned above, I have a `RouteModel` which include a list of `PointModel`, a current live location `RealTimeLocationModel` and a start location `StartLocationModel`

```javascript
export class RouteModel {
  id: string;
  points: PointModel[];
  startLocation: StartLocationModel;
  realTimeLocation: RealtimeLocationModel;
  
  //And many more properties
  pathFromStartLocation: any;
}

export class PointModel {
  public id: string;
  public sequence: number;
  public location: LocationApi;
  //See full list of properties on stackblitz
}

export class RealtimeLocationModel {
  public geoCoordinate: GeoCoordinateApi;
  public capturedTimeStamp: string;
  //See full list of properties on stackblitz
}

export class StartLocationModel {
  public location: LocationApi;
  //See full list of properties on stackblitz
}
```

### Marker Data Model

I use generic to pass the type `T` into a property named `data` to hold an actual object that I have received from the API. The rest are all the necessary info that GM required to display a marker such as the `google.maps.LatLng`. We need the `type` property to know which marker is this.

**And most importantly for the visitor pattern to work, you have to define an abstract method that takes the base `CustomMarkerVisitor` interface as an argument.**

```typescript
export abstract class CustomMarker<T> {
  abstract id: string;
  abstract type: CustomMarkerType;
  abstract position: google.maps.LatLng;
  abstract popupContent: string;
  abstract data: T;

  /**
  * The CustomMarker declares an `accept` method that should take the base
  * visitor interface as an argument.
  */
  abstract accept(visitor: CustomMarkerVisitor): void;
}

export enum CustomMarkerType {
  POINT = "POINT",
  START_LOCATION = "START_LOCATION",
  REAL_TIME_LOCATION = "REAL_TIME_LOCATION"
}
```

For each concrete class, you will have to implement the `accept` method, because it is defined as an abstract method.

```javascript
export class PointMarker extends CustomMarker<PointModel> {
  //...See full list of properties on stackblitz
  constructor(point: PointModel) {
    super(point);
  }

  accept(visitor: CustomMarkerVisitor) {
    visitor.visitPointMarker(this);
  }
}

export class StartLocationMarker extends CustomMarker<StartLocationModel> {
  //...See full list of properties on stackblitz

  constructor(startLocation: StartLocationModel) {
    super(startLocation);
  }
  accept(visitor: CustomMarkerVisitor) {
    visitor.visitStartLocation(this);
  }
}

export class RealTimeLocationMarker extends CustomMarker<RealtimeLocationModel> {
  //...See full list of properties on stackblitz

  constructor(realTimeLocation: RealtimeLocationModel) {
    super(realTimeLocation);
  }

  accept(visitor: CustomMarkerVisitor): void {
    visitor.visitRealTimeLocation(this);
  }

  /**
   * Concrete class may have special methods that don't exist in their
   * base class or interface. The Visitor is still able to use these methods
   * since it's aware of the component's concrete class.
   */
  concreteMethodOfRealTimeLocation(){
    return "Real time";
  }
}

```

### Visitor interface

The `CustomMarkerVisitor` interface declares a set of visiting methods that correspond to the `CustomMarker` classes. The signature of a visiting method allows the visitor to identify the exact class of the component that it's dealing with.

```javascript
export interface CustomMarkerVisitor {
  visitPointMarker(markerData: PointMarker);
  visitStartLocation(markerData: StartLocationMarker);
  visitRealTimeLocation(markerData: RealTimeLocationMarker);
}
```

A concrete CustomMarkerVisitor implement several versions of the same algorithm, which can work with all concrete `CustomMarker` classes. Think about it as a behavior that each concrete `CustomMarker` need to have such as click, double click, mouse over, mouse out. For each behavior, we will have a corresponding visitor to handle.

For example, I have a specific visitor `MarkerMouseClickVisitor` to handle the marker click event.

```javascript
export class MarkerMouseClickVisitor implements CustomMarkerVisitor {
  constructor(private _api: MapApiService) {}

  visitPointMarker(marker: PointMarker) {
    this.logMessage(marker);
  }

  visitStartLocation(marker: StartLocationMarker) {
    this.logMessage(marker);
  }

  visitRealTimeLocation(marker: RealTimeLocationMarker) {
    //You could call this method too
    //marker.concreteMethodOfRealTimeLocation();
    this.logMessage(marker);
  }

  logMessage(marker: CustomMarker<any>){
    this._api.sendMessage(`${marker.title} clicked`)
  }
}
```

### Comparison Code

I used to do it differently with all the switch/case block. See the example code below for the same UI behavior with switch/case approach and visitor pattern with a mouseover behavior. I personally like the visitor better. Because I used to have the switch/case for every single behavior and I don't know, I just don't like too many switch/case blocks. Noted that the below implementation was a much simpler version on my real-world application where it involves router and other services as well. Separated it into a visitor helped me to better understand and isolate my code if there is any bug.

#### Switch/Case

```javascript
addMarkerToMap(markerData: CustomMarker<any>) {
  let marker = new google.maps.Marker({
    map: this.map,
    position: markerData.position,
    icon: markerData.icon,
    title: markerData.title,
  });

  google.maps.event.addListener(marker, "mouseover", () => {
    this.openInfoWindow(marker, markerData.popupContent);
    switch (markerData.type) {
      case CustomMarkerType.POINT:
        this._api.sendMessage(`${markerData.title} mouse over`);
        break;

      case CustomMarkerType.START_LOCATION:
        this._api.sendMessage(`${markerData.title} mouse over`);
        break;

      case CustomMarkerType.REAL_TIME_LOCATION:
        this._api.sendMessage(`${markerData.title} mouse over`);
        break;

      default:
        break;
    }
  });
}
```

#### Visitor

```javascript
addMarkerToMap(markerData: CustomMarker<any>) {
  let marker = new google.maps.Marker({
    map: this.map,
    position: markerData.position,
    icon: markerData.icon,
    title: markerData.title
  });

  google.maps.event.addListener(marker, "mouseover", () => {
    this.openInfoWindow(marker, markerData.popupContent);
    markerData.accept(new MarkerMouseOverVisitor(this._api));
  });
  this.markers.push(marker);
}

export class MarkerMouseOverVisitor implements CustomMarkerVisitor {
  constructor(private _api: MapApiService) {}

  visitPointMarker(marker: PointMarker) {
    this.logMessage(marker);
  }

  visitStartLocation(marker: StartLocationMarker) {
    this.logMessage(marker);
  }

  visitRealTimeLocation(marker: RealTimeLocationMarker) {
    this.logMessage(marker);
  }

  logMessage(marker: CustomMarker<any>) {
    this._api.sendMessage(`${marker.title} mouse over`);
  }
}
```

You see how we still can access to `markerData` variable on the callback of the mouseover despite the `addMarkerToMap` has been finished executing. If you have been working with JavaScript long enough, you will know what I am trying to say.

It is <u>JavaScript Closure</u>.

## Pros and cons

The benefits of visitor pattern, I think:

1. Reduce the number of doing switch/case for each behavior, see my code comparison table below. You will understand.
2. If I introduce a new type of `CustomMarker`, what I need to do is to update the `CustomMarkerVisitor` with a new method. The compiler won't build until I come to every implementation of `CustomMarkerVisitor` to implement it properly with the new method. So that I will not afraid of missing behavior.

But also, the visitor pattern has some downside as I realize:

1. Not so easy for a junior developer to pick it up.
2. Too many boilerplate, even if you don't want your concrete class to have a specific behavior. You are forced to implement it.

But on this use case of the map, I like how visitor pattern has transformed my code.

## Working Example

<iframe class="iframe-full-w" src="https://stackblitz.com/edit/angular-typescript-visitor-pattern-with-google-maps-api?embed=1&file=src/app/model/visitor/marker-mouse-click-visitor.ts"></iframe>

![Using Visitor design pattern with Typescript](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/angular-typescript-visitor-pattern-with-google-maps-api-02.gif)

## Source code

[https://github.com/trungk18/angular-typescript-visitor-design-pattern-with-google-maps-api][1]

I hope it will help you guys get the idea of visitor pattern :) I know I am not a good writer yet, appreciate all your comments and contributions.

[0]: https://refactoring.guru/design-patterns/visitor/typescript/example
[1]: https://github.com/trungk18/angular-typescript-visitor-design-pattern-with-google-maps-api
[2]: https://stackblitz.com/edit/angular-typescript-visitor-pattern-with-google-maps-api
[3]: https://developers.google.com/maps/documentation/javascript/tutorial
[4]: https://developers.google.com/maps/documentation/javascript/reference/marker#Marker
[5]: https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline