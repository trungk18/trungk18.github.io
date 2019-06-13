---
title: "Angular Form Array - Validate at least one checkbox was selected"
categories: experience
tags: angular typescript
---

I often have the requirement to make sure there is at least one checkbox inside a list of checkboxes got selected on the UI. With the support of Angular Reactive form, you can archive it in a few lines of code.

Most of the time, the list of checkboxes was populated on the server and I received it through API. But sometimes you will have a static set of checkboxes with your predefine value. With each use case, the corresponding FormArray or FormGroup will be used. 

> Basically `FormArray` is a variant of `FormGroup`. The key difference is that its data gets serialized as an array (as opposed to being serialized as an object in case of FormGroup). This might be especially useful when you don’t know how many controls will be present within the group, like dynamic forms.

For the sake of simplicity, imagine you have a simple create user form with 
- One required full name textbox.
- A list of roles to select from, required at least one to be checked.

## 1. Dynamic list of checkboxes

For this use case, I will use FormArray with these `push`, `insert` and `removeAt` formControl.


