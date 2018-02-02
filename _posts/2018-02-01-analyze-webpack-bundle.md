---
title: "Analyze webpack bundle with source-map-explorer"
categories: experience
tags: webpack typescript
---

Webpack is a module bundler which means that it bundles together all of your JavaScript files to one or multiple files commonly named bundle.js. If you want to know the difference between all the terminology such as module bundle, module loader or `npm`, see my [answer](https://stackoverflow.com/a/39825582/3375906).

Recently our bundle size suddenly getting so much bigger than before. Although `webpack` provide the information of how your bundle was composed of. I found that [source-map-explorer](https://github.com/danvk/source-map-explorer) tool shows an easy-to-understand-and-explore visualization to help you debug where all the code is coming from.

Take note of the image below. The size of `client-api.js` file before was just 31kb only.

![analyze webpack bundle source-map-explorer](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/alalyze-webpack-01.png)

I have made some changes recently and the size climbed up to 600+ kb. The reason is that another module was included in it.

![analyze webpack bundle source-map-explorer](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/alalyze-webpack-02.png)

That's when source-map-explorer come and shine. It will not be installed into your dependency, but globally via npm.

Install:

```bash
npm install -g source-map-explorer
```

Use: the source map file needs to be present.

```bash
source-map-explorer bundle.min.js
source-map-explorer bundle.min.js bundle.min.js.map
```

After running the command, this is how my client-api.js bundle looks like. You can see most of the space was taken by `moment.js` and `intl-tel-input.js`. My actual code is located inside the module which only takes 40kb. So the question now is how to optimize the bundle?

![analyze webpack bundle source-map-explorer](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/alalyze-webpack-03.png)

One of the obvious parts we can take out is the moment.js locale, which accounts for 167kb and we are not using it at all. It happened because when you write `var moment = require('moment')` in your code and pack with webpack, the bundle will include all locale files.

To remove all locale files, I will use the IgnorePlugin. Refer to [this question](https://stackoverflow.com/q/25384360/3375906) for more options.

```javascript
const webpack = require('webpack');
module.exports = {
  //...
  plugins: [
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
```

And you can still load some locales in your code.

```javascript
const moment = require('moment');
require('moment/locale/ja');

moment.locale('ja');
```

Then I rebuild and re-analyze the bundle, you can see how all the locale was gone. We have just saved 100kb, quite a lot.

![analyze webpack bundle source-map-explorer](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/alalyze-webpack-04.png)

I hope you guys find it helpful to apply to your project. Cheer.