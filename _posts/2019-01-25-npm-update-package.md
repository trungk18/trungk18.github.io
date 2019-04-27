---
title: "npm - Check and update package if needed"
categories: experience
tags: npm angular
---

I was planning to upgrade Angular to the latest version for quite sometimes but since I have sticked to Angular 5 for so long, the upgrading process was complicated than I thought.

Before going deeper, let me provide some of the background knowledge.

> When you install a package using `npm install <packagename> --save`, the latest available version of the package is downloaded and put in the `node_modules` folder, and a corresponding entry is added to the `package.json` (and `package-lock.json` if you are using latest npm version) file that are present in your current folder.
>
> `npm` calculates the dependencies of the package and installs the latest available version of those as well.

### Workflow

I believe the best way to upgrade the package is to do it manually. You don't want to break your application by automated script that upgrade all the package to the version that you might not want. I usually do the upgrade process in two simple steps.

1. Identify out of date packages by [`npm outdated`](https://docs.npmjs.com/cli/outdated.html)
2. Run `npm update` or `npm install` to get the latest versions of each package.

### Upgrade process

As describe above, I will run `npm outdated` first. You can see the result as below.

![npm update](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/npm-update-01.png)

#### There are three columns that we might interested in.

1. current - show the current installed version.
2. wanted  - the maximum version of the package that satisfies the semver range specified in package.json. most of the time will satisfied minor.
3. latest  - the version of the package tagged as latest in the registry.

Before running the command `npm update @angular/common`, my current `@angular/common` required `^5.2.0`. Basically it would match the version from `5.2.0` until `5.9.9` for instance. It must not greater than `5.x.x`, so the latest version `7.2.14` will not be matched. After running the command, it got the wanted version `5.2.11`. See the rule for versioning with tilde ~ and caret ^ below. 

For more information about `npm update`, you can refer to their documentation [here](https://docs.npmjs.com/cli/update.html). As of `npm@5.0.0`, the npm update will change `package.json` to save the new version as the minimum required dependency.

As I wanted to update to the latest version, I would run the command `npm install --save`. Refer to the photo below, the package.json file get updated with the latest version which is `7.2.14`.

![npm install](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/npm-update-02.png)

### For ~ (tilde) and ^ (caret) you see in front of the version, see explanation below

> The tilde matches the most recent minor version (the middle number). `~1.2.3` will match all 1.2.x versions but will miss `1.3.0`.
>
> The caret, on the other hand, is more relaxed. It will update you to the most recent major version (the first number). `^1.2.3` will match any `1.x.x` release including `1.3.0`, but will hold off on `2.0.0`

 To upgrade all the Angular package, I repeated the process of doing `npm install` but with the list of other package as well.

 ```
 npm install @angular/animations @angular/common @angular/compiler @angular/core @angular/forms @angular/http @angular/platform-browser @angular/platform-browser-dynamic @angular/platform-server @angular/router --save

 ```