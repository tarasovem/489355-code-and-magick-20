'use strict';

(function () {
  window.util = {
    getMaxArrayElement: function (arr) {
      var maxElement = 0;

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }

      return maxElement;
    },
    getRandomArrayElement: function (arr) {
      var randomIndex = Math.random() * arr.length;

      return arr[Math.floor(randomIndex)];
    },
    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    },
    debounce: function (cb, interval) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, interval);
      };
    }
  };
})();
