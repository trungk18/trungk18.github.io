---
title: "Restrict null and undefined via Non-Nullable-Types in TypeScript"
categories: experience
tags: typescript
---

By default, null and undefined are assignable to all types in TypeScript.

```javascript
function trimText(str: string) {
  console.log(str.trim());
}

let inputStr = "Hello I am Trung"; 

trimText(inputStr);

inputStr = null;
trimText(inputStr);
```

## null and undefined are the root of all evil. It often leads to runtime errors. It is easy to write code that will throw Error at runtime.

I have a variable name `inputStr` of type `string`. 

The later code will call `trimText` on a null variable, the complier doesn't complain but we know **it will break at runtime**. Because there is no function `trim` on `null` type.

To prevent it, TypeScript allows you to be explicit about what can and cannot be assigned a null or undefined. Added this line to `compilerOptions` inside your tsconfig.json file.

```
"strictNullChecks": true
```

Now you see still the same code, but the editor warns me about not to assign `null` to `inputStr`.

![Restrict null and undefined via Non-Nullable-Types in TypeScript](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/restrict-null-and-undefined-via-non-nullable-types-in-typescript-01.png)

To still be able to assign `null` to `inputStr`, you could define its type to be the union type of `string | null`. But when passed it down to the function, the editor again warns us that variable of type `string | null` will not be compatible to send down to the function. Because the function only accept string.

![Restrict null and undefined via Non-Nullable-Types in TypeScript](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/restrict-null-and-undefined-via-non-nullable-types-in-typescript-02.png)


I changed the signature of the function to accept an union type of `string | null`. By doing so, I am be able to send `null` value to the function, but the editor again complains about the possibility of `null` value inside the function.

![Restrict null and undefined via Non-Nullable-Types in TypeScript](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/restrict-null-and-undefined-via-non-nullable-types-in-typescript-03.png)

So I did the check in place to prevent calling any method in null value. It is a simple ternary check whether if it is [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).The editor looks happy. 

You can see before the ternary, type of `inputStr` is `string | null`. 

![Restrict null and undefined via Non-Nullable-Types in TypeScript](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/restrict-null-and-undefined-via-non-nullable-types-in-typescript-04.png)

But after the question mark, its type was recognized as `string`. Great

![Restrict null and undefined via Non-Nullable-Types in TypeScript](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/restrict-null-and-undefined-via-non-nullable-types-in-typescript-05.png)

So I hope with this example, you could start to apply strict null check in your project. Being explicit about null and undefined value will be super helpful to catch errors at the compile time before we actually run the code.
