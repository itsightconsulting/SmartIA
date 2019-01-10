import React, { Component } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { randomColor } from 'randomcolor';

am4core.useTheme(am4themes_animated);

class ChartAnalysisSentiment extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let listDetails = this.props.end ? this.props.data.listDetails : [];
        let listIds = [];
        let listFilters = [];
        let listResult = [];

        listFilters = listDetails.filter(function (e) {
            return e.sentimentId != null
        })


        for (let i = 0; i < listFilters.length; i++) {
            listIds.push(listFilters[i].sentimentId)
        }

        const distinct = (value, index, self) => {
            return self.indexOf(value) === index;
        }

        listIds = listIds.filter(distinct);

        for (let i = 0; i < listIds.length ; i++) {

            let total = listDetails.filter(function (e) {
                return e.sentimentId == listIds[i]
            }).length;

            listResult.push({
                sentiment : (listIds[i] == -2 ? "Error" : listIds[i] == -1 ? "Negativo" : listIds[i] == 0 ? "Neutral" : "Positivo"),
                total : total
            })
        }

        let chart = am4core.create("chartSentiment", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.legend = new am4charts.Legend();
        chart.data = listResult;

        let series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "total";
        series.dataFields.category = "sentiment";

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render(){
        return (
            <div id="chartSentiment" className="grahp-chart"></div>
        )
    }
}


export default ChartAnalysisSentiment;




