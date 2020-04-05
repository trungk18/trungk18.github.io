---
title: "Angular async validator to validate an input field with a backend API "
categories: experience
tags: angular typescript
---

TL;DR - Write a custom [async validator](https://angular.io/api/forms/AsyncValidator) to validate an input field with a backend API in Angular reactive form.

## Working Example

<iframe class="iframe-full-w" src="https://stackblitz.com/edit/angular-custom-async-validator?embed=1&file=src/app/app.component.html&view=preview"></iframe>

## Problem

In Zyllem, a normal configuration form will have:

1. Required title fields.
2. A unique code name field. It will be auto-generated from the title if the user doesn't input the code name. 

Our best practice is to disable the submit button until the form is valid. This means the title has at least one character input, and the code is unique. Because the default required validator from Angular also accepts space as a valid character, so I have written a custom validator to make sure the input is valid after trimmed all the leading and trailing whitespace.  

But for the unique code name validator, the client will not be able to decide. The decision will be based on the server. As such, I asked the back end to provide an additional API to check the code name. Let assume there is a method `validateCodeName(code: string)` for that purpose. And somehow I have to glue it to the form. I could

1. Call the `validateCodeName` on form submit. And then call the actual API to create/update the form based on the result of `validateCodeName`.
2. Manually call the `validateCodeName` each time the code name input changed and do the check to enable the submit button. 
3. Write a **custom async validator** to validate the code name each time the code name has been changed. 

At first, I went for the first approach. But there are some behaviors which are not ideal and the QA started complaining about that. I will not go deep into these problems but it was a good time to switch to the approach (3) to write a custom async validator.

## Async Validator

You can see in the example, I create a mock API service with delay 300 to simulate the HTTP response in a real-world application. The code name will be invalid if entering `test` or `invalid`. Otherwise, it will be valid. The killer function is the `codeNameValidation`.

```javascript
 codeNameValidation({ value }: AbstractControl): Observable<ValidationErrors> {
    return timer(200).pipe(
      switchMap(() => {
        if (!value) {
          return of(null);
        }
        return this._api.validateCodeName(value).pipe(
          map(isValid => {
            if (!isValid) {
              return {
                isNotValid: true
              };
            }
            return null;
          })
        );
      })
    );
  }
```

Because the field is optional, so if the user doesn't enter any value. It is still valid, that's why I return true if the input is empty. Otherwise, go to the API server to check and update the form with the validity. Noted that there is the timer 200 at the beginning, it is the simple handling for debounce. Basically, you don't want to check every time there is a value change but only when the user stops typing. It enforces that the `validateCodeName` will not be called again until 200 milliseconds has passed without it being called previously. This approach I took from a [Stackoverflow answer](https://stackoverflow.com/a/45007974/3375906)


Also, I have a validator to check for any leading or trailing spaces.

```javascript
 noSpaceValidation({ value }: AbstractControl): ValidationErrors {
    if (!value) {
      return {
        trimError: { value: "Control has no value" }
      };
    }
    if (value.startsWith(" ")) {
      return {
        trimError: { value: "Control has leading whitespace" }
      };
    }
    if (value.endsWith(" ")) {
      return {
        trimError: { value: "Control has trailing whitespace" }
      };
    }
    return null;
  }
```

##  Wait for async validator completed before submitting form 

In the example above, I only alert the form value for simplicity's sake. But in real-world app, you will most likely call an API with the form value to perform create/update. You have to take note that: 

> Angular doesn't wait for async validators to complete before firing ngSubmit. So the form may be invalid if the validators have not resolved.

In my form above,  I have waited for the blur event on the title to set the code name. But the submit button will immediately enable after you entering the title if you don't blur (press Tab, our click outside of the field) the title field. 

To overcome that problem, check this [answer](https://stackoverflow.com/questions/49516084/reactive-angular-form-to-wait-for-async-validator-complete-on-submit). 

In my actual code, it was how it looks.

```javascript
// <form (ngSubmit)="formSubmitSubject$.next()">

this.formSubmitSubject$ = new Subject();

this.formSubmitSubject$
  .pipe(
    tap(() => this.setCodeName()),
    switchMap(() =>
      this.form.statusChanges.pipe(
        startWith(this.form.status),
        filter(status => status !== 'PENDING'),
        take(1)
      )
    ),
    filter(status => status === 'VALID')
  )
  .subscribe(validationSuccessful => this.submitForm());
```

By doing so, you will have the confidence that the `submitForm` function will only be called after all the validators, including async validators, have been evaluated.

I hope the Angular team will add this feature in the official version soon. There are many [discussions](https://github.com/angular/angular/issues/31021) going on.