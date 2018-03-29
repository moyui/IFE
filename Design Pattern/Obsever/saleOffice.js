var event = {
  clientList: [],
  listen: function(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger: function() {
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key]; //回调函数集合
    if (!fns || fns.length === 0) {
      return false;
    }
  
    for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  },
  remove: function(key, fn) {
    var fns = this.clientList[key];

    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1 ; l >=0; l--) { //反向遍历订阅列表
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  }
};

var installEvent = function(obj) {
  for(var i in event) {
    obj[i] = event[i];
  }
};

var salesOffices = {};
installEvent(salesOffices);

salesOffices.listen('squareMeter88', function(price, squareMaster) {
  console.log('价格= ' + price);
  console.log('squareMeter= ' + squareMeter);
});

salesOffices.listen('squareMeter110', function(price, squareMaster) {
  console.log('价格= ' + price);
  console.log('squareMeter= ' + squareMeter);
});

salesOffices.trigger(200000, 88);

/*全局event*/

var Event = (function() {
  var clientList = {},
      listen,
      trigger,
      remove,

  listen = function(key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };
  trigger = function() {
    var key = Array.prototype.shift.call(arguments),
        fns = clientList[key]; //回调函数集合
    if (!fns || fns.length === 0) {
      return false;
    }
    for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  };
  remove = function(key, fn) {
    var fns = clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1 ; l >=0; l--) { //反向遍历订阅列表
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  };
  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  }
})();

$.ajax('xxx', function(data) {
  login.trigger('loginSucc', data);
});

var header = (function() {
  login.listen('loginSucc', function(data) {
    header.setAvater(data.avater);
  });
  return {
    setAvater: function(data) {
      console.log('设置...');
    }
  }
})