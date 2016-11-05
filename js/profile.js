google.load('visualization', '1', {'packages': ['geochart', 'corechart']});
$(document).ready(function() {
  google.setOnLoadCallback(drawMap);

  function drawMap() {

    var data = google.visualization.arrayToDataTable([
        ['Region',   'Donated Amount ($)'],
        ['Haiti',  42],
        ['Middle Africa', 12],
        ['Ethiopia', 23]
      ]);

    options = {
      displayMode: 'markers',
      enableRegionInteractivity: 'false',
      backgroundColor: 'transparent',
      defaultColor: '#f5f5f5',
      sizeAxis: {minSize:8,  maxSize: 12},
      colorAxis: {colors: ['#98fb98', 'green']}
    };

  chart = new google.visualization.GeoChart(document.getElementsByClassName("chart_div")[0]);

  chart.draw(data, options);
  };
});
