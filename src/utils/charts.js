import { GoogleCharts } from 'google-charts' // import from the correct path
import { fundsTransfer } from './server_access'

function GetData(balanceUser) {
 const monthlySummary = []

 if (balanceUser) {
  const count = balanceUser.length
  for (let index = 0; index < count; index += 1) {
   const element = balanceUser[index]
   const temp = [element.mongtn, element.balance] // 'mongtn' was a typo, it should be 'month'
   monthlySummary.push(temp)
  }
 }
 console.log(monthlySummary)
 return monthlySummary
}

function GetDataWithAccumulation(balanceUser) {
 const monthlySummary = []

 if (balanceUser) {
  const count = balanceUser.length
  for (let index = 0; index < count; index += 1) {
   const element = balanceUser[index]
   const temp = [element.month, element.in, element.out]
   monthlySummary.push(temp)
  }
 }

 return monthlySummary
}

function WithAccum(Summary) {
 const data = GoogleCharts.api.visualization.arrayToDataTable([
  ['Genre', 'Fantasy & Sci Fi', 'Romance'],
  ...Summary.filter((item) => item.length > 1),
 ])
 return data
}

function drawChart1(balanceUser, tag) {
 let options = null
 const chart = new GoogleCharts.api.visualization.ColumnChart(tag)
 const minValueUser = findMinMaxValue(balanceUser)[0]
 const maxValueUser = findMinMaxValue(balanceUser)[1]
 switch (tag.id) {
  case 'chart_account':
   options = {
   // width: 510,
    //heigth:180,
    xAxis: {


     1: {
      title: 'Y',
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
      'width': '80%',
      'height': '90%',
      
      backgroundColor: {
          stroke: '#000',
          strokeWidth: 1
      },
    },
    backgroundColor: {
     strokeWidth: 0,
    },

    isStacked: true,
    legend: 'none',
   }

   chart.draw(dataChart(GetData(balanceUser)), options)
   break

  case 'chart-history':
   options = {
    width: 1240,
    backgroundColor: {
     strokeWidth: 0,
    },
    legend: 'none',
   }
   chart.draw(dataChart(GetData(balanceUser)), options)
   break

  case 'chart-detail':
   options = {
    width: 1240,
    backgroundColor: {
     strokeWidth: 1,
    },
    legend: 'none',
    isStacked: true,
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
  drawChart1(balanceUser, document.getElementById('chart_account'))
 })
}

function getCurrentMonthYear() {
 const now = new Date()
 const currentMonth = now.getMonth() + 1 // getMonth returns 0-indexed month, so add 1
 const currentYear = now.getFullYear()

 return { month: currentMonth, year: currentYear }
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
  const temp =[]
  data.forEach(element => {
    temp.push(element.balance)
  });
  result[0]=Math.min.apply(null, temp)
  result[1]=Math.max.apply(null,temp)
  return result
}
