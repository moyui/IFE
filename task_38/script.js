function Table(config) {
    this.data = config.data || {'title': ['空表'], 'content': ['无数据']};
    this.rowsLength = this.data['content'].length + 1;
    this.colsLength = this.data['title'].length;

    this.tableShow;        
    this.init(); 
};

Table.prototype.init = function() {
    var table = document.getElementById('table'),
        tableShow = document.createElement('table');

    tableShow.className = 'tableShow';
    table.appendChild(tableShow);
    this.tableShow = tableShow;

    for (let i = 0 ; i < this.rowsLength; i++) {
        let tr = document.createElement('tr');
        tableShow.appendChild(tr);
    }   

    var data = this.data,
        tr = tableShow.querySelectorAll('tr');

    data['title'].forEach(function(title, index) {
        var th = document.createElement('th');
        th.innerHTML = title;
        if (index > 0) {
            var btnin = document.createElement('button'),
                btnde = document.createElement('button');
            btnin.className = 'inButton';
            btnde.className = 'deButton';
            th.appendChild(btnin);
            th.appendChild(btnde);
        }
        tr[0].appendChild(th);
    });

    data['content'].forEach(function(dataArray, index) {
        dataArray.forEach(function() {
            var td = document.createElement('td');
            tr[index + 1].appendChild(td);
        });
    });

    this.render();
    this.sort();
} 

Table.prototype.render = function() {
    var data = this.data,
        tr = this.tableShow.querySelectorAll('tr');

    data['content'].forEach(function(dataArray, index) {
        var td = tr[index + 1].querySelectorAll('td');
        dataArray.forEach(function(innerArray, innerIndex) {
            td[innerIndex].innerHTML = innerArray;
        });
    });
};

Table.prototype.sort = function() {
    var content = this.data.content,
        tableShow = this.tableShow,
        btnin = tableShow.querySelectorAll('.inButton'),
        btnout = tableShow.querySelectorAll('.deButton'),
        self = this;

    btnin.forEach(function(node, index) {
        addEvent(btnin[index], 'click', function() {
            content.sort(function(d1, d2) {
                return d1[index + 1] - d2[index + 1]; 
            });
        self.render();
        });
    });

    btnout.forEach(function(node, index) {
        addEvent(btnout[index], 'click', function() {
            content.sort(function(d1, d2) {
                return d2[index + 1] - d1[index + 1];
            });
        self.render();
        });
    });
};



(function main() {
    var table1 = new Table({
        data: {
            title: ['姓名', '数学', '语文', '英语'],
            content: [['A', 80, 85, 90],['B', 90, 70, 80],['C', 100, 90, 60],['D', 70, 85, 100]],
        }
    });
})();