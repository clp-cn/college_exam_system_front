import * as echarts from 'echarts'

const dataArr = [{
  value: 322,
  name: '第一产业'
}]
const color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
  offset: 0,
  color: '#2180ee' // 0% 处的颜色
},
{
  offset: 0.3,
  color: '#25bdc7'
},
{
  offset: 1,
  color: '#29e8ad' // 100% 处的颜色
}
])
const colorSet = [
  [0.86, color],
  [1, '#15337C']
]
const rich = {
  white: {
    fontSize: '16px',
    color: '#ffffff',
    fontWeight: '500',
    padding: [5, 0, 0, 10]
  },
  bule: {
    fontSize: '36px',
    fontFamily: 'DINBold',
    color: '#21f8ff',
    fontWeight: '700'
    // padding: [20, 0, 0, 0],
  },
  radius: {
    // width: 350,
    // height: 80,
      fontSize: '24px',
      color: '#21f8ff',
      textAlign: 'center',
      padding: [10, 0, 20, 0]
    }
  }
  const option = {
    backgroundColor: '#000',
    series: [
      {
        type: 'gauge',
        radius: '82%',
        center: ['50%', '58%'], // 整体的位置设置
        startAngle: '225',
        endAngle: '-45',
        pointer: {
          show: false
        },
        detail: {
          formatter: function(value) {
            var num = Math.round(value)
            return '{radius|第一产业}\n' + '{bule|' + num + '}{white|家}'
          },
          rich: rich,
          'offsetCenter': ['0%', '0%']
        },
        data: dataArr,
        title: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: colorSet,
            width: 80,
            // shadowBlur: 15,
            // shadowColor: '#B0C4DE',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          length: 25,
          lineStyle: {
            color: '#00377a',
            width: 2,
            type: 'solid'
          }
        },
        axisLabel: {
          show: false
        }
      },
      {
        name: 'xxx', // 刻度背景
        type: 'gauge',
        z: 2,
        radius: '55%',
        startAngle: '225',
        endAngle: '-45',
        center: ['50%', '58%'], // 整体的位置设置
        axisLine: { // 坐标轴线
          lineStyle: { // 属性lineStyle控制线条样式
            color: [
              [1, '#018DFF']
            ],
            width: 2,
            opacity: 1 // 刻度背景宽度
          }
        },
        splitLine: {
          show: false
        },
        // data: [{
        //     show: false,
        //     value: '80'
        // }], //作用不清楚
        axisLabel: {
          show: false
        },
        pointer: {
          show: false
        },
        axisTick: {
          show: false
        },
        detail: {
          show: 0
        }
      },
      { // 内圆
        type: 'pie',
        radius: '55%',
        center: ['50%', '58%'], // 整体的位置设置
        z: 1,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [{
            offset: 0,
            color: '#4978EC'
          },
          {
            offset: 0.5,
            color: '#1E2B57'
          },
          {
            offset: 1,
            color: '#141F3D'
          }
          ], false),
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        label: {
          show: false
        },
        tooltip: {
          show: false
        },
        data: [100]
      }
    ]
  }


