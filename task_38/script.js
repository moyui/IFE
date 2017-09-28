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
    for (let i = 0 ; i < this.rowsLength; i++) {
        let tr = document.createElement('tr');
        tableShow.appendChild(tr);
    }   
    tableShow.className = 'tableShow';

    table.appendChild(tableShow);
    this.tableShow = tableShow;
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
            btnin.className = 'inButton';
            btnde.className = 'deButton';
            th.appendChild(btnin);
            th.appendChild(btnde);
        }
        tr[0].appendChild(th);
    });

    data['content'].forEach(function(dataArray, index) {
        dataArray.forEach(function(text) {
            var td = document.createElement('td');
            td.innerHTML = text;
            tr[index + 1].appendChild(td);
        });
    });
};

function bubbleSort(array) {
    var temp;
    for (let i = 0; i < array.length; i++) {
        for (let j = i; j < array.length; j++) {
            if (array[j] > array[j + 1]) {
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}

(function main() {
    var table1 = new Table({
        data: {
            title: ['姓名', '数学', '语文', '英语'],
            content: [['A', 80, 85, 90],['B', 90, 70, 80],['C', 100, 90, 60],['D', 70, 85, 100]],
        }
    });
})();