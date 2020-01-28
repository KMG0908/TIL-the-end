import React from "react";

import PieChart from 'react-highcharts';

const config = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Tag Frequency'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true,
      slicedOffset: 0,
      point: {
        events: {
          legendItemClick: function () {
            return false;
          }
        }
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
        name: 'Chrome',
        y: 61.41,
        sliced: true,
        selected: true
      }, {
        name: 'Internet Explorer',
        y: 11.84
      }, {
        name: 'Firefox',
        y: 10.85
      }, {
        name: 'Edge',
        y: 4.67
      }, {
        name: 'Safari',
        y: 4.18
      }, {
        name: 'Other',
        y: 7.05
    }],
  }],
  credits: {
    enabled: false
  }
}

class TagFrequencyChart extends React.Component{
  render(){
    return(
      <PieChart config={config}></PieChart>
    )
  }
}

export default TagFrequencyChart;