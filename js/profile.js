google.load('visualization', '1', {'packages': ['geochart', 'corechart']});
$(document).ready(function() {

  $(".forcegraph").hide();
  $(".info").hide();
  google.setOnLoadCallback(drawMap);
  google.charts.setOnLoadCallback(drawRegionsMap);
  var chart;
  var data;
  var options;
  function drawMap() {

    data = new google.visualization.DataTable();

    data.addColumn('number', 'latitude');
    data.addColumn('number', 'longitude');
    data.addColumn('string', 'name');
    data.addColumn('number', 'color');
    data.addColumn('number', 'value', 'value');
    data.addColumn({type:'string', role:'tooltip'});

    options = {
      displayMode: 'markers',
      enableRegionInteractivity: 'false',
      backgroundColor: 'transparent',
      defaultColor: '#f5f5f5',
      sizeAxis: {minSize:8,  maxSize: 8},
    };

  chart = new google.visualization.GeoChart(document.getElementsByClassName("chart_div")[0]);

  chart.draw(data, options);
  };
});
