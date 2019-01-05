import React, { Component } from 'react';
import '../css/preview.css';
import '../css/spinner.css';

import { Button } from 'react-bootstrap';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_animated);

class SearchWord extends Component {
    constructor(){
        super();
        this.onChangePersonName = this.onChangePersonName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            search_name: '',
            isLoading: false,
            open : true,
            text :'',
            class : 'hide',
            ids :'',
            on : false,
            data : {},
            end : false,
            tweet: [],

        };
        this.timerId = 0;
        this.timerData = 0;

        this.getdatatmp();
        this.startTimer();
        //this.startTimerData();
    }


    onChangePersonName(e) {
        this.setState({
            search_name: e.target.value
        });

        console.log(e.target.value);
    }

    onSubmit(e) {
        e.preventDefault();
        //this.processFirstChart();

        this.setState({isLoading: true});

        console.log(`The values are ${this.state.search_name}`);

        let valor_buscar = this.state.search_name;

        let Analysis = {
            nameKey: valor_buscar
        }

        let result = fetch("/api/addAnalysis", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Analysis),
        }).then(function (response) {
            //200 = OK
            //404 = NOT FOUND
            if (response.status == "200" || response.status == "404") {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        }).then((data) => {
            this.setState({ ids:  data.id });
            return data.id;
        })

    }

    componentWillUnmount(){
        if(this.state.on) {
            this.clearTimer();
        }
    }

    getdatatmp () {
        fetch("/api/getAnalysis/5c2fe30fbacae529481068af", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            //200 = OK
            //404 = NOT FOUND
            if (response.status == "200" || response.status == "404") {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        }).then((data) => {
            console.log(data);
            this.setState({ data:  data, end : true});
            const datos = data;
            return datos;
        });
    }

    update() {
        const {ids} = this.state;
        if(ids != "") {
            let resultend = fetch("/api/getAnalysis/" + ids, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(function (response) {
                //200 = OK
                //404 = NOT FOUND
                if (response.status == "200" || response.status == "404") {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            }).then((data) => {
                console.log(data);
                this.setState({ data:  data});
                const datos = data;
                return datos;
            });

        }
    }

    startTimer() {
        this.timerId = setInterval(() => {
            //this.update();
            this.processFirstChart();
        },3000);
    }

    pauseTimer(){
        this.clearTimer();
    }

    clearTimer(){
        clearInterval(this.timerId);
    }

    setData(){
        const {data} = this.state;
        if(Object.getOwnPropertyNames(data).length > 0) {
            this.pauseTimer();
            if (data.flagListo) {
                this.setState({text: data.state, class: 'show', on: true, isLoading: false, end: true});
                this.pauseTimerData();
                this.processFirstChart();
            } else {
                this.setState({text: data.state, class: 'hide', on: false, isLoading: true, end: false});
            }
            this.update();
        }
    }

    startTimerData() {
        this.timerData = setInterval(() => {
            this.setData();
        },5000);
    }

    pauseTimerData(){
        this.clearTimerData();
    }

    clearTimerData(){
        clearInterval(this.timerData);
    }

    processFirstChart(){
        if(this.state.end) {
            this.clearTimer();

            let listDetails = this.state.data.entity.listDetails;

            listDetails = listDetails.filter(function(element) {
                                return  element.tweetSearchFiltersId == 1
                            });



            let chartData = [];

            var listdates = []
            listDetails.map((item) => {

                let stringdate = (item.tweetFecha).substring(0, 10).split("-");
                let newDate = new Date(stringdate[0],stringdate[1],stringdate[2]);

                listdates.push(new Date(newDate).getTime())
            });

            listdates = listdates.filter((v, i, a) => a.indexOf(v) === i);

            listdates.map((item) =>{
                let cant = listDetails.filter(function(element) {

                    let stringdate = (element.tweetFecha).substring(0, 10).split("-");
                    let newDate = new Date(stringdate[0],stringdate[1],stringdate[2]);

                    return new Date(newDate).getTime() == item
                }).length;

                let d = new Date(item);

                let datestring = (d.getFullYear() +"-"+ ("0"+(d.getMonth()+1)).slice(-2) + "-" +("0" + d.getDate()).slice(-2));

                chartData.push({
                    date: datestring,
                    value: cant
                });
            });

            let chart = am4core.create("chartdiv1", am4charts.XYChart);

            chartData = chartData.sort();

            chart.data =  chartData;

// Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 50;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "value";
            series.dataFields.dateX = "date";
            series.strokeWidth = 3;
            series.fillOpacity = 0.5;

// Add vertical scrollbar
            chart.scrollbarY = new am4core.Scrollbar();
            chart.scrollbarY.marginLeft = 0;

// Add cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "zoomY";
            chart.cursor.lineX.disabled = true;

            this.processTweet();
        }
    }

    processTweet(){
        if(this.state.end) {
            let listDetails = this.state.data.entity.listDetails;

            let listfilter = listDetails.filter(function(element) {
                return  element.tweetSearchFiltersId == 1
            });

        }
    }

    render() {
        console.log(this.state.tweet);
        let listfilter = [];

        if(this.state.end) {
            let listDetails = this.state.data.entity.listDetails;
            listfilter = listDetails.filter(function (element) {
                return element.tweetOrigen == 1
            });

            console.log(listfilter);
        }

         const tweets = listfilter.length == 0 ? "" : listfilter.map((tw, i) => {
            return (
                <div className="tweet">
                    <div className="details">
                        <div className="avatar">
                            <img src={tw.avatar} alt={tw.tweetScreenName} width="24" height="24"></img>
                        </div>
                        <div className="user">
                            <div className="name">
                                {tw.nombre } (<a href="#" target="_blank">@{tw.tweetScreenName}</a>) -
                                {tw.tweetFecha }
                            </div>
                        </div>
                        <div className="stat">
                            <div className="number">
                                <a href="#" target="_blank">{tw.tweetTotalReteweet} <i className="fa fa-retweet rt-like-icon" ></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="tweet-text">
                        {tw.tweetFullText}
                    </div>
                </div>
            )
        });


        return (
            <div id="divGeneral">
                <div className="App">
                    <form onSubmit={this.onSubmit}>
                        <div className="row center-block text-center">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label className="title">Introduzca un hashtag o palabra clave
                                        para realizar el seguimiento en tiempo real</label>
                                    <input type="text"
                                           className="form-control"
                                           name="keyword"
                                           id="keyword"
                                           value={this.state.search_name}
                                           onChange={this.onChangePersonName}
                                           placeholder="Please Insert Word to Search"/>
                                </div>
                                <div className="col-md-5 mx-auto text-center">
                                    <div className="form-group">
                                        <Button type="submit" className="btn-block center-block"
                                                bsStyle="danger" disabled={this.state.isLoading}>
                                            {this.state.isLoading ? 'Procesando...' : 'Search'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </form>
                </div>
                <div id="divDashboard" className={"divResult " + (this.state.end ? "show" : "hide")}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="number">
                                    <div className="icon">
                                        <i className="fa fa-comment fa-3x" aria-hidden="true"></i>
                                    </div>
                                    <div className="stat"
                                         id="total_tweets">{this.state.end ? this.state.data.entity.listDetails.length + "" : ""}</div>
                                    <div className="label">POSTS</div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="number">
                                    <div className="icon">
                                        <i className="fa fa-user fa-3x" aria-hidden="true"></i>
                                    </div>
                                    <div className="stat"
                                         id="total_usuarios">{this.state.end ? this.state.data.entity.listUser.length + "" : ""}</div>
                                    <div className="label">USUARIOS</div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="number">
                                    <div className="icon">
                                        <i className="fa fa-hashtag fa-3x" aria-hidden="true"></i>
                                    </div>
                                    <div className="stat"
                                         id="total_reach">{this.state.end ? this.state.data.entity.listHashtags.length + "" : ""}</div>
                                    <div className="label">HASHTAG</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="divResult">
                    <div className="container">
                        <div className="row">
                            <header className="width-center">
                                <h3>Top posts</h3>
                            </header>
                            <div className="container">
                                <ul className="nav nav-tabs nav-justified" role="tablist">
                                    <li className="nav-item active">
                                        <a className="nav-link active" data-toggle="tab" href="#retweet" role="tab">Más
                                            compartidos</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#likes" role="tab">Más
                                            favoritos</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#recents" role="tab">Más
                                            recientes</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div id="retweet" className="tab-pane fade in active">
                                        <ul className="feed">
                                            <li className="tweets_top">{
                                                tweets
                                            }
                                            </li>
                                        </ul>
                                    </div>
                                    <div id="likes" className="tab-pane fade">
                                        <ul className="feed">
                                            <li className="tweets_top">

                                            </li>
                                        </ul>
                                    </div>
                                    <div id="recents" className="tab-pane fade">
                                        <ul className="feed">
                                            <li className="tweets_top">

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="divResult">
                    <div className="row">
                        <header>
                            <h3>Usuarios</h3>
                        </header>
                        <div className="container">
                            <ul className="nav nav-tabs nav-justified" role="tablist">
                                <li className="nav-item active">
                                    <a className="nav-link active" data-toggle="tab" href="#masinfluyentes" role="tab">Más
                                        influyentes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#masfrecuencia" role="tab">Más
                                        tweets del tema</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#masrecientes" role="tab">Con
                                        últimos tweets</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div id="masinfluyentes" className="tab-pane fade in active">
                                    <div className="row">
                                        <div className="col-sm-1"></div>
                                        <div className="col-sm-10">
                                            <div className="col-xs-12 table-responsive table-condensed">
                                                <table className="table table-striped table-hover"
                                                       id="tblMasInfluyentes" data-toggle="table" data-sort-order="asc"
                                                       data-mobile-responsive="true" data-check-on-init="true"
                                                       data-pagination="true" data-page-size="30"
                                                       data-page-list="[20, 50, 100, 200]">
                                                    <thead>
                                                    <tr>
                                                        <th data-field="Avatar" data-halign="center"
                                                            data-valign="middle" data-align="center"
                                                            data-formatter="ImgFormatter" data-width="60"></th>
                                                        <th data-field="Nombre" data-halign="left" data-valign="left"
                                                            data-align="left" data-sortable="true"
                                                            data-width="80">Nombre
                                                        </th>
                                                        <th data-field="Descripcion" data-halign="left"
                                                            data-valign="left" data-align="left"
                                                            data-sortable="true">Último Tweet
                                                        </th>
                                                        <th data-field="TotalSeguidores" data-halign="center"
                                                            data-valign="middle" data-align="center"
                                                            data-sortable="true" data-width="80">Total de seguidores
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-sm-1"></div>
                                    </div>
                                </div>
                                <div id="masfrecuencia" className="tab-pane fade">
                                    <div className="row">
                                        <div className="col-sm-1"></div>
                                        <div className="col-sm-10">
                                            <div className="col-xs-12 table-responsive table-condensed">
                                                <table className="table table-striped table-hover" id="tblMasTweets"
                                                       data-toggle="table" data-sort-order="asc"
                                                       data-mobile-responsive="true" data-check-on-init="true"
                                                       data-pagination="true" data-page-size="30"
                                                       data-page-list="[20, 50, 100, 200]">
                                                    <thead>
                                                    <tr>
                                                        <th data-field="Avatar" data-halign="center"
                                                            data-valign="middle" data-align="center"
                                                            data-formatter="ImgFormatter" data-width="60"></th>
                                                        <th data-field="Nombre" data-halign="left" data-valign="left"
                                                            data-align="left" data-sortable="true"
                                                            data-width="80">Nombre
                                                        </th>
                                                        <th data-field="Descripcion" data-halign="left"
                                                            data-valign="left" data-align="left"
                                                            data-sortable="true">Último Tweet
                                                        </th>
                                                        <th data-field="Total" data-halign="center" data-valign="middle"
                                                            data-align="center" data-sortable="true"
                                                            data-width="80">Total de tweets
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-sm-1"></div>
                                    </div>
                                </div>
                                <div id="masrecientes" className="tab-pane fade" >
                                    <div className="row">
                                        <div className="col-sm-1"></div>
                                        <div className="col-sm-10">
                                            <div className="col-xs-12 table-responsive table-condensed">
                                                <table className="table table-striped table-hover" id="tblMasReciente"
                                                       data-toggle="table" data-sort-order="asc"
                                                       data-mobile-responsive="true" data-check-on-init="true"
                                                       data-pagination="true" data-page-size="30"
                                                       data-page-list="[20, 50, 100, 200]">
                                                    <thead>
                                                    <tr>
                                                        <th data-field="Avatar" data-halign="center"
                                                            data-valign="middle" data-align="center"
                                                            data-formatter="ImgFormatter" data-width="60"></th>
                                                        <th data-field="Nombre" data-halign="left" data-valign="left"
                                                            data-align="left" data-sortable="true"
                                                            data-width="80">Nombre
                                                        </th>
                                                        <th data-field="Descripcion" data-halign="left"
                                                            data-valign="left" data-align="left"
                                                            data-sortable="true">Tweet
                                                        </th>
                                                        <th data-field="TweetFechaToString" data-halign="center"
                                                            data-valign="middle" data-align="center"
                                                            data-sortable="true" data-width="80">Fecha
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-sm-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    <div className="container">
                        <div className="row">
                            <div id="chartdiv1"></div>
                        </div>
                    </div>
                </div>
                <br />
                <div id="divloading" className={"view " + this.state.class}>
                    <label id="lblState" className="loading">{this.state.text}</label>
                    <div className="plane main">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        );
    }


}




export default SearchWord;

