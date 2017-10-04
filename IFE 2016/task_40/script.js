function Calendar(config) {
    this.days = ['日', '一', '二', '三', '四', '五', '六'];
    this.date;
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

        this.calendar = calendar;
        this.calendarShow = calendarShow;
        this.calendarTitle = calendarTitle;
};

Calendar.prototype.render = function() {
    var calendarShow = this.calendarShow,
        fragment = document.createDocumentFragment();

};

(function main() {
    var calendar = new Calendar({

    });
});