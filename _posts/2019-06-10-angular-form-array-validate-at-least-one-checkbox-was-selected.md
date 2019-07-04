---
title: "Angular formArray/formGroup - Validate at least one checkbox was selected"
categories: experience
tags: angular typescript
---

TL;DR
1. I prefer to use FormGroup to populate the list of checkbox
2. Write a custom validator for check at least one checkbox was selected
3. Working example 

<iframe class="iframe-full-w" src="https://stackblitz.com/edit/angular-validate-at-least-one-checkbox-was-selected?embed=1&file=src/app/app.component.ts"></iframe>

---
I often have the requirement to make sure there is at least one checkbox inside a list of checkbox got selected on the UI. With the support of Angular Reactive form, you can archive it in a few lines of code.

Most of the time, the list of checkbox was populated on the server and I received it through API. But sometimes you will have a static set of checkbox with your predefined value. With each use case, the corresponding FormArray or FormGroup will be used. 

> Basically `FormArray` is a variant of `FormGroup`. The key difference is that its data gets serialized as an array (as opposed to being serialized as an object in case of FormGroup). This might be especially useful when you don’t know how many controls will be present within the group, like dynamic forms.

For the sake of simplicity, imagine you have a simple create product form with 
- One required product name textbox.
- A list of category to select from, required at least one to be checked. Assume the list will be retrieved from the server.

First, I set up a form with only product name formControl. It is a required field.

```javascript
this.form = this.formBuilder.group({
    name: ["", Validators.required]
});
```
Since the category is dynamically rendering, I will have to add these data into the form later after the data was ready.

```javascript
this.getCategories().subscribe(categories => {
    this.form.addControl("categoriesFormArr", this.buildCategoryFormArr(categories));
    this.form.addControl("categoriesFormGroup", this.buildCategoryFormGroup(categories));
})
```

There are two approaches to build up the category list.

## 1. Form Array

```javascript
buildCategoryFormGroup(categories: ProductCategory[], selectedCategoryIds: string[] = []): FormGroup {
  let group = this.formBuilder.group({}, {
    validators: atLeastOneCheckboxCheckedValidator()
  });
  categories.forEach(category => {
    let isSelected = selectedCategoryIds.some(id => id === category.id);
    group.addControl(category.id, this.formBuilder.control(isSelected));
  })
  return group;
}
```

```html
<div *ngFor="let control of categoriesFormArr?.controls; let i = index" class="checkbox">
  <label><input type="checkbox" [formControl]="control" />
    {{ categories[i]?.title }}
  </label>
</div>
```

This `buildCategoryFormGroup` will return me a FormArray. It also take a list of selected value as an argument so If you want to reuse the form for edit data, it could be helpful. For the purpose of create a new product form, it is not be applicable yet. 

Noted that when you try to access the formArray values. It will looks like `[false, true, true]`. To get a list of selected id, it required a bit more work to check from the list but based on the array index. Doesn't sound good to me but it works. 

```javascript
get categoriesFormArraySelectedIds(): string[] {
  return this.categories
  .filter((cat, catIdx) => this.categoriesFormArr.controls.some((control, controlIdx) => catIdx === controlIdx && control.value))
  .map(cat => cat.id);
}
```

That's why I came up using `FormGroup` for that matter

## 2. Form Group

The different of the formGroup is it will store the form data as the object, which required a key and a form control. So it is the good idea to set the key as the categoryId and then we can retrieve it later.

```javascript
buildCategoryFormGroup(categories: ProductCategory[], selectedCategoryIds: string[] = []): FormGroup {
  let group = this.formBuilder.group({}, {
    validators: atLeastOneCheckboxCheckedValidator()
  });
  categories.forEach(category => {
    let isSelected = selectedCategoryIds.some(id => id === category.id);
    group.addControl(category.id, this.formBuilder.control(isSelected));
  })
  return group;
}
```

```html
<div *ngFor="let item of categories; let i = index" class="checkbox">
  <label><input type="checkbox" [formControl]="categoriesFormGroup?.controls[item.id]" /> {{ categories[i]?.title }}
  </label>
</div>
```

The value of the form group will look like:

```javascript
{
    "category1": false,
    "category2": true,
    "category3": true,
}
```

But most often we want to get only the list of categoryIds as `["category2", "category3"]`. I also have to write a get to take these data. I like this approach better comparing to the formArray, because I could actually take the value from the form itself.

```javascript
get categoriesFormGroupSelectedIds(): string[] {
  let ids: string[] = [];
  for (var key in this.categoriesFormGroup.controls) {
    if (this.categoriesFormGroup.controls[key].value) {
      ids.push(key);
    }
    else {
      ids = ids.filter(id => id !== key);
    }
  }
  return ids;
}
```

## 3. Custom validator to check at least one checkbox was selected

I made the validator to check at least X checkbox was selected, by default it will check against one checkbox only.

```javascript
export function atLeastOneCheckboxCheckedValidator(minRequired = 1): ValidatorFn {
  return function validate(formGroup: FormGroup) {
    let checked = 0;

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];

      if (control.value === true) {
        checked++;
      }
    });

    if (checked < minRequired) {
      return {
        requireCheckboxToBeChecked: true,
      };
    }

    return null;
  };
}
```

Then you're all set. Hope it could help you got the idea. You could check again the [working example](https://stackblitz.com/edit/angular-validate-at-least-one-checkbox-was-selected) to see how they worked together. It is just a trivial problem but Angular team doesn't provide us a really helpful document... It took me hours to just trying to get FormArray and FormGroup work for a list of simple checkbox. It has been few years since they introduced the Reactive Form but people keep asking about these simple [problems](https://stackoverflow.com/q/40927167/3375906). Really, maybe I will switch to React or Vue very soon.