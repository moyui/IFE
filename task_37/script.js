function AlertBar(config) {
    this.height = config.height || 0;
    this.width = config.width || 0;
    this.positionX = config.X || 0;
    this.positionY = config.Y || 0;
    this.index = config.index || 2;
    this.drag = config.drag || true;

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
    showdiv.appendChild(alertBar); 

    this.alertBar = alertBar; 

    this.calculate();
    this.bind();
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

AlertBar.prototype.bind = function(event) {
    var self = this,
        target = getTarget(event),
        showdiv = document.getElementById('show'),
        shadow = document.getElementById('shadow');

    function click() {
        var alertBar = self.alertBar;

    shadow.style.display = 'none';
    showdiv.removeChild(alertBar);
    };

    function drag(event) {
        var dragX = 0,
            dragY = 0;

        event = event || window.event; 
            switch(event.type) {
                case 'mousedown' :
                    dragX = event.clientX - self.offsetLeft;
                    dragY = event.clientY - self.offsetTop;
                    break;
                case 'mousemove' :
                    self.style.left = event.clientX - dragX + 'px';
                    self.style.top = event.clientY - dragY + 'px';
                    break;
                case 'mouseup' : 
                    dragX = 0;
                    dragY = 0;
                    break;
                default :
                    break;
            };
        };
    switch (target) {
        case 'shaodw' :
        case 'confirm' :
        case 'cancel' : 
            addEvent(target, 'click', click);
            break;
        case 'alertBar' : 
            addEvent(self.alertBar, 'drag', drag);
            break;
        default :
            break;
    };
};

(function init() {
    var btn = document.getElementById('btn');
    addEvent(btn, 'click', function() {
        var alertBar_1 = new AlertBar({});
    });
})();