function Table(config) {
     this.data = config.data || {'title': ['空表'], 'content': ['无数据']};
     this.rowsLength = this.data['content'] + 1;
     this.colsLength = this.data['title'];

     this.tableShow;        
     this.init(); 
};

Table.prototype.init = function() {
    var table = document.getElementById('table'),
        tableShow = document.createElement('table');

    for (let i = 0 ; i < this.rowsLength; i++) {
        let tr = document.createElement('tr');
        tableShow.appendChild(tr);
    }   
    table.appendChild(tableShow);
    this.tableshow = tableShow;

    this.render();
} 

Table.prototype.render = function() {
    var data = this.data,
        tableShow = this.tableShow,
        tr = tableShow.querySelectorAll('tr');

    data['title'].forEach(function(title, index) {
        var th = document.createElement('th');
        th.innerHTML = title;
        if (index > 0) {
            var btnin = document.createElement('button'),
                btnde = document.createElement('button');
            btnin.className = 'increaseButton';
            btnde.className = 'decreaseButton';
            th.appendChild(btnin);
            th.appendChild(btnde);
        }
        tr[0].apppendChild(th);
    });

    data['content'].forEach(function(dataArray, index) {
        dataArray.forEach(function(text) {
            var td = document.createElement('td');
            td.innerHTML = text;
            tr[index + 1].appendChild('td');
        });
    });
}