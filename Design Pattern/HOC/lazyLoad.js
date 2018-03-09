var addEvent = function(elem, type, handler) {
  if (window.addEventListener) {
    addEvent = function(elem, type, handler) {
      elem.addEventListener(type, handler, false);
    }
  } else if (window.attachEvent) {
    addEvent = function(elem, type, handler) {
      elem.attachEvent('on' + type, handler);
    } 
  }

  addEvent(elem, type, handler);
}