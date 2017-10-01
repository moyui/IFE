function Table(config) {
    this.data = config.data || {'title': ['空表'], 'content': ['无数据']};
    this.rowsLength = this.data['content'].length + 1;
    this.colsLength = this.data['title'].length;

    this.tableHead; 
    this.tableShow;
       
    this.init(); 
};

Table.prototype.init = function() {
    var table = document.getElementById('table'),
        tableHead = document.createElement('table'),
        tableShow = document.createElement('table'),
        tr = document.createElement('tr'),
        data = this.data;
    
    tableHead.className = 'tableHead'
    tableShow.className = 'tableShow';
    table.appendChild(tableHead);
    table.appendChild(tableShow);
    this.tableHead = tableHead;
    this.tableShow = tableShow;

    tableHead.appendChild(tr);
    for (let i = 0 ; i < this.rowsLength - 1; i++) {
        let tr = document.createElement('tr');
        tableShow.appendChild(tr);
    }   

    var trArray = table.querySelectorAll('tr');
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
        trArray[0].appendChild(th);
    });

    data['content'].forEach(function(dataArray, index) {
        dataArray.forEach(function() {
            var td = document.createElement('td');
            trArray[index + 1].appendChild(td);
        });
    });

    this.render();
    this.sort();
} 

Table.prototype.sort = function() {
    var content = this.data.content,
        tableHead = this.tableHead,
        btnin = tableHead.querySelectorAll('.inButton'),
        btnout = tableHead.querySelectorAll('.deButton'),
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

Table.prototype.render = function() {
    var data = this.data,
        tr = this.tableShow.querySelectorAll('tr');

    data['content'].forEach(function(dataArray, index) {
        var td = tr[index].querySelectorAll('td');
        dataArray.forEach(function(innerArray, innerIndex) {
            td[innerIndex].innerHTML = innerArray;
        });
    });
};

(function main() {
    var table1 = new Table({
        data: {
            title: ['姓名', '数学', '语文', '英语'],
            content: [['A', 80, 85, 90],['B', 90, 70, 80],['C', 100, 90, 60],['D', 70, 85, 100],
                        ['E', 80, 60, 90],['F', 75, 70, 80],['G', 95, 90, 70],['H', 85, 60, 90],
                        ['I', 70, 90, 85],['J', 90, 60, 95],['K', 70, 95, 70],['L', 85, 90, 85],
                        ['M', 75, 70, 80],['N', 100, 90, 60],['O', 70, 85, 100],
                    ],
        }
    });
})();