/* Here we define the templates of the charts with d3.js 
 * see documentation at https://dc-js.github.io/dc.js/ */

/* Declaration of a bar Chart */
var mainChart = dc.lineChart('#line-chart');
var zoomChart = dc.lineChart("#range");

/* loading data from a csv
 * The then function allows to define instruction when loading data */
d3.csv("/static/data/test_data.csv").then(function (data) {

    var dateFormatParser = d3.timeParse("%Y-%m-%d");

    data.forEach(function (d) {
        d.date = dateFormatParser(d.date);
        d.day = d3.timeDay(d.date); // pre-calculate day for better performance
    });

    // Run the data through crossfilter and load it
    var df = crossfilter(data);

    // Building the value to count by day
    var dayValue = df.dimension(function (d) {
        return d.day;
    });
    // Grouping by dans and counting
    var dayGroup = dayValue.group();

    // Definition of the bar chart
    mainChart.width(960)
        .height(300)
        .evadeDomainFilter(true)
        .x(d3.scaleTime().domain(d3.extent(data, function(d) { return d.day; })))
        .xUnits(d3.timeDays)
        .yAxisLabel("Count")
        .xAxisLabel("Day")
        .elasticY(true)
        .brushOn(false)
        .mouseZoomable(true)
        .rangeChart(zoomChart)
        .dimension(dayValue)
        .group(dayGroup);


    // Defining the preview
    zoomChart
        .width(960)
        .height(80)
        .x(d3.scaleLinear().domain(d3.extent(data, function(d) { return d.day; })))
        .clipPadding(10)
        .brushOn(true)
        .yAxisLabel("")
        .dimension(dayValue)
        .group(dayGroup);
    // Render the Charts
    dc.renderAll();
    // Redraw
    // dc.redrawAll()

});
