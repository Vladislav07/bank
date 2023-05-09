import { GoogleCharts } from "./googleCharts.esm";

//Load the charts library with a callback

    GoogleCharts.load(drawChart);

    function drawChart(monthlyBalance) {
      const monthlySummary = [];
      monthlyBalance.forEach((element) => {
        let temp = [element.mongtn, element.balance];
        monthlySummary.push(temp);
      });
      const data =
        GoogleCharts.api.visualization.arrayToDataTable(monthlySummary);
      const chart = new GoogleCharts.api.visualization.ColumnChart(
        document.getElementById("chart")
      );
      chart.draw(data);
    }


export { drawChart as default };
