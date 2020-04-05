---
title: "Angular - Correct singular/plural form of a noun using custom pipe or NgPlural"
categories: experience
tags: angular
---

Pluralization is a problem in its sphere. We need to always correctly define grammar in our apps based on the singular/plural value. E.g

```html
1 stop
5 stops
```

Some websites use the (s). So that it is up to the reader to remove (s) or add (s) when reading it.

```
1 stop(s)
5 stop(s)
```

## 1. Custom Pipe

But as a front end developer who cares about the user experience, I always want to correct it for them. 

At the beginning, I ended up to do the check for every word, so the code to display singular/plural will looks like:

```typescript
<p>Number of stops:{% raw %} {{ numberOfStops }} {% endraw %} stop{% raw %} {{ numberOfStops > 1 ? "s" : ""}} {% endraw %}</p>
```

But more and more code like that could be error prone, what if my team member when he is too tired for coding, he will do the check as `numberOfStops >= 1`. So that I wrote a simple `plural` pipe which takes a number as an argument and based on that to return the plural form of a word. As long as you are using this pipe, the result will be display as expected. No more funny check and error prone. By default it will append `s` to the end of the word. But of course, you could specify the plural form of a noun because not all of them ended with `s` in a plural form. Such as `bus` will become `buses` or `hero` will become `heroes`.

The code of `PluralPipe` looks like below, you can open the stackblitz link on top to see it in action.

```typescript
@Pipe({name: 'plural'})
export class CustomPluralPipe implements PipeTransform {
  transform(input: number, customPluralForm: string = "s"): string {
    return input > 1 ? customPluralForm : "";
  }
}
```

To use it in the template, super easy.

```html
<p>Number of stops:{% raw %} {{ numberOfStops }} {% endraw %} stop{% raw %} {{ numberOfStops | plural}} {% endraw %}</p>
```

The problem becomes interesting when you have to do the plural form for some special word such as `person`, as it will come `people` in a plural form. Or `child`, will become `children`. I didn't have the problem in a real project so what I can think of is to do a check like `inputNumber > 1 ? "children": "child"`. For the long run, you could consider to abstract that condition to a simple pipe that takes a numeric value and two input noun and then renders it accordingly.


## 2. Angular NgPlural

You might not know that Angular has a built-in directive called [NgPlural](https://angular.io/api/common/NgPlural) for this need. You can use this directive for the use case I mentioned above with my awesome custom pipe code. But I still prefer my approach in a normal use case :)) I don't know, I just get used to it.

So basically, the NgPlural in action will look like:

```
<p [ngPlural]="numberOfStops">
    Number of stops: {% raw %}{{ numberOfStops }}{% endraw %}
    <ng-template ngPluralCase="=1">stop</ng-template>
    <ng-template ngPluralCase=">1">stops</ng-template>
</p>
```
Actually the above code only run if with the first use case when the number is 1. If I increase it to 2, I got an error on the console `ERROR Error: No plural message found for value "2"`. Anyway I will come back to this directive If I need to use it in the future, maybe with i18n need.

## Working Example

<iframe class="iframe-full-w" src="https://stackblitz.com/edit/angular-singular-plural-form?embed=1&file=src/app/app.component.html&view=preview"></iframe>
