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
    case 'cart': xmlHttp.send('goods=' + rest[0] + '&actions='+ rest[1]); break;
    default: break;
  }
}

function ShowVarietires() {
  let varietiesShow = document.getElementById('varieties'),
      varShowfrag = document.createDocumentFragment();
  Ajax('showvarieties', function(xmlHttp) {
      let preText = xmlHttp.responseText.replace(/[\n]/ig,'');
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
      warning = document.getElementById('warningL'); 
  warning.innerHTML = '';
  Ajax('login', function(xmlHttp) {
  }, name, password);
  items.appendChild(itemsFrag);
  event.stopPropagation();
}

function RegistSub(event) {
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
  Ajax('regist', function(xmlHttp) {
    warning.innerHTML = xmlHttp.responseText;
  }, name, password);
  event.stopPropagation();
}

function ShowItems(event, element) {
  event.preventDefault();
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
          diviwrap = document.createElement('div'),
          inputnum = document.createElement('input'),
          name = document.createElement('h5'),
          img = document.createElement('img'),
          price = document.createElement('h3'),
          buy = document.createElement('button');

      divpanel.className = 'panel panel-default';
      divpanelbody.className = 'panel-body';
      divpanelheading.className = 'panel-heading';
      divbgroup.className = 'btn-group';
      diviwrap.className = 'col-lg-2';
      inputnum.className = 'form-control';
      img.className = 'img-thumbnail pull-left';
      price.className = 'pull-left';

      divbplus.innerHTML = '+';
      divbminus.innerHTML = '-';
      inputnum.setAttribute('value', '1');
      name.innerHTML = itemArr[0];
      price.innerHTML = '¥' + itemArr[1];
      buy.innerHTML = "添加至购物车";

      addEvent(buy, 'click', function(event) {
        AddBuyList(event, itemArr[0]);  //只传入商品名
      })


      diviwrap.appendChild(inputnum);

      divbgroup.appendChild(divbplus);
      divbgroup.appendChild(diviwrap);
      divbgroup.appendChild(divbminus);

      divpanelheading.appendChild(name);
      
      divpanelbody.appendChild(img);
      divpanelbody.appendChild(price);
      divpanelbody.appendChild(divbgroup);
      divpanelbody.appendChild(buy);

      divpanel.appendChild(divpanelheading);
      divpanel.appendChild(divpanelbody);

      itemsFrag.appendChild(divpanel);
    })  
    items.appendChild(itemsFrag);
  }, element);
  event.stopPropagation();
}

function AddBuyList(event, itemName) {
    event.preventDefault();
    Ajax('cart', function() {
      document.getElementById('buylistframe').contentWindow.location.reload(true);
    }, itemName, 'AddCart');
    event.stopPropagation();
}

window.onload = function() {
  let loginSub = document.getElementById('loginSub'),
      registSub = document.getElementById('registSub'),
      deleteBuyList = document.getElementById('deleteBuyList');

  addEvent(loginSub, 'click', function(event) {
    LoginSub(event);
  });

  addEvent(registSub, 'click', function(event) {
    RegistSub(event);
  });

  addEvent(deleteBuyList, 'click', function(event) {
    event.preventDefault();
    Ajax('cart', function() {
      document.getElementById('buylistframe').contentWindow.location.reload(true);
    }, null, 'Delete');
    event.stopPropagation();
  })

  ShowVarietires();
}