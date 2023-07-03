import { GoogleCharts } from 'google-charts' // import from the correct path
import { fundsTransfer } from './server_access'

function GetData(balanceUser) {
 const monthlySummary = []

 if (balanceUser) {
  const count = balanceUser.length
  for (let index = 0; index < count; index += 1) {
   const element = balanceUser[index]
   const temp = [element.mongtn + '.' + element.year, element.balance]
   monthlySummary.push(temp)
  }
 }

 return monthlySummary
}

function GetDataWithAccumulation(balanceUser) {
 const monthlySummary = []

 if (balanceUser) {
  const count = balanceUser.length
  for (let index = 0; index < count; index += 1) {
   const element = balanceUser[index]
   const temp = [element.mongtn + '.' + element.year, element.in, element.out]
   monthlySummary.push(temp)
  }
 }

 return monthlySummary
}

function WithAccum(Summary) {
 const data = GoogleCharts.api.visualization.arrayToDataTable([
  ['date', 'out', 'in'],
  ...Summary.filter((item) => item.length > 1),
 ])
 return data
}

function drawChart1(balanceUser, tag) {
 let options = null
 const chart = new GoogleCharts.api.visualization.ColumnChart(tag)
 const minValueUser = findMinMaxValue(balanceUser)[0]
 const maxValueUser = findMinMaxValue(balanceUser)[1]
 options = {
  Axis: {
   0: {},
   1: {
    minValue: 0,
    maxValue: maxValueUser,
   },
  },
  series: {
   0: {
    targetAxisIndex: 1,
   },
   1: {
    targetAxisIndex: 0,
   },
  },
  vAxis: {
   format: '#',
   gridlines: {
    color: '#fff',
    count: 3,
   },
  },
  chartArea: {
   width: '90%',
   height: '85%',
   left: 0,
   top: '2px',
   backgroundColor: {
    stroke: '#000',
    strokeWidth: 1,
   },
  },
  backgroundColor: {
   strokeWidth: 0,
  },
  isStacked: true,
  legend: 'none',
 }
 switch (tag.id) {
  case 'chart_account':
   chart.draw(dataChart(GetData(balanceUser)), options)
   break

  case 'chart-history':
   options = {
    width: 1240,
    height: 400,
    vAxis: {
     format: '#',
     gridlines: {
      color: '#fff',
      count: 3,
     },
    },
    series: {
     0: {
      targetAxisIndex: 1,
     },
     1: {
      targetAxisIndex: 0,
     },
    },
    chartArea: {
     width: '90%',
     height: '85%',
     left: 0,
     top: '2px',
     backgroundColor: {
      stroke: '#000',
      strokeWidth: 1,
     },
    },
    legend: { position: 'none' },
   }
   chart.draw(dataChart(GetData(balanceUser)), options)
   break

  case 'chart-detail':
   options = {
    width: 1240,
    height: 400,
    vAxis: {
     minValue: 0,
     format: '#',
     gridlines: {
      color: '#fff',
      count: 3,
     },
    },
    series: {
     0: {
      targetAxisIndex: 1,
     },
     1: {
      targetAxisIndex: 0,
     },
    },
    chartArea: {
     width: '90%',
     height: '85%',
     left: 0,
     top: '2px',
     backgroundColor: {
      stroke: '#000',
      strokeWidth: 1,
     },
    },
    legend: { position: 'none' },
    in:'black',
  
    sStacked: 'absolute',

   }
   chart.draw(WithAccum(GetDataWithAccumulation(balanceUser)), options)
   break

  default:
   console.log('not chart')
   break
 }
}

export function drawChart(balanceUser, tag) {
 GoogleCharts.load(() => {
  drawChart1(balanceUser, tag)
 })
}

function dataChart(monthlySummary) {
 const data = new GoogleCharts.api.visualization.DataTable()
 data.addColumn('string', 'Month')
 data.addColumn('number', 'Balance')
 data.addRows(monthlySummary)
 return data
}

function findMinMaxValue(data) {
 const result = new Array(2)
 const temp = []
 data.forEach((element) => {
  temp.push(element.balance)
 })
 result[0] = Math.min.apply(null, temp)
 result[1] = Math.max.apply(null, temp)
 return result
}
