function Ajax(send, process, ...rest) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      if (process) {
        process(xmlHttp);
      }
    }   
  }    
  xmlHttp.open('post', 'http://localhost:8080/jsps/'+ send +'.jsp', true);
  xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=gbk");
  switch(send) {
    case 'showvarieties': xmlHttp.send(); break;
    case 'regist':
    case 'login': xmlHttp.send('name=' + rest[0] + '&password=' + rest[1]); break;
    case 'showitems' : xmlHttp.send('variety=' + rest[0]); break;
    case 'cart': xmlHttp.send('goods=' + rest[0] + '&quantity='+ rest[1] + '&actions='+ rest[2]); break;
    default: break;
  }
}

function ShowVarietires() {
  let varietiesShow = document.getElementById('varieties'),
      varShowfrag = document.createDocumentFragment();
  Ajax('showvarieties', function(xmlHttp) {
      let preText = xmlHttp.responseText.replace(/[\n]/ig,'');//去除回车
      let varArray = preText.split('|');
      varArray.forEach(function(element, index) {
        if(index === varArray.length - 1) {  //去除末端空格
          return false;
        }
        let button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.className = 'list-group-item btn-block text-center';
        button.innerHTML = element;

        addEvent(button, 'click', function(event) {
          ShowItems(event, element);
        });
        varShowfrag.appendChild(button);
      })
      varietiesShow.appendChild(varShowfrag);
  });
}

function LoginSub(event) {
  event.preventDefault();
  let name = document.getElementById('userNameL').value,
      password = document.getElementById('userPassL').value;
      warning = document.getElementById('warningL'),
      loginSub = document.getElementById('loginSub'),
      loginCancel = document.getElementById('loginCancel'),
      loginButton = document.getElementById('login'),
      registButton = document.getElementById('regist'),
      navbarp = document.getElementById('navbarp'),
      loginout = document.getElementById('exit');
  warning.innerHTML = '';

  if(!name) {
    warning.innerHTML = '用户名不能为空';
    return false;
  }
  if(!password) {
    warning.innerHTML = '密码不能为空';
    return false;
  }

  Ajax('login', function(xmlHttp) {
    warning.innerHTML = xmlHttp.responseText;
    let judge = xmlHttp.responseText.split(' ');
    if(judge[0] === '欢迎') {
      let buylistframe = document.getElementById('buylistframe');
      buylistframe.src = 'http://localhost:8080/jsps/cart.jsp';
      loginSub.disabled = "disabled";
      loginCancel.disabled = "disabled";
      setTimeout(function(){
        $('#loginModal').modal('hide');
      }, 2000);
      loginButton.style.display = "none"; 
      registButton.style.display = "none";
      navbarp.innerHTML = xmlHttp.responseText;
      loginout.style.display = "inline-block";
    } 
    name = '';
    password = '';
  }, name, password);
  event.stopPropagation();
}

function RegistSub(event) {
  event.preventDefault();
  let name = document.getElementById('userNameR').value,
    password = document.getElementById('userPassR').value,
    enPassword = document.getElementById('enUserPassR').value,
    warning = document.getElementById('warningR'),
    registSub = document.getElementById('registSub'),
    registCancel = document.getElementById('registCancel');
    warning.innerHTML = '';

  if(!name) {
    warning.innerHTML = '用户名不能为空';
    return false;
  }
  if(!password) {
    warning.innerHTML = '密码不能为空';
    return false;
  }
  if(!enPassword) {
    warning.innerHTML = '确认密码不能为空';
    return false;
  }  
  if(password !== enPassword) {
    warning.innerHTML = "两次输入的密码不一致，请重新输入";
    return false;
  }

  Ajax('regist', function(xmlHttp) {
    let judge = xmlHttp.responseText.replace(/[\n]/ig,'').split(' ');
    warning.innerHTML = judge[0];
    if(judge[2] == 1) {  //空格没有删除干净
      registSub.disabled = "disabled";
      registCancel.disabled = "disabled";
      setTimeout(function(){
        $('#registModal').modal('hide');
        $('#loginModal').modal('show');
      }, 2000);
    }
  }, name, password);
  event.stopPropagation();
}

