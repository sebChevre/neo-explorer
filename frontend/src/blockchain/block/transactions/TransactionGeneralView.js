import React, { Component } from 'react';
var moment = require('moment');
import { Route, Link } from "react-router-dom";

class TransactionGeneralView extends Component {

    constructor (props){

        super(props);

        console.log(props)

        this.state = {
            transaction: props.t
        }

        console.log("Transaction general init");
        console.log("Transaction:");
        console.log(this.state.transaction);
    }

    componentDidMount() {
        console.log(this.props)
        this.setState({transaction:this.props.t})
    }

    getTransactionFrenchDesc (transactionType) {

        switch (transactionType){
            case "IssueTransaction":return "Emission d'actifs";
            break;

            case "RegisterTransaction":return "Enregistrement d'actifs";
            break;

            default: return "[]"
        }

    }
    render () {

        return (
            <table className="table table-sm">
                <tbody>
                <tr>
                    <th className="first-col" scope="row" colSpan={6}>
                        <h2>{this.state.transaction.type}</h2><h5 className="transaction-fr-desc">{this.getTransactionFrenchDesc(this.state.transaction.type)}</h5>
                    </th>
                </tr>
                <tr>
                    <th className="first-col" scope="row">Hash</th>
                    <td>{this.state.transaction.txid}</td>
                </tr>
                <tr>
                    <th scope="row">Time</th>
                    <td>{moment(this.state.transaction.blocktime * 1000).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
                </tr>
                <tr>
                    <th scope="row">Network Fee</th>
                    <td>{this.state.transaction.net_fee}</td>
                </tr>
                <tr>
                    <th scope="row">System Fee</th>
                    <td>{this.state.transaction.sys_fee}</td>
                </tr>
                <tr>
                    <th scope="row">Size</th>
                    <td>{this.state.transaction.size}</td>
                </tr>
                <tr>
                    <th scope="row">Block</th>
                    <td>
                        <Link to={"/block/" + this.state.transaction.blockhash}>{this.state.transaction.blockhash}</Link>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }

}

export default TransactionGeneralView;