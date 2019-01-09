import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './main.css';
import App from './App';
import ChartAnalysis from './components/ChartAnalysis';
import ListAnalysis from './components/ListAnalysis';
import SearchWord from './components/SearchWord';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import myData from './example';

//ReactDOM.render(<SearchWord />, document.getElementById('search'));
//ReactDOM.render(<ListAnalysis />, document.getElementById('list'));
ReactDOM.render(<App data={myData} />, document.getElementById('root'));
//ReactDOM.render(<ChartAnalysis data={myData} />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
