var addEvent = (function () {
    if(document.addEventListener) {
        return function(ele, event, func) {
            ele.addEventListener(event, func, false);
        };
    } else if (document.attachEvent) {
        return function(ele, event, func) {
            ele.attachEvent('on' + event, func);
        };
    } else {
        return function(ele, event, func) {
            ele['on' + event] = func;
        };
    }
})();

function AlertBar(config) {
    this.isShow = config.isShow || false;
    this.height = config.height || 0;
    this.width = config.width || 0;
    this.positionX = config.X || 0;
    this.positionY = config.Y || 0;
    this.index = config.index || 2;

    this.alertBar;

    this.init();
};

AlertBar.prototype.init = function() {
    var alertBar = document.createElement('div'),
        title = document.createElement('h4'),
        content = document.createElement('p'),
        confirm = document.createElement('button'),
        cancel = document.createElement('button');

    var showdiv = document.getElementById('show');

    confirm.innerHTML = '确认';
    cancel.innerHTML = '取消';
    title.innerHTML = '浮出层';
    content.innerHTML = '这是一个浮出层';

    alertBar.appendChild(title);
    alertBar.appendChild(content);
    alertBar.appendChild(confirm);
    alertBar.appendChild(cancel);

    this.alertBar = alertBar;
    this.alertBar.style.position = 'absolute';

    showdiv.appendChild(alertBar); 
    this.calculate();
};

AlertBar.prototype.calculate = function() {
    var screenWidth = document.body.clientWidth,
        screenHeight = document.body.clientHeight;
        console.log(screenHeight);

    this.width = screenWidth / 4 ;
    this.height = screenHeight / 4 ; 

    this.positionX = (this.width >= 14) ? this.width : 14;
    this.positionY = (this.height >= 14) ? this.height : 14;

    this.alertBar.style.width = this.width + 'px';
    this.alertBar.style.height = this.height + 'px';
    this.alertBar.style.left = this.positionX + 'px';
    this.alertBar.style.top = this.positionY + 'px';
};


(function init() {
    var btn = document.getElementById('btn');
    addEvent(btn, 'click', function() {
        var alertBar_1 = new AlertBar({});
    });
})();