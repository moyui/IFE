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
        addEvent = function(ele, event, func) {
            ele['on' + event] = func;   
        };
    }
    return addEvent(ele, event, func);
};

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
        clickBar = document.createElement('div'),
        content = document.createElement('p'),
        confirm = document.createElement('button'),
        cancel = document.createElement('button');

    var showdiv = document.getElementById('show'),
        shadow = document.getElementById('shadow');

    confirm.innerHTML = '确认';
    cancel.innerHTML = '取消';
    title.innerHTML = '浮出层';
    content.innerHTML = '这是一个浮出层';
    alertBar.className = 'alertbar';
    clickBar.className = 'clickbar';

    alertBar.appendChild(title);
    alertBar.appendChild(content);
    clickBar.appendChild(cancel);    
    clickBar.appendChild(confirm);
    alertBar.appendChild(clickBar);

    shadow.style.display = 'block';    
    this.alertBar = alertBar;    

    showdiv.appendChild(alertBar); 
    this.calculate();
    addEvent(confirm, 'click', this.click.bind(this));
    addEvent(cancel,'click', this.click.bind(this));
};

AlertBar.prototype.calculate = function() {
    var screenWidth = window.innerWidth,
        screenHeight = window.innerHeight;

    this.width = screenWidth / 4 ;
    this.height = screenHeight / 4 ; 

    this.positionX = (this.width >= 14) ? (this.width + this.width / 2) : 14;
    this.positionY = (this.height >= 14) ? (this.height + this.height / 2) : 14; 

    this.alertBar.style.width = this.width + 'px';
    this.alertBar.style.height = this.height + 'px';
    this.alertBar.style.left = this.positionX + 'px';
    this.alertBar.style.top = this.positionY + 'px';
};

AlertBar.prototype.click = function() {
    var showdiv = document.getElementById('show'),
        shadow = document.getElementById('shadow'),
        alertBar = this.alertBar;
        
    shadow.style.display = 'none';
    showdiv.removeChild(alertBar);
};

(function init() {
    var btn = document.getElementById('btn');
    addEvent(btn, 'click', function() {
        var alertBar_1 = new AlertBar({});
    });
})();