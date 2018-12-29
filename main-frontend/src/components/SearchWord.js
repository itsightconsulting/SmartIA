import React, { Component } from 'react';

class SearchWord extends Component {
    constructor(){
        super();
        this.state = {
            data: []
        };
    }

    render() {
        return (
            <div className="App">
                <div className="row center-block text-center">

                    <div className="col-md-9">
                        <div className="form-group">
                            <input type="text" className="form-control" name="keyword" id="keyword"
                                   placeholder="please insert word to search"/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <input type="button" value="Search" className="btn btn-danger btn-block"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchWord;
