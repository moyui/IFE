function AlertBar(config) {
    this.height = config.height || 0;
    this.width = config.width || 0;
    this.positionX = config.X || 0;
    this.positionY = config.Y || 0;
    this.index = config.index || 2;
    this.drag = config.drag || true;
    this.btnText = config.btnText || {0:'确认', 1:'取消'};

    this.alertBar;
    this.shadow;
    this.btns = [];

    this.init();
};

AlertBar.prototype.init = function() {
    var alertBar = document.createElement('div'),
        title = document.createElement('h4'),
        clickBar = document.createElement('div'),
        content = document.createElement('p');

    var showdiv = document.getElementById('show'),
        shadow = document.getElementById('shadow'),
        btns = this.btns;

    title.innerHTML = '浮出层';
    content.innerHTML = '这是一个浮出层';
    alertBar.className = 'alertbar';
    clickBar.className = 'clickbar';

    alertBar.appendChild(title);
    alertBar.appendChild(content);   
    alertBar.appendChild(clickBar);

    for(var key in this.btnText) {
        btns[key] = document.createElement('button');
        btns[key].innerHTML = this.btnText[key];
        clickBar.appendChild(btns[key]);
    }

    shadow.style.display = 'block';   
    showdiv.appendChild(alertBar); 

    this.alertBar = alertBar; 
    this.shadow = shadow;
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

AlertBar.prototype.bind = function() {
    var self = this,
        dragX = 0,
        dragY = 0;
        showdiv = document.getElementById('show');

    addEvent(self.shadow, 'click', function click(event) {
        var target = getTarget(event);
        if (target === self.shadow) {
            self.shadow.style.display = 'none';
            showdiv.removeChild(self.alertbar);//这两处会重复触发
        }
    });

    for (let i = 0; i < this.btns.length; i++) {
        let that = self;
        addEvent(that.btns[i], 'click', function click(event) {
            var target = getTarget(event);
            if (target === that.btns[i]) {
                that.shadow.style.display = 'none';
                showdiv.removeChild(that.alertBar); //这两处会重复触发
            }
        });
    }

    function drag(event) {
        switch(event.type) {
                case 'mousedown' :
                    dragX = event.clientX - self.alertBar.offsetLeft;
                    dragY = event.clientY - self.alertBar.offsetTop;
                    addEvent(document, 'mousemove', drag);
                    break;
                case 'mousemove' :
                    console.log(dragX, dragY);
                    self.alertBar.style.left = event.clientX - dragX + 'px';
                    self.alertBar.style.top = event.clientY - dragY + 'px';
                    break;
                case 'mouseup' : 
                    dragX = 0;
                    dragY = 0;
                    removeEvent(document, 'mousemove', drag);
                    break;
                default :
                     break;
            }
        };

    addEvent(document, 'mouseup', drag);
    addEvent(document, 'mousedown', drag);
};

(function init() {
    var btn = document.getElementById('btn');
    addEvent(btn, 'click', function() {
        var alertBar_1 = new AlertBar({});
    });
})();