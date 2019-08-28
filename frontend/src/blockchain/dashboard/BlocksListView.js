import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
var moment = require('moment');

class BlocksListView extends Component {

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





    render () {

        return (
        <div className="shadow-lg p-3 mb-5 bg-white rounded">

            <h4>10 derniers blocs</h4>

            <table className="small-font table table-striped">
                <thead>
                <tr>
                    <th scope="col">Block Id</th>
                    <th scope="col">Time</th>
                    <th scope="col">Transactions</th>
                    <th scope="col">Validator</th>
                    <th scope="col">Size [Octets]</th>
                </tr>
                </thead>

                <tbody>

                {this.state.last10blocks.map(block => {

                    console.log(block.result.index)

                    moment.locale('fr')
                    var diffMinutes = moment().diff(new Date(block.result.time * 1000), 'minutes');

                    var idx = ""+block.result.index;
                    var index = idx.substr(0,12)


                    return (
                        <tr key={index}>
                            <th scope="row">
                                <Link to={"/block/" + index}>{idx}</Link>
                            </th>
                            <td>
                                <span>{moment(new Date(block.result.time * 1000)).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span><br/>
                                <span><b>{"Il y a " + diffMinutes + " minutes"}</b></span><br/>
                            </td>
                            <td>{block.nbreTransactions}</td>
                            <td>
                                <Link to={"/adress/" + block.result.nextconsensus}>{block.result.nextconsensus}</Link>
                            </td>
                            <td>{block.result.size}</td>
                        </tr>

                    )
                })}

                </tbody>
            </table>
        </div>
        )
    }
}

export default BlocksListView;