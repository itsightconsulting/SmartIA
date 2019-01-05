import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class DetailsAnalysis extends Component {
    constructor(){
        super();
    }


    render() {

        console.log(this.props.match.params.id);

        return (

            <div className="App">
                <Link to="/ListAnalysis"><i className="fas fa-angle-double-right" title="Ver detalle"></i></Link>
            </div>

        )
    }
}



export default DetailsAnalysis;













