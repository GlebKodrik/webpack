/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./analytics.ts ***!
  \**********************/
var createAnalytics = function createAnalytics() {
  var count = 0;
  var isDestroyed = false;

  var listener = function listener() {
    return count++;
  };

  document.addEventListener('click', listener);
  return {
    destroy: function destroy() {
      document.removeEventListener('click', listener);
      isDestroyed = true;
    },
    getAnalytics: function getAnalytics() {
      if (isDestroyed) {
        return "Analytics is delete. Total clicks = ".concat(count);
      }

      return count;
    }
  };
};

window.analytics = createAnalytics();
/******/ })()
;
//# sourceMappingURL=analytics.e36e3b1072b19917ea8c.js.map