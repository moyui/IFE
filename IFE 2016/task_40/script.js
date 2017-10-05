function Calendar(config) {
    this.days = ['日', '一', '二', '三', '四', '五', '六'];
    this.date;
    this.month;
    this.year;
    this.day;

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
        this.day = today.getDay();

        this.calendar = calendar;
        this.calendarShow = calendarShow;
        this.calendarTitle = calendarTitle;
};

Calendar.prototype.render = function() {
    var calendarShow = this.calendarShow,
        fragment = document.createDocumentFragment(),

        date = this.date,
        month = this.month,
        year = this.year,
        day = this.day,
        monthNext = this.month + 1,
        //计算当月总天数(最后一天)
        renderDays = (new Date(year, monthNext, 0)).getDate(),
        //需要加载的日历行数
        renderTr = (renderDays + day)/7 + 1;
        console.log(renderTr);

};

(function main() {
    var calendar = new Calendar({

    });
});