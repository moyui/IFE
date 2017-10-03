function Calendar(config) {
    this.days = ['日', '一', '二', '三', '四', '五', '六'];
    this.mouth;
    this.year;

    this.calendar;
    this.calendarShow;
    this.calendarTitle;

    this.init();
}

Calendar.prototype.init = function() {
    var calendar = document.getElementById('calendar'),
        calendarShow = document.createElement('table'),
        calendarTitle = document.createElement('table'),

        cTtr = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            let cTth = document.createElement('th');
            cTtr.appendChild(cTth);
        }

        calendarTitle.className = 'calendarTitle';
        calendarShow.className = 'calendarShow';

        calendarTitle.appendChild(cTtr);
        calendar.appendChild(calendarTitle);
        calendar.appendChild(calendarShow);

        this.calendar = calendar;
        this.calendarShow = calendarShow;
        this.calendarTitle = calendarTitle;
};

Calendar.prototype.render = function() {
    var calendarShow = this.calendarShow;
};

(function main() {
    var calendar = new Calendar({

    });
});