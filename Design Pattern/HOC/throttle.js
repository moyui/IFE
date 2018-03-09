var throttle = function(fn, interval) {
  var _self = fn,
      timer,
      firstTime = true;
  return function() {
    var args = arguments,
        _me = this;
    if (firstTime) {
      _self.apply(this, args);
      return firstTime = false;
    }

    if (timer) {
      return false;
    }

    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      _self.apply(_me, args);
    }, interval || 500);
  };
};