import React, { Component } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { randomColor } from 'randomcolor';

am4core.useTheme(am4themes_animated);

class ChartAnalysisSource extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){

        let listDetails = this.props.end ? this.props.data.listDetails : [];
        let listFilters = [];
        let listResult = [];
        let listSource = [];

        listFilters = listDetails.filter(function (e) {
            return e.tweetSource != ""
        });

        for (let i = 0; i < listFilters.length ; i++) {

            let body = listFilters[i].tweetSource;
            let temp = document.createElement("a");
            temp.innerHTML = body;

            listFilters[i].tweetSource = temp.textContent;
        }


        for (let i = 0; i < listFilters.length; i++) {
            listSource.push(listFilters[i].tweetSource)
        }

        const distinct = (value, index, self) => {
            return self.indexOf(value) === index;
        }

        listSource = listSource.filter(distinct);

        for (let i = 0; i < listSource.length; i++) {

            let total = listDetails.filter(function (e) {
                return e.tweetSource == listSource[i]
            }).length;

            listResult.push({
                source : listSource[i],
                total: total,
            })
        }

        listResult.sort(function (a, b) {
            if (a.total < b.total) {
                return 1;
            }
            if (a.total > b.total) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        listResult = listResult.slice(0, 10);

        // Create chart instance
        let chart = am4core.create("chartSource", am4charts.XYChart3D);

        for (let i = 0; i < listResult.length; i++) {
            listResult[i].color = chart.colors.next()
        }

        // Add data
        chart.data = listResult;


        // Create axes
        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "source";
        categoryAxis.renderer.inversed = true;

        let  valueAxis = chart.xAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries3D());
        series.dataFields.valueX = "total";
        series.dataFields.categoryY = "source";
        series.name = "total";
        series.columns.template.propertyFields.fill = "color";
        series.columns.template.tooltipText = "{valueX}";
        series.columns.template.column3D.stroke = am4core.color("#fff");
        series.columns.template.column3D.strokeOpacity = 0.2;

    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render(){



        return (
            <div id="chartSource" className="grahp-chart"></div>
        )

    }
}



export default ChartAnalysisSource;