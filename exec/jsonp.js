(function(window, document) {
  'use strict';
  var jsonp = function(url, data, callback) {
    var dataString = url.indexof('?') == -1? '?':'&';
    for(var key in data) {
      dataString += key + '=' + data[key] + '&';
    }
    
    var cbFuncName = 'my_json_cb_' + Math.random().toString().replace('.','');//也可以使用new Date().getTime();
    dataString += 'callback=' + cbFuncName;

    var scriptEle = document.createElement('script');
    scriptEle.src = url + dataString;

    window[cbFuncName] = function(data) {
      callback(data);
      document.body.removeChild(scriptEle);
    }

    document.body.appendChild(scriptEle);
  }

  window._jsonp = jsonp;
})(window, document);