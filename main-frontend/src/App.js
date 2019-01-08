import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import './css/preview.css';
import './css/spinner.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Button, Tabs, Tab, Col , Row } from "react-bootstrap";
import SearchWord from "./components/SearchWord";
import myData from './example';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class App extends Component {
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
            data : myData,
            end : true,
            tweet: [],
        };

        this.timerId = 0;
        this.timerData = 0;

        this.getDataTmp();
        this.startTimer();
    }

    startTimer() {
        this.timerId = setInterval(() => {

        },3000);
    }


    getDataTmp() {
        this.setState({
            data: myData,end: true
        });
    }

    onChangePersonName(e) {
        this.setState({
            search_name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        //this.setState({isLoading: true});
        //this.searching(this.state.search_name);

        this.getDataTmp();
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
            this.setState({ ids:  data.id });
            return data.id;
        })
    }

    render() {
       return (
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
               <LiHeader data={myData} end={this.state.end}  />
               <div className="container divResult">
                   <Result data={myData} state={this.state.end} />
               </div>
           </div>
        );
    }
}



class Result extends Component{
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

        if(this.props.state) {
            let listDetails = this.props.data.listDetails;
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

            listShare = listShare.slice(0, 25);

            ///----------------------------------------------------------

            listFavorite = listDetails.filter(function (element) {
                return element.tweetOrigen == 1 && element.tweetTotalFavoritos > 0
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

            listFavorite = listFavorite.slice(0, 25);

            ///----------------------------------------------------------

            listRecents = listDetails.filter(function (element) {

                //new Date( Date.parse(element.TweetFecha));

                return element.tweetOrigen == 1 && element.tweetTotalFavoritos > 0
            });



        }

        return (
        <div className="divResult">
            <div className="row">
                <header className="width-center">
                    <h3>Top posts</h3>
                </header>
                <div className="container">
                    <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
                        <Tab sm="4" eventKey={1} title="Más compartidos" className="tab-content">
                            <div id="retweet" className="tab-pane in active divtweet">
                                <ul className="feed">
                                    <LiShare data={listShare} />
                                </ul>
                            </div>
                        </Tab>
                        <Tab sm="4" eventKey={2} title="Más favoritos" className="tab-content">
                            <ul className="feed">
                                <LiShare data={listFavorite} />
                            </ul>
                        </Tab>
                        <Tab sm="4" eventKey={3} title="Más recientes" className="tab-content">
                            <ul className="feed">
                                <LiShare data={listFavorite} />
                            </ul>
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
            <div id="divDashboard" className={"divResult " + (this.props.end ? "show" : "hide")}>
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
                                - {tw.tweetFecha.substring(0,10) }
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
            <li className="tweets_top">
                { shared }
            </li>
        );

    }
}

class TableShare extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let list = [];

        if(this.props.state) {

            let listDetails = this.props.data.listDetails;
            list = listDetails.filter(function (element) {
                return element.tweetOrigen == 1
            });

            console.log(list);
        }

        return (
            <BootstrapTable data={ list }  height='500' scrollTop={ 'Bottom' } options={ { noDataText: 'This is custom text for empty data' } }>
                <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default App;
