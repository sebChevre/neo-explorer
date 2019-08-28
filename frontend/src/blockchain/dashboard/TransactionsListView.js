import React, { Component } from 'react';
import axios from 'axios';
var moment = require('moment');
var Loader = require('react-loader');
import loader from '../../loader.gif';
import { Link } from 'react-router-dom'

class TransactionsListView extends Component {

    constructor (props){
        super(props);

        this.handleMinerChange = this.handleMinerChange.bind(this)

    }
    state = {
        last10Transaction : [],
        filtreMiner: false,
        loaded:false
    }

    componentDidMount() {
        console.log("DID MOUNT")

        this.setState({loaded:true})
        this.loadTransactions(true);
       // this.setState({loaded:false})

    }


    loadTransactions(withMiner){

        this.setState({loaded:true})
        var url = "/transactions/last";

        console.log("load: filterMiner: " + this.state.filtreMiner)

        if(withMiner){
            url += "?filterMiner=true";
        }

        axios.get(url)
            .then(response => {
                const last10Transaction = response.data;
                this.setState({ last10Transaction: last10Transaction });
                console.log(this.state)
                console.log(this.state.last10Transaction)
                this.setState({loaded:false})
            })
    }

    handleMinerChange (e) {
        const nom = e.target.name;
        const checked = e.target.checked;

        console.log(this.state.filtreMiner)

        this.setState((prevState) => {

            return{

                ...prevState,
                filtreMiner:!prevState.filtreMiner
            }
        })

        this.loadTransactions(checked);
    };



    render () {

        return (



            <div className="shadow-lg p-3 mb-5 bg-white rounded table-responsive-xl">

                <h4>10 dernières transactions</h4>
                <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="customSwitch1"
                           onChange={this.handleMinerChange}
                           checked={this.state.filtreMiner} disabled={this.state.loaded}></input>
                        <label className="custom-control-label" htmlFor="customSwitch1">filtre mineur</label>
                    { this.state.loaded ? <img id="transaction-loader" src={loader}/> : null }

                </div>

                <hr/>


                <table className="small-font table table-striped">


                    <tbody>

                    {this.state.last10Transaction.map(transaction => {

                        console.log(transaction.txid)

                        moment.locale('fr')
                        var diffMinutes = moment().diff(new Date(transaction.blocktime * 1000), 'minutes');
                        var index = transaction.txid.substr(0,12) + "..."


                        return (
                            <tr key={transaction.txid}>
                                <th scope="row">{transaction.type}</th>
                                <td>
                                    <Link to={"/transaction/" + transaction.txid}>{index}</Link><br/>
                                </td>
                                <td>
                                    <span>{moment(new Date(transaction.blocktime * 1000)).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span><br/>
                                    <span><b>{"Il y a " + diffMinutes + " minutes"}</b></span><br/>
                                </td>

                            </tr>

                        )
                    })}

                    </tbody>
                </table>
            </div>

        )
    }
}

export default TransactionsListView;