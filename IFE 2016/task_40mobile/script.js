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

    this.init();
}

Calendar.prototype.init = function() {
    var calendar = document.getElementById('calendar'),
        calendarShow = document.createElement('table'),
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
        calendarShow.className = 'calendarShow';

        this.clientWidth = document.documentElement.clientWidth;
        document.documentElement.style.fontSize = this.clientWidth / 10.8 + 'px';

        calendarTitle.appendChild(cTtr);
        calendar.appendChild(calendarTitle);
        calendar.appendChild(calendarShow);

        this.year = today.getFullYear();
        this.month = today.getMonth();
        this.date = today.getDate();
        //保留今天日期
        this.nowYear = today.getFullYear();
        this.nowMonth = today.getMonth();
        this.nowDate = today.getDate();

        this.calendar = calendar;
        this.calendarShow = calendarShow;
        this.calendarTitle = calendarTitle;

        this.render();
};

Calendar.prototype.render = function() {              

    var calendarShow = this.calendarShow,
        fragment = document.createDocumentFragment(),

        month = this.month,
        year = this.year,
        monthNext = month + 1;    
        //计算本月第一天是星期几 
    var firstDay = new Date(this.year, this.month, 1).getDay(),
        //计算上月空余几天
        lastDays = (new Date(year, month, 0)).getDate() - firstDay + 1,
        //计算当月总天数(最后一天)
        renderDays = (new Date(year, monthNext, 0)).getDate(),
        //需要加载的日历行数
        renderTr = Math.floor((renderDays + firstDay)/7) + 1;
        
    var count = 1,
        countLast = 1;

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
    this.changeColor();
};

Calendar.prototype.changeColor = function() {
    var color = randomColor(),

        calendarTitle = this.calendarTitle,
        calendarHead = document.getElementById('calendarHead');
        
    calendarTitle.style.backgroundColor = color;
    calendarHead.style.backgroundColor = color;
};

Calendar.prototype.bind = function() {

};

Calendar.prototype.slide = function(event) {
    var touch = event.targetTouches[0],
        self = this,        
        calendarShow = this.calendarShow,
        clientWidth = this.clientWidth,
        ways;

    var startPos = {
            x: touch.pageX,
            y: touch.pageY
        };

    var process = {
        touchMove: function(event) {
            var endPos = {
                x: touch.pageX - startPos.x,
                y: touch.pageY - startPos.y
            };
            //1表示右划，0表示左划
            ways = (endPos.y > 0) ? 1 : 0;
            //计算滑动距离
            event.preventDefault();
        },

        touchEnd: function(event) {
            var endPos = {
                x: touch.pageX - startPos.x,
                y: touch.pageY - startPos.y
            },
            absDistant = Math.abs(endPos.y);
            if ((ways === 1) && absDistant >= (clientWidth / 5)) {
                let newDate = new Date(self.year, self.month + 1, 1);
                //计算新的render时间
                self.year = newDate.getFullYear();
                self.month = newDate.getMonth();
                self.date = newDate.getDate();
            } else if ((ways === 0) && absDistant >= (clientWidth / 5)) {
                let newDate = new Date(self.year, self.month - 1, 1);
                //计算新的render时间
                self.year = newDate.getFullYear();
                self.month = newDate.getMonth();
                self.date = newDate.getDate();
                removeEvent(calendarShow, 'touchstart', self.slide);
                removeEvent(calendarShow, 'touchmove', process.touchmove);
                
            }
        }
    };
};

(function main() {    
    var calendar = new Calendar();
    console.log(calendar);
})();