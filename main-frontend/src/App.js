import React, { Component } from 'react';

import './App.css';
import './css/preview.css';
import './css/spinner.css';
import {Button, Tabs, Tab} from "react-bootstrap";
import ChartAnalysis from './components/ChartAnalysis';
import ChartAnalysisSentiment from './components/ChartAnalysisSentiment';
import ChartAnalysisSource from './components/ChartAnalysisSource';

import { TagCloud } from "react-tagcloud";
import { randomColor } from 'randomcolor';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class App extends Component {
    constructor(props){
      super(props);

        this.onChangePersonName = this.onChangePersonName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            search_name: '',
            isLoading: false,
            open : true,
            text :'Procesando búsqueda',
            class : 'hide',
            ids :'',
            on : false,
            data : {},
            end : false,
            register : false,
            tweet: [],
        };

        this.timerId = 0;
        this.timerData = 0;

    }


    startData() {
        this.timerData = setInterval(() => {
            if(this.state.on) {
                this.setData();
            }
        },3000);
    }

    setData(){
        const { data, ids} = this.state;
        if(Object.getOwnPropertyNames(data).length > 0) {
            this.pauseTimer();
            if (data.flagListo) {
                this.setState({text: data.state, class: 'show', on: true, isLoading: false, end: true, data: data.entity });
                this.pauseTimerData();
            } else {
                this.setState({text: data.state, class: 'hide', on: false, isLoading: true, end: false});
                this.searchingById(ids);
            }
        }
    }

    startTimer() {
        this.timerId = setInterval(() => {
            if(this.state.register) {
                this.searchingAndStopTimer(this.state.ids);
            }
        },3000);
    }

    searchingAndStopTimer(ids) {
        if(ids != "") {
            this.pauseTimer();
            this.searchingById(ids);
        }
    }

    searchingById(ids){
        fetch("/api/getAnalysis/" + ids, {
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
            this.setState({ data:  data , on: true  });
        });
    }

    onChangePersonName(e) {
        this.setState({
            search_name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            isLoading: true,
            open : true,
            text :'Procesando búsqueda',
            class : 'hide',
            ids :'',
            on : false,
            data : {},
            end : false,
            register : false,
            tweet: [],
        });

        this.startTimer();
        this.startData();

        this.searching(this.state.search_name);
    }

    searching(valor){

        let Analysis = {
            nameKey: valor
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
            this.setState({ ids:  data.id , register : true });
            return data.id;
        })

       //this.setState({ ids: "5c37bc000d2f1134c0152b80", register : true });

    }

    pauseTimer(){
        this.clearTimer();
    }

    clearTimer(){
        clearInterval(this.timerId);
    }

    pauseTimerData(){
        this.clearTimerData();
    }

    clearTimerData(){
        clearInterval(this.timerData);
    }


    render() {

        let body = "";

        if(this.state.end){
            body = <div className={" " + (this.state.end ? "show" : "hide")}>
                <LiHeader data={this.state.data} end={this.state.end}/>
                <br/>
                <ResultTops data={this.state.data} end={this.state.end}/>
                <br/>
                <ResultHashtag data={this.state.data} end={this.state.end}/>
                <br/>
                <ResultUser data={this.state.data} end={this.state.end}/>
                <br/>
                <TimeLine data={this.state.data} end={this.state.end}/>
                <br/>
                <ChartSentiment  data={this.state.data} end={this.state.end} />
                <br/>
                <ChartSource data={this.state.data} end={this.state.end} />
            </div>
        }

       return (
           <div className="General">
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
                               <div className="form-group col-sm-8 col-sm-offset-3">
                                   <div className="col-md-8">
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
                   <div className={(this.state.isLoading ? "show" : "hide")}>
                       <Loading class={this.state.class} text={this.state.text}  />
                   </div>
                   { body }
               </div>
           </div>
        );
    }
}

class ResultTops extends Component{
    constructor(props) {
        super(props);

        this.state = {
            active :'active',
            fade:'fade',
        }
    }

