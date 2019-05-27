---
title: "Casting a JSON object to a TypeScript class"
categories: experience
tags: angular typescript
---

TL;DR - To receive the JSON object from the server with all the methods available on the client side. For example the server send me a list of `User`. Inside this class defined on the server has a method name `getFullName`. I want to use this method `getFullName` on the client side side.

## Working Example

<iframe class="iframe-full-w" src="https://stackblitz.com/edit/angular-cast-json-to-typescript-class?embed=1&file=src/app/app.component.ts"></iframe>

## Problem

I started working with TypeScript about two years ago. Most of the time I read a JSON object from a remote REST server. This JSON object has all the properties of a TypeScript class. There is a question always buzz my head: **How do I cast/parse the received JSON object to a type var?**.

Overtime, I found this [class-transformer](https://github.com/typestack/class-transformer) library is super helpful. You can install this into your project and start using it from now on to see the different. They supported nested property too so you don't have to worry about that. 

 **It is worth mentioning that not all the time we need to cast from JSON object to a class, but sometimes it is really helpful. As per the example above, If I don't have the method `getFullName` in the instance of class, I would create a new util method that take a `User` as argument and return the expected result. The decision is yours. Parked all properties and methods inside a single class is more encapsulation in Object Oriented Programming while functional programing treated everything as a function.**

> The below section was quoted from their readme.

In JavaScript there are two types of objects:

* plain (literal) objects
* class (constructor) objects

Plain objects are objects that are instances of `Object` class.
Sometimes they are called **literal** objects, when created via `{}` notation.
Class objects are instances of classes with own defined constructor, properties and methods.
Usually you define them via `class` notation.

So, what is the problem?

Sometimes you want to transform plain javascript object to the ES6 **classes** you have.
For example, if you are loading a json from your backend, some API or from a JSON file,
and after you `JSON.parse` it you have a plain javascript object, not instance of class you have.

For example you have a list of users that you received from the server:

```json
[{
  "id": 1,
  "firstName": "Johny",
  "lastName": "Cage",
  "age": 27
},
{
  "id": 2,
  "firstName": "Ismoil",
  "lastName": "Somoni",
  "age": 50
},
{
  "id": 3,
  "firstName": "Luke",
  "lastName": "Dacascos",
  "age": 12
}]
```

And you have a `User` class defined on client side:

```typescript
export class User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;

    getFullName() {
        return this.firstName + " " + this.lastName;
    }

    isAdult() {
        return this.age > 36 && this.age < 60;
    }
}
```

You are assuming that you are downloading users of type `User` from `users.json` file and may want to write
following code:

```typescript
fetch("/api/users").then((users: User[]) => {
    // you can use users here, and type hinting also will be available to you,
    //  but users are not actually instances of User class
    // this means that you can't use methods of User class
});
```

In this code you can use `users[0].id`, you can also use `users[0].firstName` and `users[0].lastName`.
However you cannot use `users[0].getFullName()` or `users[0].isAdult()` because "users" actually is
array of plain javascript objects, not instances of User object.
You actually lied to compiler when you said that its `users: User[]`.

So what to do? How to make a `users` array of instances of `User` objects instead of plain javascript objects?
Solution is to create new instances of User object and manually copy all properties to new objects.
But things may go wrong very fast once you have a more complex object hierarchy.

Alternatives? Yes, you can use class-transformer. Purpose of this library is to help you to map you plain javascript
objects to the instances of classes you have.

This library also great for models exposed in your APIs,
because it provides a great tooling to control what your models are exposing in your API.
Here is example how it will look like:

```typescript
fetch("/api/users").then((users: Object[]) => {
    const realUsers = plainToClass(User, users);
    // now each user in realUsers is instance of User class 
});
```

Now you can use `users[0].getFullName()` and `users[0].isAdult()` methods.

#### This is the result as my console.log in the example does. You could clearly see the type of the object.
<br/>
![Casting a JSON object to a TypeScript class](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/cast-parse-json-object-to-typescript-class-01.png)