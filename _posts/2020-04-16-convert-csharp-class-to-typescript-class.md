---
title: "Convert C# class to TypeScript interface"
categories: experience
tags: angular typescript
---
TL;DR - Use extension [C# to TypeScript](https://marketplace.visualstudio.com/items?itemName=adrianwilczynski.csharp-to-typescript) on VSCode to convert C# class to TS interface.

## Problem

In the past few years, I always need to copy the C# class on the server-side code to a `.ts` file. And then use VSCode to manually update the syntax to become an actual TS class/interface based on my need. Within Zyllem platform, the back end guys use inheritance and polymorphism extensively. In each concrete type, it might include another property in an abstract type that also has many concrete classes following this type. Therefore when I write the TS class/interface, it is time-consuming. For example, I have an abstract class for a custom property, and then some concrete classes for a specific type of custom property. 

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

## Solution

Recently I found an extension - [C# to TypeScript](https://marketplace.visualstudio.com/items?itemName=adrianwilczynski.csharp-to-typescript) on VSCode that make the process of converting the C# class to TS interface easier (only interface for now).

![Convert C# class to TypeScript interface](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/convert-csharp-class-to-typescript-class-01.gif)

See how I can convert it from C# code in just a click. Of course, not all the classes will be converted such as the factory, but it is good enough for the client-side. We just need the shape of data. Sometimes If I need to use the visitor pattern, I will decorate with additional methods that I need.

It is still in the early phase so that currently only supports converting to an interface, also only includes public, non-static properties & fields - not methods, not private members. But still, it did save me sometimes. It also comes with some configuration as below.

- `"csharpToTypeScript.export"`: true controls exporting.
- `"csharpToTypeScript.convertDatesTo"`: "string" sets output type for dates. You can pick between string, Date and string | Date.
- `"csharpToTypeScript.convertNullablesTo"`: "null" sets output type for nullables (int?) to either null or undefined.
- `"csharpToTypeScript.toCamelCase"`: true toggles field name conversion to camel case.
- `"csharpToTypeScript.removeInterfacePrefix"`: true controls whether to remove interface prefixes (IType -> Type).
- `"csharpToTypeScript.generateImports"`: false toggles simple import statements generation.
- `"csharpToTypeScript.quotationMark"`: "double" sets quotation marks for import statements & identifiers (double or single).
- `"csharpToTypeScript.useKebabCase"`: false - use kebab case for file names.
- `"csharpToTypeScript.appendModelSuffix"`: false - append ".model" suffix to file names.