    render() {
        let listShare = [];
        let listFavorite = [];
        let listRecents = [];

        if(this.props.end) {
            let listDetails = this.props.data.listDetails;

            ///----------------------------------------------------------

            listShare = listDetails.filter(function (element) {
                return element.tweetOrigen == 1 && element.tweetTotalReteweet > 0
            });

            listShare.sort(function (a, b) {
                if (a.tweetTotalReteweet < b.tweetTotalReteweet) {
                    return 1;
                }
                if (a.tweetTotalReteweet > b.tweetTotalReteweet) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

            listShare = listShare.slice(0, 50);

            ///----------------------------------------------------------

            listFavorite = listDetails.filter(function (element) {
                return element.tweetTotalFavoritos > 0
            });

            listFavorite.sort(function (a, b) {
                if (a.tweetTotalFavoritos < b.tweetTotalFavoritos) {
                    return 1;
                }
                if (a.tweetTotalFavoritos > b.tweetTotalFavoritos) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

            listFavorite = listFavorite.slice(0, 50);

            ///----------------------------------------------------------

            let tmplistRecents = listDetails.filter(function (element) {
                return element.tweetOrigen == 1 && element.tweetSearchFiltersId == 1
            });
            for (let i = 0; i < tmplistRecents.length ; i++) {
                tmplistRecents[i].TweetFecha = new Date(Date.parse(tmplistRecents[i].TweetFecha));
                listRecents.push(tmplistRecents[i]);
            }

            listRecents.sort(function (a, b) {
                if (a.TweetFecha < b.TweetFecha) {
                    return 1;
                }
                if (a.TweetFecha > b.TweetFecha) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

            listRecents = listRecents.slice(0, 50);

        }

        return (
        <div className={"container divResult " + (this.props.end ? "show" : "hide")}>
            <div className="row">
                <header className="width-center">
                    <h3>Top posts</h3>
                </header>
                <div className="container">
                    <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
                        <Tab sm="4" eventKey={1} title="Más compartidos" className="tab-content">
                            <div id="retweet" className="in active divtweet">
                                <ul className="feed">
                                    <LiShare data={listShare} />
                                </ul>
                            </div>
                        </Tab>
                        <Tab sm="4" eventKey={2} title="Más favoritos" className="tab-content">
                            <div id="favorite" className="divtweet">
                            <ul className="feed">
                                <LiShare data={listFavorite} />
                            </ul>
                            </div>
                        </Tab>
                        <Tab sm="4" eventKey={3} title="Más recientes" className="tab-content">
                            <div id="recent" className="divtweet">
                            <ul className="feed">
                                <LiShare data={listRecents} />
                            </ul>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
        );
    }
}

class LiHeader extends Component{
    constructor(props) {
        super(props);
    }

    render()
    {
        return(
            <div id="divDashboard" className={"divResult "}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="number">
                                <div className="icon">
                                    <i className="fa fa-comment fa-3x" aria-hidden="true"></i>
                                </div>
                                <div className="stat"
                                     id="total_tweets">{this.props.end ? this.props.data.listDetails.length + "" : ""}</div>
                                <div className="label">POSTS</div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="number">
                                <div className="icon">
                                    <i className="fa fa-user fa-3x" aria-hidden="true"></i>
                                </div>
                                <div className="stat"
                                     id="total_usuarios">{this.props.end ? this.props.data.listUser.length + "" : ""}</div>
                                <div className="label">USUARIOS</div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="number">
                                <div className="icon">
                                    <i className="fa fa-hashtag fa-3x" aria-hidden="true"></i>
                                </div>
                                <div className="stat"
                                     id="total_reach">{this.props.end ? this.props.data.listHashtags.length + "" : ""}</div>
                                <div className="label">HASHTAG</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class LiShare extends Component{
    constructor(props) {
        super(props);
    }

    render(){

        let datafound = this.props.data;
        let textfound = datafound.length == 0 ? "No se encontraron resultados" : "";

        const shared =  this.props.data.map((tw, index) => {

            let urluser = JSON.parse(tw.objDetalleAPI);

            return (
                <div className="tweet">
                    <div className="details">
                        <div className="avatar">
                            <img src={urluser.user.profile_image_url} alt={tw.tweetScreenName} width="24" height="24"></img>
                        </div>
                        <div className="user">
                            <div className="name">
                                {tw.nombre } (<a href={"https://twitter.com/"+tw.tweetScreenName} target="_blank">@{tw.tweetScreenName}</a>)
                                - {tw.tweetFecha.substring(0,19).replace("T"," ") }
                            </div>
                        </div>
                        <div className="stat">
                            <div className="number">
                                <a>{tw.tweetTotalReteweet} <i className="fa fa-retweet rt-like-icon" ></i></a>
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
            <li className="tweets_top">
                { shared } { textfound }
            </li>
        );

    }
}

class ResultHashtag extends Component {
    constructor(props) {
        super(props);
    }

    render(){

        let listHashtag = this.props.end ? this.props.data.listHashtags : [];
        let listkeyWord = this.props.end ? this.props.data.listKeys : [];

        let listResult = [];
        let listResultKey = [];
        let objmax = {};
        let auxtotal = 0;

        if(listHashtag.length > 0){

            for (let i = 0; i < listHashtag.length; i++) {
                if(listHashtag[i].total > auxtotal){
                    objmax = listHashtag[i];
                }
            }

            for (let i = 0; i < listHashtag.length; i++) {
                if(listHashtag[i].total == objmax.total && listHashtag[i].hashtag == objmax.hashtag ){
                    listResult.push({
                        count: objmax.total,
                        value: objmax.hashtag,
                    });
                }else{
                    listResult.push({
                        count: (listHashtag[i].total * 90 / objmax.total),
                        value: listHashtag[i].hashtag,
                    });
                }
            }
        }

        if(listkeyWord.length > 0){
            objmax = {};
            auxtotal = 0;

            for (let i = 0; i < listkeyWord.length; i++) {
                if(listkeyWord[i].total > auxtotal){
                    objmax = listkeyWord[i];
                }
            }

            for (let i = 0; i < listkeyWord.length; i++) {
                if(listkeyWord[i].total == objmax.total && listkeyWord[i].keyword == objmax.keyword ){
                    listResultKey.push({
                        count: objmax.total,
                        value: objmax.keyword,
                    });
                }else{
                    listResultKey.push({
                        count: (listkeyWord[i].total * 90 / objmax.total),
                        value: listkeyWord[i].keyword,
                    });
                }
            }

            listResultKey = listResultKey.slice(0, 150);
        }

        let datafound1 = this.props.data.listHashtags;
        let datafound2 = this.props.data.listKeys;

        return (
            <div className={"container divResult "}>
                <div className="row">
                    <header className="width-center">
                        <h3>Top Hashtag</h3>
                    </header>
                    <div className="container">
                        <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
                            <Tab sm="4" eventKey={1} title="Hashtags identificados" className="tab-content">
                                <div className="divtweet">
                                    {datafound1.length == 0 ? "No se encontraron resultados" : <DivCloud data={listResult} /> }
                                </div>
                            </Tab>
                            <Tab sm="4" eventKey={2} title="Keywords identificados" className="tab-content">
                                <div className="divtweet">
                                    {datafound2.length == 0 ? "No se encontraron resultados" : <DivCloud data={listResultKey} /> }
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
    
}

class DivCloud extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const customRenderer = (tag, size, color) => (
            <span key={tag.value}
                  style={{
                      animation: 'blinker 3s linear infinite',
                      animationDelay: `${Math.random() * 2}s`,
                      fontSize: `${size}em`,
                      border: `2px solid ${color}`,
                      margin: '3px',
                      padding: '3px',
                      display: 'inline-block',
                      color: () => randomColor(),
                  }}>{tag.value}</span>
        );

        let dataFound = this.props.data;

        return (
            <div>
            {dataFound.length == 0 ? "No se encontraron resultados" : <TagCloud tags={this.props.data} minSize={1} maxSize={2}
                                                                                         style={{textAlign: 'center', paddingRight:240, paddingLeft:240, paddingTop:40}}
                                                                                         renderer={customRenderer} /> }
            </div>
        )
    }
}


class ResultUser extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let listResult = [];

        const listUsers = this.props.end ? this.props.data.listUser : [];
        const listItems = this.props.end ? this.props.data.listDetails : [];
        let listIds = [];

        for (let i = 0; i < listUsers.length ; i++) {
            listIds.push(listUsers[i].tweetUsuarioId);
        }

        listUsers.sort(function (a, b) {
            if (a.totalSeguidores < b.totalSeguidores) {
                return 1;
            }
            if (a.totalSeguidores > b.totalSeguidores) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        listResult = listUsers.slice(0, 50);


        //------------------------------------------------
        let listRepeat = [];

        const distinct = (value, index, self) => {
            return self.indexOf(value) === index;
        }

        listIds = listIds.filter(distinct);

        for (let i = 0; i < listIds.length; i++) {
            let res = listItems.filter(function (element) {
                return element.tweetUsuarioId == listIds[i]
            });

            let user = listUsers.filter(function (element) {
                return element.tweetUsuarioId == listIds[i]
            });

            if(user.length > 1){
                user[0].total = res.length;
                user[0].descripcion = res.length == 0 ? "" : res[0].tweetFullText;
                listRepeat.push(user[0]);
            }else{
                if(user.length == 1){
                    user[0].total = res.length;
                    user[0].descripcion = res.length == 0 ? "" : res[0].tweetFullText;
                    listRepeat.push(user[0]);
                }
            }
        }

        // listRepeat
        listRepeat.sort(function (a, b) {
            if (a.total < b.total) {
                return 1;
            }
            if (a.total > b.total) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        listRepeat = listRepeat.slice(0, 50);

        //------------------------------------------------

        let listRecent = [];

        for (let i = 0; i < listIds.length ; i++) {
            let res = listItems.filter(function (element) {
                return element.tweetUsuarioId == listIds[i]
            });

            let user = listUsers.filter(function (element) {
                return element.tweetUsuarioId == listIds[i]
            });

            if(user.length > 1){
                user[0].fecha = res.length == 0 ? "" : res[0].TweetFecha;
                user[0].descripcion = res.length == 0 ? "" : res[0].tweetFullText;
                listRecent.push(user[0]);
            }else{
                if(user.length == 1){
                    user[0].fecha = res.length == 0 ? "" : res[0].TweetFecha;
                    user[0].descripcion = res.length == 0 ? "" : res[0].tweetFullText;
                    listRecent.push(user[0]);
                }
            }
        }

        for (let j = 0; j < listRecent.length; j++) {
            listRecent[j].fecha = new Date(new Date(listRecent[j].fecha));
        }

        listRecent.sort(function (a, b) {
            if (a.fecha < b.fecha) {
                return 1;
            }
            if (a.fecha > b.fecha) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        listRecent = listRecent.slice(0, 50);


       return(
            <div className={"container divResult "}>
                <div className="row">
                    <header className="width-center">
                        <h3>Top User</h3>
                    </header>
                    <div className="container">
                        <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
                            <Tab sm="4" eventKey={1} title="Más influyentes" className="tab-content">
                                <TableUser data={listResult} />
                            </Tab>
                            <Tab sm="4" eventKey={2} title="Más tweets del tema" className="tab-content">
                                <TableUser data={listRepeat}  />
                            </Tab>
                            <Tab sm="4" eventKey={3} title="Con últimos tweets" className="tab-content">
                                <TableUser data={listRecent}  />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }

}

class TableUser extends Component {
    constructor(props) {
        super(props);
    }


    render(){

        let totalRows = this.props.data;
        let totalRowsData = totalRows.length;

        const options = {
            noDataText : 'No se encontraron resultados'
        };

        return (
            <BootstrapTable data={ this.props.data }  pagination={ true } options={ options }  height='500'
                            scrollTop={ 'Bottom' }
                            headerClasses="header-class"
            >
                <TableHeaderColumn width='20%' dataAlign='left' headerAlign='center' dataField='id' dataFormat={ avatarFormatter } isKey>ID</TableHeaderColumn>
                <TableHeaderColumn width='20%' dataAlign='left' headerAlign='center' dataField='nombre'>Name</TableHeaderColumn>
                <TableHeaderColumn width='40%' dataAlign='left' headerAlign='center' dataField='descripcion' dataFormat={ descriptionFormatter }>Desciption</TableHeaderColumn>
                <TableHeaderColumn width='10%' dataAlign='right' headerAlign='center' dataField='total'>All Tweets</TableHeaderColumn>
                <TableHeaderColumn width='10%' dataAlign='right' headerAlign='center' dataField='totalSeguidores'>Followers</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

function avatarFormatter(cell, row) {
    return '<img src='+row.avatar+' alt="positive" width="32" heigth="32" />' +
        '<a href="https://twitter.com/'+ row.tweetScreenName+'" target="_blank">@'+row.tweetScreenName +'</a><br/>'+row.tweetScreenName;
}

function descriptionFormatter(cell, row) {
    return <div className="align-text" title={row.descripcion} >  {row.descripcion}  </div>
}

class TimeLine extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let dataFound = this.props.data.listDetails;

         return (
            <div className="divResult container">
                <header className="width-center">
                    <h3>Time line - Tweets</h3>
                </header>
                <div className="row">
                    <div className="container">
                        {dataFound.length == 0 ? "No se encontraron resultados" : <ChartAnalysis data={this.props.data} end={this.props.end} />}
                    </div>
                </div>
            </div>
        )
    }
}

class ChartSentiment extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        let dataFound = this.props.data.listDetails;
        return (
            <div className="divResult container">
                <header className="width-center">
                    <h3>Sentiment - Tweets</h3>
                </header>
                <div className="row">
                    <div className="container">
                        {dataFound.length == 0 ? "No se encontraron resultados" : <ChartAnalysisSentiment data={this.props.data} end={this.props.end} />}
                    </div>
                </div>
            </div>
        )
    }
}

class ChartSource extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        let dataFound = this.props.data.listDetails;
        return(
            <div className="divResult container">
                <header className="width-center">
                    <h3>Source - Tweets</h3>
                </header>
                <div className="row">
                    <div className="container">
                        {dataFound.length == 0 ? "No se encontraron resultados" : <ChartAnalysisSource data={this.props.data} end={this.props.end} />}
                    </div>
                </div>
            </div>
        )
    }
}

class Loading extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div id="divloading" className={"view"}>
                <label id="lblState" className="loading"
                       style={{
                           animation: 'blinker 3s linear infinite',
                           animationDelay: `${Math.random() * 2}s`,
                       }}
                >{this.props.text}</label>

                <div className="plane main">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
            </div>
        )
    }


}

export default App;

