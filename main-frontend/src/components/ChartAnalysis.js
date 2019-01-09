import React, {Component} from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { randomColor } from 'randomcolor';

am4core.useTheme(am4themes_animated);
class ChartAnalysis extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let listDetails = this.props.end ? this.props.data.listDetails : [];

        let chartData = [];

        let listdates = []
        listDetails.map((item) => {

            let stringdate = (item.tweetFecha).substring(0, 10).split("-");
            let newDate = new Date(stringdate[0], stringdate[1], stringdate[2]);
            newDate.setDate(newDate.getDate()+1)

            listdates.push(new Date(newDate).getTime())
        });

        listdates = listdates.filter((v, i, a) => a.indexOf(v) === i);

        let listtypeone = [];
        let listtypetwo = [];
        let listtypethree = [];
        let listtypefour = [];

        listtypeone = listDetails.filter(function (element) {
            return element.tweetSearchFiltersId == 1
        });
        listtypetwo = listDetails.filter(function (element) {
            return element.tweetSearchFiltersId == 2
        });
        listtypethree = listDetails.filter(function (element) {
            return element.tweetSearchFiltersId == 128
        });
        listtypefour = listDetails.filter(function (element) {
            return element.tweetSearchFiltersId == 32
        });


        listdates.map((item) => {
            let cant = listtypeone.filter(function (element) {

                let stringdate = (element.tweetFecha).substring(0, 10).split("-");
                let newDate = new Date(stringdate[0], stringdate[1], stringdate[2]);

                return new Date(newDate).getTime() == item
            }).length;

            let cantTwo = listtypetwo.filter(function (element) {

                let stringdate = (element.tweetFecha).substring(0, 10).split("-");
                let newDate = new Date(stringdate[0], stringdate[1], stringdate[2]);


                return new Date(newDate).getTime() == item
            }).length;


            let cantThree = listtypethree.filter(function (element) {

                let stringdate = (element.tweetFecha).substring(0, 10).split("-");
                let newDate = new Date(stringdate[0], stringdate[1], stringdate[2]);

                return new Date(newDate).getTime() == item
            }).length;

            let cantFour = listtypefour.filter(function (element) {

                let stringdate = (element.tweetFecha).substring(0, 10).split("-");
                let newDate = new Date(stringdate[0], stringdate[1], stringdate[2]);

                return new Date(newDate).getTime() == item
            }).length;


            let d = new Date(item);

            let datestring = (d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2));


            chartData.push({
                date: datestring,
                value: cant,
                value2: cantTwo,
                value3: cantThree,
                value4: cantFour,
            });
        });

        chartData = chartData.sort();

        const distinct = (value, index, self) => {
            return self.indexOf(value) === index;
        }

        chartData = chartData.filter(distinct);

        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.paddingRight = 20;

        chart.data = chartData;

// Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series 1
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.strokeWidth = 2;
        series.minBulletDistance = 10;
        series.tooltipText = "{valueY}";
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.fillOpacity = 0.5;
        series.tooltip.label.padding(12, 12, 12, 12);
        series.legendSettings.valueText = "{valueY}";
        series.tooltipText = "Sin Clasificar: {valueY}";

// Create series 2
        let series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "value2";
        series2.dataFields.dateX = "date";
        series2.strokeWidth = 2;
        series2.minBulletDistance = 10;
        series2.tooltipText = "{valueY}";
        series2.tooltip.pointerOrientation = "vertical";
        series2.tooltip.background.cornerRadius = 20;
        series2.tooltip.background.fillOpacity = 0.5;
        series2.tooltip.label.padding(12, 12, 12, 12);
        series2.legendSettings.valueText = "{valueY}";
        series2.tooltipText = "Con hashtags: {valueY}";

// Create series 3
        let series3 = chart.series.push(new am4charts.LineSeries());
        series3.dataFields.valueY = "value3";
        series3.dataFields.dateX = "date";
        series3.strokeWidth = 2;
        series3.minBulletDistance = 10;
        series3.tooltipText = "{valueY}";
        series3.tooltip.pointerOrientation = "vertical";
        series3.tooltip.background.cornerRadius = 20;
        series3.tooltip.background.fillOpacity = 0.5;
        series3.tooltip.label.padding(12, 12, 12, 12);
        series3.legendSettings.valueText = "{valueY}";
        series3.tooltipText = "Asociados a Respuestas: {valueY}";


// Create series 4
        let series4 = chart.series.push(new am4charts.LineSeries());
        series4.dataFields.valueY = "value4";
        series4.dataFields.dateX = "date";
        series4.strokeWidth = 2;
        series4.minBulletDistance = 10;
        series4.tooltipText = "{valueY}";
        series4.tooltip.pointerOrientation = "vertical";
        series4.tooltip.background.cornerRadius = 20;
        series4.tooltip.background.fillOpacity = 0.5;
        series4.tooltip.label.padding(12, 12, 12, 12);
        series4.legendSettings.valueText = "{valueY}";
        series4.tooltipText = "Asociados a Noticias: {valueY}";

// Add scrollbar
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.series.push(series2);
        chart.scrollbarX.series.push(series3);
        chart.scrollbarX.series.push(series4);

// Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;



        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render(){
        return(
            <div id="chartdiv"></div>
        )
    }
}


export default ChartAnalysis;
