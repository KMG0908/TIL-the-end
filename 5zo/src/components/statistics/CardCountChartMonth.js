import React from "react";

import LineChart from 'react-highcharts';
import Highcharts from 'highcharts';

Highcharts.setOptions({
  lang: {
    shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  }
});

const dates = ['2019-12-04', '2019-12-05', '2019-12-06', '2019-12-12', '2019-12-23', '2019-12-27', '2019-11-28']
const dailyTask = [2, 2, 5, 1, 5, 4, 3]
const year = '2019';
const month = '12';

const overviewSeries = []

let days = new Array(32 - new Date(Number(year), Number(month) - 1, 32).getDate())
for(let i=0; i<days.length; i++){
  let time = Math.floor(new Date(Number(year), Number(month) - 1, i + 2).getTime() / 86400000) * 86400000
  days[i] = [time, 0];
}

for(let i=0; i<dates.length; i++){
  let date = dates[i].split('-')
  days[Number(date[2]) - 1][1] = dailyTask[i];
}

for(let i=0; i<days.length; i++){
  overviewSeries.push({
    x: days[i][0],
    y: days[i][1]
  })
}

const config = {
  chart:{
    type: 'line'
  },
  title: {
      text: year + '년 ' + month + '월'
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats:{
      day: '%e'
    },
    tickInterval: 24 * 3600 * 1000
  },
  yAxis: {
    allowDecimals: false,
    title: {
        text: '태스크 수'
    }
  },
  legend: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    series: {
      name: '태스크 수',
        dataLabels: {
            enabled:false
        },
        shadow: false
    },
    line:{
      size:'10%'
    }
  },
  series: [{
      name: '태스크 수',
      //colorByPoint: true,
      data: overviewSeries
  }],
  tooltip: {
    formatter: function(){
      let weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
      let date = new Date(this.x);
      return "<text data-z-index='1' style='font-size:12px;color:#333333;cursor:default;fill:#333333;'>"
        + "<span style='font-size: 10px'>" + date.getDate() + "일, " + weekdays[date.getDay()] + "</span><br/>"
        + "<span style='fill:#7cb5ec'>● </span><span>" + this.series.userOptions.name + ": </span>"
        + "<span style='font-weight:bold; color:black;'>" + this.y + "</span></text>"
    }
  }
};

class CardCountChartMonth extends React.Component{
	render() {
    return (
      <LineChart config={config}></LineChart>
    );
	}
}

export default CardCountChartMonth;