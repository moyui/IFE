var count = 0;    /*计算飞船数量*/
var list = document.getElementById('list');
var shipAdd = list.getElementById('button');


var Mediator = {    /*数据包类*/
	id: 0,
	commond: '',
	random: random()
};

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

var random = function() {
	var random = Math.random() * 10;
	if (random >= 3) {
		return true;
	} else {
		return false;
	}
};

var addShip = function() {    /*指挥官面板*/
	var shipDiv = document.createElement('div');
	shipDiv.setAttribute('value', count);
	count++;
	addShipProcess(shipDiv, 'span', '对' + count + '号飞船下达指令：', 0);
	addShipProcess(shipDiv, 'button', '开始飞行', fly);
	addShipProcess(shipDiv, 'button', '停止飞行', stop);
	addShipProcess(shipDiv, 'button', '销毁', destroy);
	list.insertBefore(shipDiv, shipAdd);
};

var addShipProcess = function(fatherNode, childNode, text, value) {    /*创建指挥官节点*/
	fatherNode.appendChild(document.createElement(childNode).setAttribute('value', value).innerText(text));
	return fatherNode;
};

var shipStartFly = function() {
	var display = document.getElementById('display');
	var ship = document.createElement('span');
	ship.setAttribute('class', 'ship');
	ship.style.left = 500 + 'px';
	ship.style.top = 75 + 'px';
	var r = 225;
	var x = 300;
	var y = 300;

	var ag = 0;
	setInterval(function() {
		ag++;
		var a = Math.sin( ag*Math.PI/180 ) * r;
		var b = Math.cos( ag*Math.PI/180 ) * r;
		ship.style.left = x + b + 'px';
		ship.style.top = y + a + 'px';
	}, 30);
};

var stop = function() {
	 
};