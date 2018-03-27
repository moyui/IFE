var each = function(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    if (callback.call(arr[i], i, arr[i]) === false) {
      break;
    }
  }
};