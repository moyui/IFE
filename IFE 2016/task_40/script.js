function Calendar(config) {
    this.days = ['日', '一', '二', '三', '四', '五', '六'];

    this.month;
    this.year;
    this.date;
    this.firstDay;

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

        calendarTitle.className = 'calendarTitle';
        calendarShow.className = 'calendarShow';

        calendarTitle.appendChild(cTtr);
        calendar.appendChild(calendarTitle);
        calendar.appendChild(calendarShow);

        this.year = today.getFullYear();
        this.month = today.getMonth();
        this.date = today.getDate();
        //计算本月第一天是星期几
        this.firstDay = new Date(this.year, this.month, 1).getDay();

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

        firstDay = this.firstDay,
        monthNext = month + 1,
        //计算上月空余几天
        lastDays = (new Date(year, month, 0)).getDate() - firstDay + 1,
        //计算当月总天数(最后一天)
        renderDays = (new Date(year, monthNext, 0)).getDate(),
        //需要加载的日历行数
        renderTr = Math.floor((renderDays + firstDay)/7) + 1;
        
    let count = 1,
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
};

Calendar.prototype.bind = function() {
    
};

(function main() {
    var calendar = new Calendar();
})();