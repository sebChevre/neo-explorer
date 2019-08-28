import React, { Component } from 'react';
import axios from 'axios';
var moment = require('moment');

class SearchBar extends Component {

    state = {
        terme: ''
    }

    constructor (props){
        super(props);

        this.search = this.search.bind(this);
        this.handleChangeTerme = this.handleChangeTerme.bind(this);

    }

    search () {
        axios.get("/search?terme=" + this.state.terme)
            .then(response => {
                console.log(response.data)

                var searchResponse = response.data;

                console.log(searchResponse)
                if(searchResponse.objectType === "BLOCK"){
                    window.location.href = "block/" + searchResponse.data.result.index;
                }else if (searchResponse.objectType === "TRANSACTION"){

                }else if (searchResponse.objectType === "ADDRESS"){

                }
            })
    }

    handleChangeTerme (element) {
        this.setState({ terme: element.target.value });
        console.log(this.state.terme)
    }

    render() {

        return (

            <div className="search-bar col-md-12 tuile shadow-lg p-3 mb-5 bg-white rounded" style={{marginBottom: '5px !important'}}>
                <h4>Blockchain explorer</h4>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" onChange={this.handleChangeTerme} placeholder="BlocId, Block hash, TX hash"/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button"
                                        onClick={this.search}>Search</button>
                            </div>
                    </div>
            </div>
        )
    }
}
export default SearchBar;