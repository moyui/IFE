function Calendar(config) {
    this.days = ['日', '一', '二', '三', '四', '五', '六'];
    this.clientWidth;

    this.month;
    this.year;
    this.date;

    this.nowYear;
    this.nowMonth;
    this.nowDate;

    this.calendar;
    this.calendarShow;
    this.calendarTitle;

    this.color;

    this.init();
}

Calendar.prototype.init = function() {
    var calendar = document.getElementById('calendar'),
        calendarTitle = document.createElement('table'),

        today = new Date(),

        cTtr = document.createElement('tr');
        this.days.forEach(function(content) {
            let cTth = document.createElement('th');
            cTth.innerHTML = content;
            cTtr.appendChild(cTth);
        });

        calendar.className = 'calendar';
        calendarTitle.className = 'calendarTitle';

        this.clientWidth = document.documentElement.clientWidth;
        document.documentElement.style.fontSize = this.clientWidth / 10.8 + 'px';

        calendarTitle.appendChild(cTtr);
        calendar.appendChild(calendarTitle);

        this.year = today.getFullYear();
        this.month = today.getMonth();
        this.date = today.getDate();
        //保留今天日期
        this.nowYear = today.getFullYear();
        this.nowMonth = today.getMonth();
        this.nowDate = today.getDate();

        this.calendar = calendar;
        this.calendarTitle = calendarTitle;

        this.renderHead();
        this.renderShow();
};

Calendar.prototype.renderHead = function() {
    var month = document.getElementById('headMonth'),
        year = document.getElementById('headYear'),
        date = document.getElementById('headDate');
 
    month.innerHTML = (this.month + 1) + '月';
    year.innerHTML = this.year + '年';
    //和小米日历一致
    if ((this.nowMonth === this.month) && (this.nowYear === this.year)) {
        date.innerHTML = this.nowDate + '日';
    } else {
        date.innerHTML = '';
    }
};

Calendar.prototype.renderShow = function() {           
    var calendar = this.calendar,
        fragment = document.createDocumentFragment(),
        //创建渲染节点
        calendarShow = document.createElement('table');

    var month = this.month,
        year = this.year,
        monthNext = month + 1, 
        nowDate = this.nowDate, 
        nowMonth = this.nowMonth,
        nowYear = this.nowYear,
        //计算本月第一天是星期几 
        firstDay = new Date(this.year, this.month, 1).getDay(),
        //计算上月空余几天
        lastDays = (new Date(year, month, 0)).getDate() - firstDay + 1,
        //计算当月总天数(最后一天)
        renderDays = (new Date(year, monthNext, 0)).getDate(),
        //需要加载的日历行数
        renderTr = Math.ceil((renderDays + firstDay)/7);

    var count = 1,
        countLast = 1;

    calendarShow.className = 'calendarShow';
    calendar.appendChild(calendarShow);
    this.calendarShow = calendarShow;
    this.changeColor();

    for (let i = 0; i < renderTr; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            let td = document.createElement('td');
            if (i === 0 && firstDay !== 0) {
                td.innerHTML = lastDays;
                td.className = 'greyName';
                firstDay--;
                lastDays++; 
            } else if (count <= renderDays) {
                td.innerHTML = count;
                if (count === nowDate && nowMonth === month && nowYear === year) {
                    td.style.color = this.color;
                }
                td.className = 'normalName';
                count++;
            } else {
                td.innerHTML = countLast;
                td.className = 'greyName';
                countLast++;
            }
            tr.appendChild(td);
        };
        fragment.appendChild(tr);
    };
    calendarShow.appendChild(fragment);    
    this.slide();
};

Calendar.prototype.changeColor = function() {
    var color = randomColor(),

        calendarTitle = this.calendarTitle,
        calendarHead = document.getElementById('calendarHead');

    calendarTitle.style.backgroundColor = color;
    calendarHead.style.backgroundColor = color;
    this.color = color;
};

Calendar.prototype.slide = function(event) {
    var self = this,        
        calendarShow = this.calendarShow,
        clientWidth = this.clientWidth,
    //私有变量
        ways,
        startPos,
        endPos,
        absDistant;

    var process = {
        touchStart: function(event) {
            var touch = event.targetTouches[0];
            startPos = {
                x: touch.pageX,
                y: touch.pageY
            };
            addEvent(calendarShow, 'touchmove', process.touchMove);
        },

        touchMove: function(event) {
            var touch = event.targetTouches[0];
            //解绑上一步事件
            removeEvent(calendarShow, 'touchstart', process.touchStart);
            //将默认操作取消
            event.preventDefault();
            //计算滑动距离
            endPos = {
                x: touch.pageX - startPos.x,
                y: touch.pageY - startPos.y
            };
            addEvent(calendarShow, 'touchend', process.touchEnd);
        },

        touchEnd: function(event) {
            //解绑上一步事件
            removeEvent(calendarShow, 'touchmove', process.touchMove);
            //1表示右划，0表示左划
            ways = (endPos.x > 0) ? 1 : 0;
            //计算滑动距离的绝对值
            absDistant = Math.abs(endPos.x);
            //判断左右滑动并且达到滑动距离
            if ((ways === 1) && absDistant >= (clientWidth / 5)) {
                let newDate = new Date(self.year, self.month - 1, 1);
                //计算新的render时间
                self.year = newDate.getFullYear();
                self.month = newDate.getMonth();
                self.date = newDate.getDate();
            } else if ((ways === 0) && absDistant >= (clientWidth / 5)) {
                let newDate = new Date(self.year, self.month + 1, 1);
                //计算新的render时间
                self.year = newDate.getFullYear();
                self.month = newDate.getMonth();
                self.date = newDate.getDate();

            }                
            //取消绑定事件
            removeEvent(calendarShow, 'touchend', process.touchEnd);
            //重新render
            calendarShow.parentNode.removeChild(calendarShow);
            self.renderHead();
            self.renderShow();
        }
    }; 
    addEvent(calendarShow, 'touchstart', process.touchStart);
};

(function main() {    
    var calendar = new Calendar();
})();