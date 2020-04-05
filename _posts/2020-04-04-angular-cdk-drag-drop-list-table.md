---
title: "Angular CDK Drag/Drop List inside a table (not Material Table) - Handle rows distorting width"
categories: experience
tags: angular typescript
---

TL;DR - Manually set the column width to prevent rows distorting width when using Angular CDK Drag/Drop

## Working Example

<iframe class="iframe-full-w" src="https://stackblitz.com/edit/angular-cdk-drag-drop-bootstrap-table?embed=1&file=src/app/app.component.html&view=preview"></iframe>

## Problem

In Zyllem, many places need to configure the order of each item, and this order will become very important when the runtime kicked in. In the beginning, our backend used MVC and Razor to build form, so usually, we will add one textbox to input the order number. Imagine you have a list of 10 items and you did the numbering. But then one day you need to change the number 5 to be the first one in the list so that you will have to manually update all the other 9 items as well. And it is also error prone because there is no validation, so there could be two items with the same number.

Recently, we migrated some of the UI to client-side. We removed the order textbox, instead, we let the user drag and drop to change the order.

To start using CDK Drag and drop, very simple. Start by importing `DragDropModule` into the `NgModule` where you want to use drag-and-drop features. You can now add the `cdkDrag` directive to elements to make them draggable. When outside of a cdkDropList element, draggable elements can be freely moved around the page. You can add `cdkDropList` elements to constrain where elements may be dropped.

### 1. Configure drag and drop inside a table

Usually, we will have to use it in a table view. See the code below to enable drag and drop inside a table. It is to display a list of users to the screen.

```html
<table class="table">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
        </tr>
    </thead>
    <tbody cdkDropList
            (cdkDropListDropped)="onDrop($event)">
        <tr *ngFor="let user of users"
            cdkDrag
            cdkDragLockAxis="y">
            <th>
                <div class="drag-handle">
                    <ng-container [ngTemplateOutlet]="dragHandleTmpl">
                    </ng-container>
                    {{ user.order }}
                </div>
            </th>
            <td>{{ user.first }}</td>
            <td>{{ user.last }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.address }}</td>
        </tr>
    </tbody>
</table>
```

By simple adding `cdkDropList` into the `tbody`, and `cdkDrag` to each `tr`. I simply mean I wanted each row to be able to move inside the body. `cdkDragLockAxis="y"` to force the row to move upward and downward only, not freely. The result is displayed below.


![Angular CDK Drag/Drop List inside table (not Material Table) - Handle rows distorting width](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/angular-cdk-drag-drop-table-01.gif)

### 2. Add animation 

Now each row can be move, but it hasn't looked great yet. We need to add a few more lines of CSS to add animation to the drag and drop event. Refer to this [documentation](https://material.angular.io/cdk/drag-drop/overview#styling) for the full list of CSS class that you can update. 

By only added these two lines, it looks much better now.

```css
/* Animate items as they're being sorted. */
.cdk-drop-list-dragging .cdk-drag {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

.cdk-drag-preview {  
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  padding: 4px;  
}
```

![Angular CDK Drag/Drop List inside table (not Material Table) - Handle rows distorting width](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/angular-cdk-drag-drop-table-02.gif)

### 3. Fix rows distorting width

But do you notice one thing? When you start dragging the row, The preview row has all of the columns stick together. I looked at the source and saw that Angular added `cdk-drag-preview` to the top level of body so that the style of the table was losing.

![Angular CDK Drag/Drop List inside table (not Material Table) - Handle rows distorting width](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/angular-cdk-drag-drop-table-03.png)

I heard the cdk drag and drop work well with Material table. Because in material table, you can use the flexbox implementation. For a normal table, I came up with a solution to manually set the width of each column by CSS, it didn't look the same as each row in the table, but the result is acceptable until Angular team provided us a proper solution for supporting table. Table column is a complicated topic, you can see all the rules of how the table column width is calculated in the [W3 Table specs](https://www.w3.org/TR/CSS21/tables.html).

```css
.col-xs {
  width: 2%;  
}

.col-sm {
  width: 10%;  
}

.col-md {
  width: 20%;  
}
```

```html
<tbody cdkDropList
        (cdkDropListDropped)="onDrop($event)">
    <tr *ngFor="let user of users"
        cdkDrag
        cdkDragLockAxis="y">
        <th class="col-xs">
            <div class="drag-handle">
                <ng-container [ngTemplateOutlet]="dragHandleTmpl">
                </ng-container>
                {{ user.order }}
            </div>
        </th>
        <td class="col-md">{{ user.first }}</td>
        <td class="col-md">{{ user.last }}</td>
        <td class="col-md">{{ user.email }}</td>
        <td class="col-md">{{ user.address }}</td>
    </tr>
</tbody>
```

And this is the result...

![Angular CDK Drag/Drop List inside table (not Material Table) - Handle rows distorting width](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/angular-cdk-drag-drop-table-04.gif)







