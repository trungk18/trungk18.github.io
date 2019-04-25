---
title: "Angular render recursive view using *ngFor and ng-template"
categories: experience
tags: angular
---

We're all familiar with recursive view. One of the most common component that needed this technique is the nested navigation bar. The HTML structure and UI look like.

```html
<ul>
  <li><a href="#">Section 1</a></li>
  <li><a href="#">Section 2</a>
    <ul>
      <li><a href="#">Section 2.1</a></li>
      <li><a href="#">Section 2.2</a></li>
      <li><a href="#">Section 2.3</a></li>
    </ul>
  </li>
  <li><a href="#">Section 3</a>
    <ul>
      <li><a href="#">Section 3.1</a></li>
      <li><a href="#">Section 3.2</a>
        <ul>
          <li><a href="#">Section 3.2.1</a></li>
          <li><a href="#">Section 3.2.2</a></li>
          <li><a href="#">Section 3.2.3</a>
            <ul>
              <li><a href="#">Section 3.2.3.1</a></li>
              <li><a href="#">Section 3.2.3.2</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li><a href="#">Section 3.3</a></li>
    </ul>
  </li>
</ul>
```

### Solution

Imagine I have a class NavigationModel that represent the data above

```javascript
class NavigationModel {
  public title: string;
  public url?: string;
  public children: NavigationModel[];
}
```

So the trick is very simple, you set up a ng-template which take a list of NavigationModel as the parameter. And then render the template itself with children data if there are any children, because children is also a list of NavigationModel.

app.component.html

```html
<ul>
  <ng-container *ngTemplateOutlet="recursiveListTmpl; context:{ $implicit: list }"></ng-container>
</ul>

<ng-template #recursiveListTmpl let-list>
  <li *ngFor="let item of list">
    {% raw %} {{ item.title }} {% endraw %}
    <ul *ngIf="item.children.length > 0">
      <ng-container *ngTemplateOutlet="recursiveListTmpl; context:{ $implicit: item.children }"></ng-container>
    </ul>
  </li>
</ng-template>
```

app.component.ts

```javascript
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public list: NavigationModel[] = [
    {
      title: "Section 1",
      children: []
    },
    {
      title: "Section 2",
      children: [
        {
          title: "Section 2.1",
          children: []
        },
        {
          title: "Section 2.2",
          children: []
        },
        {
          title: "Section 2.3",
          children: []
        }
      ]
    },
    {
      title: "Section 3",
      children: [
        { title: "Section 3.1", children: [] },
        {
          title: "Section 3.2",
          children: [
            {
              title: "Section 3.2.1",
              children: []
            },
            {
              title: "Section 3.2.2",
              children: []
            },
            {
              title: "Section 3.2.3",
              children: [
                {
                  title: "Section 3.2.3.1",
                  children: []
                },
                {
                  title: "Section 3.2.3.2",
                  children: []
                }
              ]
            }
          ]
        },
        {
          title: "Section 3.3",
          children: [
            {
              title: "Section 3.3.1",
              children: []
            },
            {
              title: "Section 3.3.2",
              children: []
            }
          ]
        }
      ]
    }
  ];
}
```

Then you have it. It was rendering as expected. Of course there is another solution in which we create a new component/ directive that take input as the list. And do exactly the same thing as `ng-template` example above. 

### Working Example

<iframe style="width: 100%; height: 400px;" src="https://stackblitz.com/edit/angular-mhwflb?embed=1&file=src/app/app.component.ts"></iframe>
<br/>
