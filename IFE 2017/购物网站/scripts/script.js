class Popup {

  constructor(config) {

    this.width = config.width || 400;
    this.height = config.height || 300;

    this.title = config.title || '';
    this.show = config.show || [];  
    this.button = config.button || [];

    this.node = document.getElementById('main');
    this.shadow = document.getElementById('shadow');

    this.popup;
    this.init();  
  }

  init() {
      let container = document.createElement('div'),
          titleWrap = document.createElement('div'),
          formWrap = document.createElement('div'),
          buttonWrap = document.createElement('div'),
          title = document.createElement('h4'),
          form = document.createElement('form'),
          br = document.createElement('br');

      container.style.width = this.width + 'px';
      container.style.height = this.height + 'px';

      title.innerHTML = this.title;
      titleWrap.appendChild(title);

      this.show.forEach(function(element, index) {
        let input = document.createElement('input'),
            label = document.createElement('label'),
            inputWrap = document.createElement('div');

        element === '密码'? input.setAttribute('type', 'password') : input.setAttribute('type', 'text');
        input.setAttribute('id', index);
        label.setAttribute('for', index);
        inputWrap.className = 'input-group';
        input.className = 'form-control';

        label.innerHTML = element + ':';

        inputWrap.appendChild(label);
        inputWrap.appendChild(input);
        formWrap.appendChild(inputWrap);
      })

      form.appendChild(formWrap);

      this.button.forEach(function(element, index) {
        let button = document.createElement('button');

        switch(element) {
          case '确认' : button.className = 'btn btn-primary btn-block';
                        button.setAttribute('type', 'submit');
                        break;
          case '取消' : button.className = 'btn btn-default btn-block';
                        button.setAttribute('type', 'reset');
                        break;
          default: break;
        };

        button.innerHTML = element;
        buttonWrap.appendChild(button);
      })

      container.appendChild(titleWrap);
      container.appendChild(formWrap);
      container.appendChild(br);
      container.appendChild(buttonWrap);

      this.popup = container;
      this.node.appendChild(this.popup);
  }
}

window.onload = function() {
  let login = document.getElementById('login'),
      regist = document.getElementById('regist');

  let loginPop = new Popup({
      width: 400,
      height: 300,
      title: '登录',
      show: ['用户名', '密码'],
      button: ['确认', '取消']

  let registPop = new Popup({
      width: 400,
      height: 300,
      title: '注册',
      show: ['用户名', '密码', '手机'],
      button: ['确认', '取消']
    });
  })
}