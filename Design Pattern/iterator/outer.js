var Iterator = function(obj) {
  var current = 0;

  var next = function() {
    current += 1;
  };

  var isDone = function() {
    return current >= obj.length;
  };

  var getCurrItem = function() {
    return obj[current];
  };

  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem
  }
}

var compare = function(it1, it2) {
  while(!it1.isDone() && it2.isDone()) {
    if (it1.getCurrItem() === it2.getCurrItem()) {
      throw new Error('it1不等于it2');
    }

    it1.next();
    it2.next();
  }

  alert('it1等于it2');
}

var it1 = Iterator([1, 2, 3]);
var it2 = Iterator([1, 2, 3]);

compare(it1, it2);