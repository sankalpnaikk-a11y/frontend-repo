/* AOS - Animate on scroll v2.3.1 */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? module.exports = factory()
    : typeof define === "function" && define.amd
    ? define(factory)
    : (global.AOS = factory());
})(this, function() {
  "use strict";

  var throttle = function(fn, wait) {
    var time = Date.now();
    return function() {
      if (Date.now() - time >= wait) {
        fn();
        time = Date.now();
      }
    };
  };

  var extend = function(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i]) continue;
      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
      }
    }
    return out;
  };

  var defaults = {
    offset: 120,
    delay: 0,
    duration: 600,
    easing: "ease",
    once: false,
    mirror: false,
    anchorPlacement: "top-bottom"
  };

  var elements = [];

  function initStyles(el, attr) {
    var delay = el.getAttribute("data-aos-delay") || attr.delay;
    var duration = el.getAttribute("data-aos-duration") || attr.duration;
    var easing = el.getAttribute("data-aos-easing") || attr.easing;

    el.style.transition = "opacity " + duration + "ms " + easing + ", transform " + duration + "ms " + easing;
    el.style.transitionDelay = delay + "ms";
  }

  function detect() {
    elements.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      var windowHeight = window.innerHeight;
      var offset = parseInt(el.getAttribute("data-aos-offset") || defaults.offset);

      var trigger =
        rect.top + offset < windowHeight && rect.bottom - offset > 0;

      if (trigger) {
        el.classList.add("aos-animate");
      } else if (!defaults.once) {
        el.classList.remove("aos-animate");
      }
    });
  }

  function prepare() {
    elements = [].slice.call(document.querySelectorAll("[data-aos]"));
    elements.forEach(function(el) {
      initStyles(el, defaults);
    });
  }

  function refresh() {
    prepare();
    detect();
  }

  function init(options) {
    defaults = extend(defaults, options);

    prepare();
    detect();

    window.addEventListener("scroll", throttle(detect, 50));
    window.addEventListener("resize", throttle(refresh, 100));

    return elements;
  }

  return { init: init, refresh: refresh };
});