function ShowItems(event, element) {
  event.preventDefault();
  let buylistframe = document.getElementById('buylistframe');
  Ajax('showitems', function(xmlHttp) {
    let preText = xmlHttp.responseText.replace(/[\n]/ig,''),
        preTextArr = preText.split('|'),
        itemsFrag = document.createDocumentFragment(),
        items = document.getElementById('items');

    items.innerHTML = '';  //清空容器
    preTextArr.forEach(function(elementArr, index) {
      if(index === preTextArr.length - 1) {  //去除末端空格
        return false;
      }
      let itemArr = elementArr.split('&');
      let divpanel = document.createElement('div'),
          divpanelbody = document.createElement('div'),
          divpanelheading = document.createElement('div'),
          divbgroup = document.createElement('div'),
          divbplus = document.createElement('button'),
          divbminus = document.createElement('button'),
          inputnum = document.createElement('input'),
          name = document.createElement('h5'),
          img = document.createElement('img'),
          price = document.createElement('h3'),
          buy = document.createElement('button');

      divpanel.className = 'panel panel-default';
      divpanelbody.className = 'panel-body';
      divpanelheading.className = 'panel-heading';

      divbgroup.className = 'btn-group pull-right';
      inputnum.className = 'col-lg-2 pull-right';
      divbplus.className = 'pull-right';
      inputnum.setAttribute('value', '1');
      divbminus.className = 'pull-right';
      buy.className = 'pull-right';
      divbplus.innerHTML = '+';
      divbminus.innerHTML = '-';

      img.className = 'img-thumbnail pull-left itemimg';
      price.className = 'pull-right pricebottom';

      name.innerHTML = itemArr[0];
      price.innerHTML = '价格:&nbsp¥' + itemArr[1];
      img.src = 'http://localhost:8080/img/' + itemArr[2];
      buy.innerHTML = "添加至购物车";

      addEvent(buy, 'click', function(event) {
        if (buylistframe.src === 'http://localhost:8080/') {   //判断是否已登录
          $('#loginModal').modal('show');   //未登录就请登录
        } else {
          AddBuyList(event, itemArr[0], inputnum.value);  //只传入商品名,商品数量
        }
      })

      addEvent(divbplus, 'click', function(event) {
        inputnum.value++;
      })

      addEvent(divbminus, 'click', function(event) {
        if(inputnum.value >= 1) {
          inputnum.value--;
        }
      })

      divbgroup.appendChild(buy);
      divbgroup.appendChild(divbminus);
      divbgroup.appendChild(inputnum);
      divbgroup.appendChild(divbplus);

      divpanelheading.appendChild(name);
      
      divpanelbody.appendChild(img);
      divpanelbody.appendChild(price);
      divpanelbody.appendChild(divbgroup);

      divpanel.appendChild(divpanelheading);
      divpanel.appendChild(divpanelbody);

      itemsFrag.appendChild(divpanel);
    })  
    items.appendChild(itemsFrag);
  }, element);
  event.stopPropagation();
}

function AddBuyList(event, itemName, quantity) {
    event.preventDefault();
    Ajax('cart', function() {
      document.getElementById('buylistframe').contentWindow.location.reload(true);
    }, itemName, quantity, 'AddCart');
    event.stopPropagation();
}

function Pay() {
  window.location.href = 'http://localhost:8080/jsps/pay.jsp';
  document.getElementById('buylistframe').contentWindow.location.reload(true);
}

window.onload = function() {
  let loginSub = document.getElementById('loginSub'),
      registSub = document.getElementById('registSub'),
      deleteBuyList = document.getElementById('deleteBuyList'),
      payButton = document.getElementById('pay');

  addEvent(loginSub, 'click', function(event) {
    LoginSub(event);
  });

  addEvent(registSub, 'click', function(event) {
    RegistSub(event);
  });

  addEvent(deleteBuyList, 'click', function(event) {
    event.stopPropagation();
    Ajax('cart', function() {
      document.getElementById('buylistframe').contentWindow.location.reload(true);
    }, null, null, 'Delete');
    event.stopPropagation();
  })

  addEvent(payButton, 'click', function(event) {
    event.stopPropagation();
    Pay();
    event.stopPropagation();
  })

  ShowVarietires();
}