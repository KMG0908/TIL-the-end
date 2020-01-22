import React from "react";

import LineChart from 'react-highcharts';
import Highcharts from 'highcharts';
import Drilldown from 'highcharts-drilldown';
Drilldown(Highcharts);

Highcharts.setOptions({
  lang: {
      months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      drillUpText: '◁ '
  }
});

const year = ['2018', '2019', '2020']
const monthDrill = new Array(year.length);

const dates = ['2019-02-04', '2019-02-26', '2019-05-02', '2019-08-05', '2020-01-05', '2020-01-06', '2020-01-07']
const dailyTask = [2, 2, 5, 1, 5, 4, 3]

for(var i=0; i<year.length; i++){
  monthDrill[i] = new Array(12);
  for(var j=0; j<12; j++){
    monthDrill[i][j] = new Array(32 - new Date(Number(year[i]), j, 32).getDate());
    for(var k=0; k<monthDrill[i][j].length; k++){
      var time = Math.floor(new Date(Number(year[i]), j, k+2).getTime() / 86400000) * 86400000
      monthDrill[i][j][k] = [time, 0];
    }
  }
}

var firstYear = year[0];

for(i=0; i<dates.length; i++){
  var date = dates[i].split('-');
  monthDrill[Number(date[0]) - firstYear][Number(date[1]) - 1][Number(date[2]) - 1][1] = dailyTask[i];
}

const overviewSeries = []
const drillDownSeries = [];

for(i=0; i<year.length; i++){
  var yearTask = 0;
  var data = {
    id: 'year' + year[i],
    data: [],
    xAxis: 2
  }

  for(j=0; j<12; j++){
    var monthTask = 0;
    for(k=0; k<monthDrill[i][j].length; k++){
      monthTask += monthDrill[i][j][k][1];  
    }

    yearTask += monthTask;

    if(monthTask > 0){
      data['data'].push({
        x: monthDrill[i][j][0][0],
        y: monthTask,
        drilldown: 'month' + year[i] + '' + (j + 1)
      })

      drillDownSeries.push({
        id: 'month' + year[i] + '' + (j + 1),
        data: monthDrill[i][j],
        xAxis: 3
      })
    }
    else{
      data['data'].push({
        x: monthDrill[i][j][0][0],
        y: monthTask
      })
    }
  }

  if(yearTask > 0){
    drillDownSeries.push(data);
    overviewSeries.push({
      x: Math.floor(new Date(Number(year[i]) * 1, 0, 2).getTime() / 86400000) * 86400000,
      y: yearTask,
      drilldown: 'year' + year[i]
    })
  }
  else{
    overviewSeries.push({
      x: Math.floor(new Date(Number(year[i]) * 1, 0, 2).getTime() / 86400000) * 86400000,
      y: yearTask
    })
  }
}

const config = {
  chart:{
    type: 'line',
    events:{
      load:function(event){
        var num = 0;
        var value = 0;
        var len = year.length;
        for(var i=0; i<len; i++){
          if(value < this.series[0].data[i].y){
            value = this.series[0].data[i].y;
            num = i;
          }
        }
        this.series[0].data[num].doDrilldown();
      }
    }
  },
  title: {
      text: 'Task'
  },
  xAxis: [
    {
      id: 1,
      type: 'datetime',
      dateTimeLabelFormats:{
        day: '%b %e, %Y'
      }
    },
    {
      id: 3,
      type: 'datetime',
      labels: 
      {
        format: '{value:%e}'
      },
      tickInterval: 24 * 3600 * 1000
    },
    {
      id: 2,
      type: 'datetime',
      labels: 
      {
        format: '{value:%b}'
      }
    },
  ],
  yAxis: {
    allowDecimals: false,
    title: {
        text: '태스크 수'
    }
  },
  drilldown: {
    series: drillDownSeries
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
  }]
};

class CardCountChartSelect extends React.Component{
	render() {
    return (
      <LineChart config={config}></LineChart>
    );
	}
}

export default CardCountChartSelect;