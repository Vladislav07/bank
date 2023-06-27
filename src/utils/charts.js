import { GoogleCharts } from 'google-charts'; // import from the correct path



function GetData(balanceUser) {
  const monthlySummary = [];

  if (balanceUser) {
    const count = balanceUser.length;
    for (let index = 0; index < count; index += 1) {
      const element = balanceUser[index];
      const temp = [element.month, element.balance]; // 'mongtn' was a typo, it should be 'month'
      monthlySummary.push(temp);
    }
  }

  return monthlySummary;
}

function GetDataWithAccumulation(balanceUser) {
  const monthlySummary = [];

  if (balanceUser) {
    const count = balanceUser.length;
    for (let index = 0; index < count; index += 1) {
      const element = balanceUser[index];
      const temp = [element.month, element.in, element.out];
      monthlySummary.push(temp);
    }
  }

  return monthlySummary;
}

function WithAccum(Summary) {
  const data = GoogleCharts.api.visualization.arrayToDataTable([
    ['Genre', 'Fantasy & Sci Fi', 'Romance'],
    ...Summary.filter((item) => item.length > 1),
  ]);
  return data;
}

export function drawChart(balanceUser, tag) { // 'balanceUser' should be defined before using it
  let options = null;
  //const t= document.querySelector('#chart')
const chart = new GoogleCharts.api.visualization.ColumnChart(tag);
  switch (tag.id) {
    case 'chart':
      options = {
        width: 510,
        backgroundColor: {
          strokeWidth: 1,
        },
        legend: 'none',
      };
      chart.draw(dataChart(GetData(balanceUser)), options);
      break;

    case 'chart-history':
      options = {
        width: 1240,
        backgroundColor: {
          strokeWidth: 1,
        },
        legend: 'none',
      };
      chart.draw(dataChart(GetData(balanceUser)), options);
      break;

    case 'chart-detail':
      options = {
        width: 1240,
        backgroundColor: {
          strokeWidth: 1,
        },
        legend: 'none',
        isStacked: true,
      };
      chart.draw(
        WithAccum(GetDataWithAccumulation(balanceUser)),
        options
      );
      break;

    default:
      console.log('not chart');
      break;
  }

}

window.onload = () => {
  const balanceUser = []; // define balanceUser or get it from elsewhere
  GoogleCharts.load(() => {
    drawChart(balanceUser, document.getElementById('chart'));
  });
};


function getCurrentMonthYear() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // getMonth returns 0-indexed month, so add 1
  const currentYear = now.getFullYear();

  return { month: currentMonth, year: currentYear };
}
function dataChart(monthlySummary) {
  const data = new GoogleCharts.api.visualization.DataTable();
  data.addColumn('string', 'Month');
  data.addColumn('number', 'Balance');
  data.addRows(monthlySummary);
  return data;
}


// import { GoogleCharts } from './googleCharts.esm'

// GoogleCharts.load(drawChart)

// const optionsSimple = {
//  width: 510,
//  backgroundColor: {
//   strokeWidth: 1,
//  },
//  legend: 'none',
// }

// const optionsHistory = {
//  width: 1240,
//  backgroundColor: {
//   strokeWidth: 1,
//  },
//  legend: 'none',
// }

// const optionsDetail = {
//  width: 1240,
//  backgroundColor: {
//   strokeWidth: 1,
//  },
//  legend: 'none',
//  bar: { groupWidth: '75%' },
//  isStacked: true,
// }

// export function drawChart(balanceUser, tag) {
//  let options = null
//  const chart = new GoogleCharts.api.visualization.ColumnChart(tag)
//  switch (tag.id) {
//   case 'chart':
//    options = optionsSimple
//    chart.draw(dataChart(GetData(balanceUser)), options)
//    break

//   case 'chart-history':
//    options = optionsHistory

//    chart.draw(dataChart(GetData(balanceUser)), options)
//    break
//   case 'chart-detail':
//    options = optionsDetail

//    chart.draw(WithAccum(GetDataWithAccumulation(balanceUser)), options)
//    break

//   default:
//    console.log('not chart')
//    break
//  }
// }

// function GetData(balanceUser) {
//  const monthlySummary = []

//  if (balanceUser) {
//   const count = balanceUser.length
//   for (let index = 0; index < count; index++) {
//    const element = balanceUser[index]
//    let temp = [element.mongtn, element.balance]
//    monthlySummary.push(temp)
//   }
//  }

//  return monthlySummary
// }

// function GetDataWithAccumulation(balanceUser) {
//  const monthlySummary = []

//  if (balanceUser) {
//   const count = balanceUser.length
//   for (let index = 0; index < count; index++) {
//    const element = balanceUser[index]
//    let temp = [element.mongtn, element.in, element.out]
//    monthlySummary.push(temp)
//   }
//  }
//  return monthlySummary
// }

// function dataChart(monthlySummary) {
//  var data = new google.visualization.DataTable()
//  data.addColumn('string', 'Mongth')
//  data.addColumn('number', 'Balance')

//  data.addRows(monthlySummary)
//  return data
// }

// function WithAccum(Summary) {
//  var data = google.visualization.arrayToDataTable([
//   ['Genre', 'Fantasy & Sci Fi', 'Romance'],
//   ...Summary,
//  ])
//  return data
// }
