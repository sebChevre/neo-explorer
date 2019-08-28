import React, { Component } from 'react';
import axios from 'axios';
import Block from '../block/BlockView';
import ReactJson from 'react-json-view';
import BlocksListView from "./BlocksListView";
import TransactionsListView from "./TransactionsListView";
import SearchBar from "./SearchBar";
var moment = require('moment');

class DashBoardView extends Component {

    state = {
        last10blocks: []
    }

    componentDidMount() {
        axios.get(`/blocks/last`)
        .then(response => {
            const last10blocks = response.data;
            this.setState({ last10blocks: last10blocks });
            console.log(this.state)
            console.log(this.state.last10blocks)
        })
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">

                    <SearchBar/>

                    <div className="col-md-6">
                        <BlocksListView/>
                    </div>

                    <div className="col-md-6">
                        <TransactionsListView/>
                    </div>
                </div>


            </div>





        )
    }
}

export default DashBoardView;