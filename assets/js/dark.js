var DarkMode = (function () {
  var DARK_MODE_LOCAL_STORAGE = "TRUNGK18_BLOG_DARK_MODE"
  var DARK_MODE_QUERY = "(prefers-color-scheme: dark)";
  var MOON_ICON = "fa-moon-o";
  var SUN_ICON = "fa-sun-o";
  var DARK_CLASS = "dark";

  var storage = {
    isDark: function () {
      try {
        return !!localStorage.getItem(DARK_MODE_LOCAL_STORAGE);
      } catch (error) {
        return false;
      }
    },
    setDarkTheme: function (isDark) {
      try {
        localStorage.setItem(DARK_MODE_LOCAL_STORAGE, isDark ? DARK_CLASS : "");
      } catch (error) {

      }
    }
  }

  function isDarkFromSystem() {
    return window.matchMedia && window.matchMedia(DARK_MODE_QUERY).matches;
  }

  function isDark() {
    if (storage.isDark()) {
      return true;
    }
    return isDarkFromSystem();
  }

  function toggleIconManually(isDark) {
    var html = document.getElementsByTagName("html")[0].classList;
    var icon = getIcon();
    if (!icon) {
      return;
    }
    storage.setDarkTheme(isDark);
    if (isDark) {
      icon.classList.remove(MOON_ICON);
      icon.classList.add(SUN_ICON);
      html.add(DARK_CLASS)
    }
    else {
      icon.classList.remove(SUN_ICON)
      icon.classList.add(MOON_ICON);
      html.remove(DARK_CLASS)
    }
  }

  function watch(fn) {
    window.matchMedia &&
      window.matchMedia(DARK_MODE_QUERY).addEventListener("change", (e) => {
        var isDarkMode = e.matches;
        fn && fn(isDarkMode);
      });
  }

  function getIcon() {
    return document.getElementById("DarkThemeToggleIcon");
  }

  function init() {
    var iconContainer = document.getElementById("DarkThemeToggleContainer");

    toggleIconManually(isDark());

    iconContainer.addEventListener("click", function () {
      let isDark = storage.isDark();
      toggleIconManually(!isDark);
    })

    watch(function (isDarkMode) {
      toggleIconManually(isDarkMode);
    });

  }

  init();
})();
