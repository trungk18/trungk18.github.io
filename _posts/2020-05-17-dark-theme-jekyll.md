---
title: "Jekyll dark theme (minimal-mistake)"
categories: experience
tags: angular typescript
---

TL;DR - Once you go black you never go back

## Problem

Developers love to work at night, where everything seems quieter than daylight. They love to see their IDE in black too. I used to work on VS 2015 default theme, which is blue. And my colleagues just didn't understand why I don't use the black theme :)) 
One day I decided to change to the black theme since then I couldn't use the white theme anymore.

Last year we saw a trend of a dark mode on numerous applications, from iOS 13 to Windows 10. Recently we also have Facebook dark mode. I think my blog should have a black theme for a long time but I was too lazy to do the customization. 

This post is to demonstrate how I write a few lines of custom SCSS and JS to make a dark mode for my blog. It is using [minimal-mistakes](https://mmistakes.github.io/minimal-mistakes/) Jekyll theme and hosted directly on Github.

## Output

My blog is following the system configuration theme (in my use case, Windows 10). It is similar to how Chrome is doing its theme. I will add the toggle dark theme button soon.

![Jekyll dark theme (minimal-mistake)](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/dark-theme-jekyll-01.gif)

## Dark Mode

There are many examples of dark mode on the web. I often visit stackoverflow and found their dark theme is very good. They also published an article on [Building dark mode on Stack Overflow](https://stackoverflow.blog/2020/03/31/building-dark-mode-on-stack-overflow) with a clear explanation of how they started to layout and gradually generate the color scheme that they are currently using.

So I don't want to reinvent the wheel. I went direct to stackoverflow and took their color pallette for reusing.

```scss
$white: #fff;
$white-025: #393939;
$white-050: #3d3d3d;
$white-075: #404345;
$white-100: #4a4e51;
$white-150: #555a5e;
$white-200: #697075;
$white-300: #7d848d;
$white-350: #959ca3;
$white-400: #9fa6ad;
$white-500: #acb2b8;
$white-600: #c4c8cc;
$white-700: #cfd2d6;
$white-750: #dadee0;
$white-800: #e7e8eb;
$white-900: #f2f2f3;
```

Then I changed the background and text color of `html` and `body`. Following by some minor changes for heading.

```scss
@import "./variables";

$navy: #2f3437;

html {
  transition: all 0.1s;

  body,
  .page__footer,
  .page__title {
    transition: all 0.1s;
  }

  &.dark {
    background-color: $navy;
    color: $white-500;

    body,
    .page__footer {
      background-color: $navy;
      color: $white-500;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: $white-800;
    }

    .archive__item-title,
    .page__title {
      color: $white-800;
    }

    .page__meta {
      color: $white-400;
    }
    .archive__item-excerpt {
      color: $white-700;
    }

    .author__urls.is--visible {
      color: $white-050;
    }

    .author__bio {
      color: $white-900;
    }

    .page__content {
      strong {
        color: $white-800;
      }

      u {
        border-color: $white-800;
      }

      .project-content {
        .project-title {
          color: $white-800;
        }

        .project-date {
          color: $white-600;
        }
      }
    }

    p > code,
    a > code,
    li > code,
    figcaption > code,
    td > code {
      color: $white-050;
    }

    .social-icons {
      .fa-map-marker,
      .fa-codepen,
      .fa-github {
        color: $white-500;
      }
    }

    .pagination--pager {
      color: $white-750;
    }
  }
}
```

And finally, using [`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to check if the dark theme is enabled to add the corresponding needed class to the `html` tag. It also listens to the changes and updates the UI.


```javascript
var DarkMode = (function () {
  const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";
  const DARK_CLASS = "dark";
  function isDark() {
    return window.matchMedia && window.matchMedia(DARK_MODE_QUERY).matches;
  }

  function watch(fn) {
    window.matchMedia &&
      window.matchMedia(DARK_MODE_QUERY).addEventListener("change", (e) => {
        const isDarkMode = e.matches;
        fn && fn(isDarkMode);
      });
  }

  function init() {
    var html = document.getElementsByTagName("html")[0].classList;
    if (isDark()) {
      html.add(DARK_CLASS);
    }
    watch(function (isDarkMode) {
      isDarkMode ? html.add(DARK_CLASS) : html.remove(DARK_CLASS);
    });
  }

  init();
})();
```

### Update 23 May 2020

I added the button to toggle the dark theme manually, everything is working fine except the styling for the disquss section, because it is loaded through an `iframe`. You could refresh the page to have this section loaded properly.

![Jekyll dark theme (minimal-mistake)](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/dark-theme-jekyll-02.gif)
