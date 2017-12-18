function Ajax(send, ...rest) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadyStateChange = function() {
    if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      
    }   
  }    
  xmlHttp.open('post', send +'.jsp', true);
  xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=gbk");
  xmlHttp.send('name=' + rest[0] + 'password=' + rest[1]);
}

window.onload = function() {
  let loginSub = document.getElementById('loginSub'),
      registSub = document.getElementById('registSub');

  addEvent(loginSub, 'click', function(event) {
    event.preventDefault();
    let name = document.getElementById('userNameL').value,
        password = document.getElementById('userPassL').value;
        warning = document.getElementById('warningL'); 
    warning.innerHTML = '';
    Ajax('login', name, password);
    event.stopPropagation();
  });

  addEvent(registSub, 'click', function(event) {
    event.preventDefault();
    let name = document.getElementById('userNameR').value,
        password = document.getElementById('userPassR').value,
        enPassword = document.getElementById('enUserPassR').value,
        warning = document.getElementById('warningR'); 
    warning.innerHTML = '';
    if(password !== enPassword) {
      warning.innerHTML = "两次输入的密码不一致，请重新输入！";//
      return false;
    }
    Ajax('regist', name, password);
    event.stopPropagation();
  });
}