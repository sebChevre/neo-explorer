import React, { Component } from 'react';

import axios from 'axios';

import TransactionDetailView from "./transactions/TransactionDetailView";
import TransactionGeneralView from "./transactions/TransactionGeneralView";

class TransactionView extends Component {

    constructor (props){
        super(props);

        this.state = {
            transaction: '',
            transactionsIn: [],
            transactionsOut: []

        }
    }

    componentDidMount() {

        let hash = this.props.match.params.transactionHash;

        this.loadTransaction(hash);

        console.log("MOUNT!!!")
    }

    //Chargement de la transaction via son hash
    loadTransaction(hash) {

        console.log("Loading transaction, hash: " + hash);

        axios.get("/transactions/" + hash)
            .then(response => {
                const transaction = response.data.result;

                this.setState({transaction:transaction},()=>{

                    console.log("Transaction loaded and added to state:");
                    console.log(this.state.transaction);

                    //récupération des transactions in
                    for(var tIndex in this.state.transaction.vin){
                        console.log("Transaction in: ");
                        console.log(this.state.transaction.vin[tIndex]);

                        var transactionId = this.state.transaction.vin[tIndex].txid;
                        var transactionOutIndex = this.state.transaction.vin[tIndex].vout;

                        this.loadTransactionsIn(transactionId,transactionOutIndex)
                    }

                    //finalisation transactions ou
                    for(var out in this.state.transaction.vout){

                        this.loadAndFinalizeAsset(transaction.vout[out],"out")

                    }

                })


            })
    }

    //chargement des transactions in via le hash de la transaction et l'index out
    loadTransactionsIn (transactionId,transactionOutIndex) {

        axios.get("/transactions/" + transactionId)
            .then(response => {
                const transaction = response.data.result;
                const transactionOuts = transaction.vout;


                console.log("Transaction in before new: ")
                console.log(transaction)

                //pour chaque out, on prend celui qui correpons a l'id
                for(var vout in transactionOuts){
                    var asset = transactionOuts[vout];

                   if(asset.n === transactionOutIndex) {
                        this.loadAndFinalizeAsset(asset, "in");
                    }

                }

                console.log(this.state)

            })
    }

    loadAndFinalizeAsset(asset,type){

        console.log("type:");console.log(type);
        console.log("asset:");console.log(asset);

        axios.get("/assets/" + asset.asset)
            .then(response => {
                const assetResponse = response;

                console.log("Asset: ");
                console.log(assetResponse);


                asset.nom = assetResponse.data.nom;
                asset.nomCourt = assetResponse.data.nomCourt;

                console.log(type);
                console.log(type === "out")

                if(type === "in"){
                    const transactionsIn = this.state.transactionsIn;
                    transactionsIn.push(asset);

                    this.setState({ transactionsIn: transactionsIn});
                    console.log("Transactions array in: " + transactionsIn)
                }else if(type === "out"){

                    const transactionsOut = this.state.transactionsOut;
                    transactionsOut.push(asset);
                    this.setState({ transactionsOut: transactionsOut});
                    console.log("Transactions array out: " + transactionsOut)
                }
            })
    }

    render () {

        var transactionsOut = [];
        var claims = [];

        if(this.state.transaction.type === 'ClaimTransaction'){

        }

        console.log(this.state.transaction.txid)
        console.log(this.state.transactionsIn)
        //for (var i in this.state.transaction.vout){
        //    console.log (this.state.transaction.vout[i])
        //    transactionsOut.push(this.state.transaction.vout[i])
        //}


        return (
            <div className="transaction-wrapper">

                <div className="card">

                    <h5 className="card-header bg-primary block-header">
                        <span className="block-libelle">Transaction</span>
                        <span className="block-lines">{this.state.transaction.txid}</span>
                    </h5>
                    <div className="card-body block-lines">

                        <TransactionGeneralView
                            key={this.state.transaction.txid+"1"}
                            t={this.state.transaction}/>

                        <hr/>


                        <TransactionDetailView
                            key={this.state.transaction.txid+"2"}
                            type={this.state.transaction.type}
                            in={this.state.transactionsIn}
                            out={this.state.transactionsOut}
                            asset={this.state.transaction.asset}/>

                    </div>
                </div>


                <div id="accordion">
                    <div className="card">
                        <div className="card-header bg-white" id="headingOne">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed collapse-title" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <h5 className="collapse-title">Invocation script</h5>
                                </button>
                            </h5>
                        </div>

                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body">
                                <table className="table table-striped">
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header bg-white" id="headingTwo">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed collapse-title" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <h5 className="collapse-title">Verification script</h5>
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
                                    <h5 className="collapse-title">Script</h5>
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

export default TransactionView;