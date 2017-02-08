/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
function chooseColor (indexNumber) {
  if (indexNumber <= 50) {
    return "#7FFFD4";
  } else if (indexNumber <= 100) {
    return "#87CEFA";
  } else if (indexNumber <= 200) {
    return "#EEEE00";
  } else if (indexNumber <= 400) {
    return "#FF0000";
  } else {
    return "#000000";
  }
}

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

var chartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
var citySelect = document.getElementById("city-select").getElementsByTagName("option");
var radio = document.getElementById("form-gra-time").getElementsByTagName("input");
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
  var timeFormat = (function(nowGraTime) {
      if (nowGraTime == "week") {
          return ["weekAqi", "6%"];
      } else if (nowGraTime == "month") {
          return ["monthAqi", "30%"];
      } else {
          return ["dayAqi", "1.01%"];
      }
  })(pageState.nowGraTime);
  timeFormat[0] = timeFormat[0].replace(/"/g, "");
  
  chartWrap.innerHTML = "";

  for (var i in chartData[timeFormat[0]]) {
    chartWrap.innerHTML += "<div title='" + i + "'\nvalue='" + chartData[timeFormat[0]][i] + "'></div>";
  } 
  // "'style='width:" + timeFormat[1] +
  setTimeout(function(){
      var chartArr = chartWrap.querySelectorAll("div");
      var j = 0;
      for(var i in chartData[timeFormat[0]]){
        if (j < chartArr.length) {
          chartArr[j].style.transition = "";
          chartArr[j].style.width = timeFormat[1] + "";
          chartArr[j].style.height= chartData[timeFormat[0]][i] + "px";
          chartArr[j].style.backgroundColor = chooseColor(chartData[timeFormat[0]][i]);
          chartArr[j].style.bottom = 0; 
          chartArr[j].style.float = "left";       
          j++;
        }
      }
  },500);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
    // 设置对应数据
      pageState.nowGraTime = radio[i].value;
      console.log(pageState.nowGraTime);
    }
  // 调用图表渲染函数  
  initAqiChartData();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var city = this.value;
    if (city !== pageState.nowSelectCity) {
    // 设置对应数据 
      pageState.nowSelectCity = city;
      console.log(pageState.nowSelectCity);
  }
  // 调用图表渲染函数 
  initAqiChartData();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  for (var i = 0; i < radio.length; i++) {
    radio[i].addEventListener("change", graTimeChange, false);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  var citySelectParent = document.getElementById("city-select");
  citySelectParent.remove(citySelectParent.firstElementChild);
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  for (var city in aqiSourceData) {
    var cityProcess = city.split("\"")[0];
    var addCity = document.createElement("option");
    addCity.innerHTML = cityProcess;
    addCity.value = '\"' + cityProcess + '\"';
    citySelectParent.appendChild(addCity); 
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelectParent.addEventListener("change", citySelectChange, false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var processData = aqiSourceData[pageState.nowSelectCity];
  chartData.weekAqi = {};
  chartData.monthAqi = {};
  chartData.dayAqi = {};
  // 处理好的数据存到 chartData 中
  chartData.dayAqi = processData;
  (function() {
    var cont = 0;
    var sum = 0;
    if (pageState.nowGraTime == "week") {
      for (var item in processData) {
        sum += processData[item];
        cont++;
        if (cont % 7 === 0) {
          chartData.weekAqi['第' + parseInt(cont / 7) + '周'] = parseInt(sum / 7);
          sum = 0;
        }
      }
      if (cont % 7) {
        chartData.weekAqi['第' + (parseInt(cont / 7) + 1) + '周'] = parseInt(sum / (cont % 7));
      }
    }
  })();
  (function() {
      var mon = 1;
      var d = new Date(2016, mon, 0);
      var cont = 0;
      var sum = 0;
      var arr = [];
      if (pageState.nowGraTime == "month") {
        for (var item in processData) {
          sum += processData[item];
          cont++;
          if (cont == d.getDate()) {
            chartData.monthAqi['第' + mon + '月'] = parseInt(sum / d.getDate());
            cont = 0;
            sum = 0;
            mon++;
            d = new Date(2016, mon, 0);
            }
        }
      }
   })();
   renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();
