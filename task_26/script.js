var count = 0;    /*计算飞船数量*/
var list = document.getElementById('list');
var shipAdd = list.getElementById('button');

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

var addShip = function() {
	var shipDiv = document.createElement('div');
	count++;
	var shipIntro = document.createElement('span');	
	var shipStartFly = document.createElement('button');
	var shipStopFly = document.createElement('button');
	var shipDestroy = document.createElement('button');
	shipDiv.appendChild(shipIntro);
	shipDiv.appendChild(shipStartFly);
	shipDiv.appendChild(shipStopFly);
	shipDiv.appendChild(shipDestroy);
	shipIntro.innerText = '对' + count + '号飞船下达指令：';
	shipStartFly.innerText = '开始飞行';
	shipStopFly.innerText = '停止飞行';
	shipDestroy.innerText = '销毁';
	list.insertBefore(shipDiv, shipAdd);
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