---
title: "Convert C# class to TypeScript interface"
categories: experience
tags: angular typescript
---

In the past few years, I always need to copy the C# class on the server side code to a `.ts` file. And then use VSCode to manually update the syntax to become an actual TS class/interface based on my need. Within Zyllem platform, the back end guys use inheritance and polymorphism extensively. Which mean when I do the TS class/interface, it would take a lot of times. Let take for example I have an abstract class for a custom property, and then many concrete class for a specific type of custom property.

apCustomPropertyBase.ts
```typescript
export abstract class APCustomPropertyBase {
    public id: string
    public staticId: string
    public code: string
    public title: string
    public description: string
    public type: CustomPropertiesTypes
    public level: CustomPropertyCategory    
    public name: string;
}

export enum CustomPropertiesTypes {
    TEXT = "TEXT",
    NUMERIC = "NUMERIC",
    OPTIONS = "OPTIONS",
    MONEY = "MONEY",
    ID = "ID"
}
```

apCustomPropertyMoney.ts
```typescript
export class APCustomPropertyMoney extends APCustomPropertyBase {
    public currencySymbol: string;
}
```

apCustomPropertyOption.ts
```typescript
export class APCustomPropertyOption extends APCustomPropertyBase {
    public possibleOptions: APCustomPropertySubOption[]
}

export class APCustomPropertySubOption {
    public key: string
    public emptyKey: boolean
    public value: string
    public exportValue: string
}
```

Recently I found an extension on VSCode to convert the C# class to TS interface (only interface for now).

![Convert C# class to TypeScript interface](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/convert-csharp-class-to-typescript-class-01.gif)

See how I can convert it from C# code in just a click. Of course not all the class will be converted such as the the factory, but it is good enough for client side. We just need the shape of data. Sometimes If I need to use the visitor pattern, I will decorate with additional methods that I need.

