---
title: "Using Visitor design pattern with Typescript"
categories: experience
tags: angular typescript 
---

TL;DR - There are pros and cons when using visitor pattern with TypeScript. If you have multiple concrete classes that inherit from a base class, or implement the same interface. You should consider using visitor pattern

## Use case

In my application, I have a map view that displaying:

1. A driving route of 4 places from A -> B > C -> D. Let call it a Point.
2. A marker that display where is the current location of the driver. Let call it a Real-time location.
3. Each route will start from a start location where the route started. Let call it a Start location

So easily you could see there are 3 types of marker that I need to display on the maps. Each of them will have these behavior:

1. Display with different icon on the maps.
2. Show different message when hovering over.
3. Upon click/ mouse over/ mouse out events, do something.

See the gif below from application.

![Using Visitor design pattern with Typescript](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/typescript-visitor-pattern-with-google-maps-api-01.gif)


## Solution

I am using Google Maps (GM) to display all of these data on a map view. For GM, to display a marker/pin on maps, we could use `google.maps.Marker`. To display a route, It has `google.maps.Polyline`.

But from my point of view, obviously I will have one base class the representing a pin on GM. And three concrete class that behave differently. Think about a base class name `CustomMarker`. And three concrete classes are `CustomPointMarker`, `CustomRealTimeMarker`, `CustomStartMarker`

### Class Structure

```typescript
export abstract class CustomMarker<T> {
  abstract id: string;
  abstract type: CustomMarkerType;
  abstract position: google.maps.LatLng;
  abstract popupContent: string;
  abstract data: T;
}

export enum CustomMarkerType {
  POINT = "POINT",
  START_LOCATION = "START_LOCATION",
  REAL_TIME_LOCATION = "REAL_TIME_LOCATION"
}
```

I use generic to pass the type T into a data property to hold actual object that I have received from API. The rest is just all the necessary info that I need to display a marker on the map. And of course, we need the `type` property to know which marker is this.


