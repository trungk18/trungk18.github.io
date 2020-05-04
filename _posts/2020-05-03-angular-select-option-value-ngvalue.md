---
title: "The different between [value] and [ngValue] when passing to select option"
categories: experience
tags: angular typescript
---

TL;DR - Set [value] on `<option value="true">Yes</option>` will make our model/formcontrol return a string, which mean you receive a string `"false"`, instead of a boolean `false`. To solve it, use `ngValue`

## Working Example

<iframe class="iframe-full-w" src="https://stackblitz.com/edit/angular-value-ngvalue-option?embed=1&file=src/app/app.component.ts&view=preview"></iframe>

## Problem

Recently I have to build a dropdown for a simple yes/no input, which output is equivalent to a boolean type. Obviously, we can always use a checkbox for that purpose.

```html
<select name="ShowSLATimeWindows" class="form-control" [(ngModel)]="showSLATimeWindowValue">
    <option [value]="false">No: Hide the SLA time windows (only display the calculated time windows)</option>
    <option [value]="true">Yes: Show the SLA time windows for each location in the app in addition to the calculated ones</option>
</select>
<div>Answer: {{ showSLATimeWindowValue ? "Yes": "No" }}</div>
```

Initially, I set the value of the ngModel to false `showSLATimeWindowValue: boolean = false`. It displays the value correctly. But as I started to change the value of the dropdown, the model value turned to be a string, either `"true"` or `"false"`. Not boolean `true` or `false` anymore. Therefore the condition to show `showSLATimeWindowValue ? "Yes": "No"` is broken. Because both `"false"` and `"true"` will always be [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy), which mean in the context of boolean, they are always equal true.

![The different between [value] and [ngValue] when passing to select option](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/angular-select-option-value-ngvalue-01.gif)

As mentioned in the [Angular documentation](https://angular.io/api/forms/NgSelectOption):

- `@Input() ngValue: any`: Tracks the value bound to the option element. Unlike the value binding, ngValue supports **binding to objects**.
- `@Input() value: any`: Tracks simple **string values** bound to the option element. For objects, use the ngValue input binding.

Based on the documentation, our example above works as expected.

## Solution - to use ngValue

In my case, I can use [ngValue] to set boolean values:

```html
<select name="ShowSLATimeWindows" class="form-control" [(ngModel)]="showSLATimeWindowValue">
    <option [ngValue]="false">No: Hide the SLA time windows (only display the calculated time windows)</option>                      // value: false (as boolean)
    <option [ngValue]="true">Yes: Show the SLA time windows for each location in the app in addition to the calculated ones</option> // value: true (as boolean)
</select>
```
See [stackblitz](https://stackblitz.com/edit/angular-value-ngvalue-option?embed=1&file=src/app/app.component.ts), works perfectly fine. I received the boolean to display the answer correctly.
