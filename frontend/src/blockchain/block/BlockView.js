import React, { Component } from 'react';
import Transaction from "../TransactionCmp";
import axios from 'axios';
var moment = require('moment');
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class BlockView extends Component {


    constructor (props){
        super(props);

        this.state = {
            txnbre: 0,
            block: ''
        }

        this.refreshPage = this.refreshPage.bind(this);
        //this.setState({blockId:props..params.blockId})

    }

    loadBlock(blockId) {
        console.log("axios")
        console.log(blockId)

        axios.get("/blocks/id/" + blockId)
            .then(response => {
                const block = response.data.result;
                this.setState({ block: block, txnbre:response.data.nbreTransactions });
                console.log(this.state)
                console.log(this.state.block)
            })
    }

    loadBlockByHash(hash) {
        console.log("axiosby hash")
        console.log(hash)

        axios.get("/blocks/hash/" + hash)
            .then(response => {
                const block = response.data.result;
                this.setState({ block: block, txnbre:response.data.nbreTransactions });
                console.log(this.state)
                console.log(this.state.block)
            })
    }

    componentDidMount() {

        let blockId = this.props.match.params.blockId;

        let blockIdentifiant = Number(blockId)

        console.log(typeof (blockIdentifiant))

        if(typeof(blockIdentifiant) === 'number'){
            this.loadBlock(blockIdentifiant)
        }else{
            this.loadBlockByHash(blockIdentifiant)
        }


        //this.loadBlock(blockId);

    }

    refreshPage(e){

        console.log(e.target.id)
        //this.props.offline()
        console.log(Number.isInteger(Number(e.target.id)))

        if(typeof(e.target.id) === 'number'){
            this.loadBlock(e.target.id)
        }else{
            this.loadBlockByHash(e.target.id)
        }

    }

    render() {

        console.log("render")
        moment.locale('fr');
        var creationTime = moment(this.state.block.time).format("dddd, MMMM Do YYYY, h:mm:ss a");

        var tx = this.state.block.tx;
        console.log(tx)

       // var t = tx[0]

        var transactions = [];
        console.log(typeof(tx))

        for (var i in tx){
            console.log (tx[i])
            transactions.push(tx[i])
        }

        console.log(transactions.length)

        //var keys = Object.keys(this.state.block.tx);

        console.log(this.state.block.nextblockhash)
        return (

        <div className="block-wrapper">

            <div className="card">

                <h5 className="card-header bg-primary block-header">
                    <span className="block-libelle">Block</span>
                    <span className="block-lines">{this.state.block.hash}</span>
                </h5>
                <div className="card-body block-lines">



                    <table className="table table-sm">
                        <tbody>
                        <tr>
                            <th className="first-col" scope="row">Hash</th>
                            <td>{this.state.block.hash}</td>
                        </tr>
                        <tr>
                            <th scope="row">Index</th>
                            <td>{this.state.block.index}</td>
                        </tr>
                        <tr>
                            <th scope="row">Timestamp</th>
                            <td>{moment(this.state.block.time* 1000).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
                        </tr>
                        <tr>
                            <th scope="row">Validator</th>
                            <td>
                                <Link to={"/address/" + this.state.block.nextconsensus}>
                                    {this.state.block.nextconsensus}</Link>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Size</th>
                            <td>{this.state.block.size}</td>
                        </tr>
                        <tr>
                            <th scope="row">Version</th>
                            <td>{this.state.block.version}</td>
                        </tr>
                        <tr>
                            <th scope="row">Merkleroot</th>
                            <td>{this.state.block.merkleroot}</td>
                        </tr>

                        <tr>
                            <th scope="row">Transactions</th>
                            <td>{this.state.txnbre}</td>
                        </tr>
                        <tr>
                            <th scope="row">Previous block</th>
                            <td>
                                <a href="#" id={this.state.block.previousblockhash} onClick={this.refreshPage}>
                                    {this.state.block.previousblockhash}
                                </a>
                            </td>
                        </tr>

                        {(this.state.block.nextblockhash !== null) ? (

                            <tr>
                                <th scope="row">Next block</th>
                                <td>
                                    <a href="#" id={this.state.block.nextblockhash} onClick={this.refreshPage}>
                                        {this.state.block.nextblockhash}
                                    </a>
                                </td>
                            </tr>
                            ) : null}



                        </tbody>

                    </table>
                </div>
            </div>

            <div id="accordion">
                <div className="card">
                    <div className="card-header bg-white" id="headingOne">
                        <h5 className="mb-0">
                            <button className="btn btn-link collapsed collapse-title" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <h5 className="collapse-title">Transactions</h5>
                            </button>
                        </h5>
                    </div>

                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                            <table className="table table-striped">
                                <tbody>
                            {transactions.map(transaction => {

                                console.log(transaction.txid)

                                moment.locale('fr')
                                var diffMinutes = moment().diff(new Date(transaction.blocktime * 1000), 'minutes');


                                return (
                                    <tr key={transaction.txid}>
                                        <th scope="row">{transaction.type}</th>
                                        <td>
                                            <span>{transaction.txid}</span><br/>
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
                    </div>
                </div>
                <div className="card">
                    <div className="card-header bg-white" id="headingTwo">
                        <h5 className="mb-0">
                            <button className="btn btn-link collapsed collapse-title" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <h5 className="collapse-title">Invocation script</h5>
                            </button>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header bg-white" id="headingThree">
                        <h5 className="mb-0">
                            <button className="btn btn-link collapsed collapse-title" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <h5 className="collapse-title">Verifications script</h5>
                            </button>
                        </h5>
                    </div>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                        <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                </div>
            </div>

        </div>



        )
    }
}

export default BlockView;