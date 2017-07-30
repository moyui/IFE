/*事件绑定*/
var AddEvent = (function() {
	if (document.addEventListener) {
		return function(ele, event, func) {
			ele.addEventListener(event, func, false);
		};
	} else if (document.attachEvent) {
		return function(ele, event, func) {
			ele.attachEvent('on' + event, func);
		};
	} else {
		return function (ele, event, func) {
			ele['on' + event] = func;
		};
	}
})();

/*中介者*/
var Mediator = {
	ships: [],
	addShip: function(ship, id) {
		this.ships[id] = ship;
	},
	receive: function(signal) {
		var self = this;

		setTimeout(function() {
			var ships = self.ships;
			
			console.log(signal.command + " 指令发送");
			self.publish(signal);

			if(signal.command === "destroy") {
				ships[signal.id] = null;
			}
		}, 1000);
	},
	publish: function(signal) {
		var random = Math.floor(Math.random() * 100),
			lose = 30;
			if (random >= lose) {
				for(var item in this.ships) {
					if (this.ships[item] && this.ships[items] instanceof Ship) {
						this.ships[item].receive(signal);
					}
				}
				console.log(signal.command + " 已成功发送");
			} else {
				console.log(signal.command + " 指令丢失");
			}
	}
};

/*飞船类*/
var Ship = function(id) {
	// 飞船编号
	this.id = id;
	// 飞船角度
	this.ag = 0;
	// 飞船能源
	this.power = 100;
	// 能源消耗速度
	this.consume = -1;
	// 飞船状态
	this.state = 0;
	// 飞船初始位置
	this.x = 300;
	this.y = 300;
	// 飞船绕地半径
	this.r = 225;
	// 飞船节点
	this.ship;
	//控制台节点
	this.control;
	// 时间间隔
	this.interval;
	// 创建飞船
	this.create();
};

//创建飞船
Ship.prototype.create = function() {
	var display = document.getElementById("display"),
		control = document.getElementById("control"),
		shipAdd = control.getElementsByTagName("button")[0],
		ship = document.createElement("div"),
		controlBar = document.createElement("div"),
		textBtn = document.createElement("span"),
		startBtn = document.createElement("button"),
		stopBtn = document.createElement("button"),
		destroyBtn = document.createElement("button");

	ship.className = "img ship";
	ship.innerHTML = this.id + "号-" + this.power + "%";
	textBtn.innerHTML = "对" + this.id + "号飞船下达指令：";
	startBtn.innerHTML = "开始飞行";
	stopBtn.innerHTML = "停止飞行";
	destroyBtn.innerHTML = "销毁";

	controlBar.appendChild(textBtn);
	controlBar.appendChild(startBtn);
	controlBar.appendChild(stopBtn);
	controlBar.appendChild(destroyBtn);
	control.insertBefore(controlBar, shipAdd);
	display.appendChild(ship);	

	this.ship = ship;
    this.control = controlBar;	
};

//飞行
Ship.prototype.fly = function() {
	if (this.state === 1) {
		return false;
	}
	this.state = 1;
	var self = this;
	clearInterval(this.interval);
	this.interval = setInterval(function() {
		if (self.power < 5) {
			self.stop();
			return;
		}
		self.power += self.consume;
		console.log(self.ship);

		//model.innerHTML = self.id + "号-" + self.power + "%";
		self.ag++;
		if (self.ag >= 360) {
			self.ag = 0;
		}
		var a = Math.sin( self.ag * Math.PI / 180 ) * self.r;
		var b = Math.cos( self.ag * Math.PI / 180 ) * self.r;
		//model.style.left = self.x + b + 'px';
		//model.style.top = self.y + a + 'px';
	}, 80);
};

//停止
Ship.prototype.stop = function() {
	if (this.state === 0) {
		return false;
	}
	this.state = 0;
	clearInterval(this.interval);
};

//自毁
Ship.prototype.destroy = function() {
	var display = document.getElementById("display");
	this.stop();
	display.removeChild(this.ship);
};

//信号捕获
Ship.prototype.receive = function(signal) {
	if (signal.id !== this.id) {
		return false;
	}
	var command = signal.command; 
	switch(command) {
		case "fly": this.fly();break;
		case "stop": this.stop();break;
		case "destroy": this.destroy();break;
		default: console.log("任务拒绝");break;
	}
};

/*指挥官类*/
var Commander = function() {};

Commander.prototype.command = function(signal) {
	Mediator.receive(signal);
};

/*按钮绑定*/
var shipBind = function() {
	id = 0;
	var model = new Ship(id);
    Mediator.addShip(model, id);
    id++;
    console.log("创建飞船");
};

(function() {
	var commander = new Commander();

	var control  = document.getElementById("control"),
		shipAdd = control.getElementsByTagName("button")[0];
	AddEvent(shipAdd, "click", shipBind);

	addHandler(control, "click", function (event) {
        var btn = getTarget(event),
            controlBar = btn.parentNode,
            index = -1,
            commands = ["fly", "stop", "destroy"];
            if (btn.tagName === "BUTTON") {
            	[].forEach.call(controlBar.querySelectorAll("button"), function (tempBtn, tempIndex) {
                	if(btn === tempBtn) {
                    	index = tempIndex;
                	}
            	});
        	}
            if(index === 1) {
                control.removeChild(btn.parentNode);
            }

            commander.command({
                index: parseInt(controlBar.querySelector("span").innerHTML.substr(1, 1), 10),
                command: commands[index]
            });
            console.log(commands[index] + " 指令从指挥官出发出");
    });
}());
