import React, { Component } from 'react';



class ListAnalysis extends Component {
    constructor(){
        super();
        this.state = {
            data: []
        };
    }

    async componentWillMount() {
        await fetch("/api/getAnalysis", {
            method: "get",
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
            this.setState({
                isLoaded: true,
                data: data
            })
        })
    }

    render(){
        const { data } = this.state;

        return (

            <div className="App">
                <div  className="table-responsive">
                    <h3>Listado de búsquedas</h3>
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Palabra Clave</th>
                            <th scope="col">Fecha de análisis</th>
                            <th scope="col">Estado de análisis</th>
                            <th scope="col">Origen de análisis</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item, i) =>
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{item.nameKey}</td>
                                    <td>{item.startDateAnalysis}</td>
                                    <td>{item.stateAnalysis == 1 ? "Process" : "Ending" }</td>
                                    <td>{item.originAnalysis == 1 ? "Twitter" : "IBM" }</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default ListAnalysis