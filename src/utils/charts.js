import { GoogleCharts } from './googleCharts.esm'


GoogleCharts.load(drawChart)

const optionsSimple = {
 width: 510,
 backgroundColor: {
  strokeWidth: 1,
 },
 legend: 'none',
}

const optionsHistory = {
 width: 1240,
 backgroundColor: {
  strokeWidth: 1,
 },
 legend: 'none',
}

const optionsDetail = {
 width: 1240,
 backgroundColor: {
  strokeWidth: 1,
 },
 legend: 'none',
 bar: { groupWidth: '75%' },
 isStacked: true,
}

export function drawChart(balanceUser, tag) {
 let options = null
 const chart = new GoogleCharts.api.visualization.ColumnChart(tag)
 switch (tag.id) {
  case 'chart':
   options = optionsSimple
   chart.draw(dataChart(GetData(balanceUser)), options)
   break

  case 'chart-history':
   options = optionsHistory

   chart.draw(dataChart(GetData(balanceUser)), options)
   break
  case 'chart-detail':
   options = optionsDetail

   chart.draw(WithAccum(GetDataWithAccumulation(balanceUser)), options)
   break

  default:
   console.log('not chart')
   break
 }
}

function GetData(balanceUser) {
 const monthlySummary = []

 if (balanceUser) {
  const count = balanceUser.length
  for (let index = 0; index < count; index++) {
   const element = balanceUser[index]
   let temp = [element.mongtn, element.balance]
   monthlySummary.push(temp)
  }
 }

 return monthlySummary
}

function GetDataWithAccumulation(balanceUser) {
 const monthlySummary = []

 if (balanceUser) {
  const count = balanceUser.length
  for (let index = 0; index < count; index++) {
   const element = balanceUser[index]
   let temp = [element.mongtn, element.in, element.out]
   monthlySummary.push(temp)
  }
 }
 return monthlySummary
}

function dataChart(monthlySummary) {
 var data = new google.visualization.DataTable()
 data.addColumn('string', 'Mongth')
 data.addColumn('number', 'Balance')

 data.addRows(monthlySummary)
 return data
}

function WithAccum(Summary) {
 var data = google.visualization.arrayToDataTable([
  ['Genre', 'Fantasy & Sci Fi', 'Romance'],
  ...Summary,
 ])
 return data
}


