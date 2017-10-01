function addEvent(ele, event, func) {
    if(ele.addEventListener) {
        addEvent = function(ele, event, func) {
            ele.addEventListener(event, func, false);
        };
    } else if (ele.attachEvent) {
        addEvent = function(ele, event, func) {
            ele.attachEvent('on' + event, func);
        };
    } else {
        addEvent = function(elem, event, func) {
            ele['on' + event] = func;   
        };
    }
    return addEvent(ele, event, func);
};

function removeEvent(ele, event, func){
    if(ele.removeEventListener) {
        removeHandler = function(ele, event, func) {
            ele.removeEventListener(event, func, false);
        };
    } else if (ele.detachEvent) {
        removeHandler = function (ele, event, func) {
            ele.detachEvent("on" + event, func);
        };
    }else{
        removeHandler = function (ele, event, func) {
            ele["on" + event] = null;
        };
    }
    return removeHandler(ele, event, func);
};

function getTarget(event) {
    event = event || window.event;
    return event.target || event.srcElement;
};