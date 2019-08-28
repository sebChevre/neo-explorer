import React, { Component } from 'react';

class TransactionDetailView extends Component {

    constructor (props){

        super(props);

        this.state = {
            in: props.in,
            out: props.out,
            asset: props.asset,
            type: props.type
        }

        console.log("Transaction detail init");
        console.log("In:");
        console.log(this.state.in);

        console.log("Out:");
        console.log(this.state.out);

        console.log("Type:");
        console.log(this.state.type);

        console.log("Asset:");
        console.log(this.state.asset);
    }


    registerTransactionDetailView () {

        //finalisation asset
        if(this.state.type === "RegisterTransaction"){
            if(this.state.asset.type = "GoverningToken")
                this.state.asset.nomCourt = "NEO";

        }else if(this.state.asset.type = "UtilityToken"){
            this.state.asset.nomCourt = "GAS";
        }

        return(
            <table className="tx-details">
                <tbody>
                <tr>

                    <td className="transaction-in-col">

                       <h1>Asset</h1>

                    </td>


                    <td><h1>{">"}</h1></td>


                    <td className="transaction-out-col">


                                <label>{this.state.asset.admin}
                                    <b>{" " + this.state.asset.amount +" "+ this.state.asset.nomCourt}</b>
                                    <small><i>  [{this.state.asset.nom}]</i></small>
                                </label>



                    </td>
                </tr>
                </tbody>
            </table>
        )
    }

    standardDetailView () {
        return(
            <table className="tx-details">
                <tbody>
                <tr>

                    <td className="transaction-in-col">

                        {
                            this.state.in.map((tin,key) => {

                                return (
                                    <label key={key}>{tin.address}
                                        <b>{" " + tin.value +" "+ tin.nomCourt}</b>
                                        <small><i>  [{tin.nom}]</i></small>
                                    </label>
                                )

                            })}

                    </td>


                    <td><h1>{">"}</h1></td>


                    <td className="transaction-out-col">
                        {this.state.out.map(tout => {
                            return (
                                <label>{tout.address}
                                    <b>{" " + tout.value +" "+ tout.nomCourt}</b>
                                    <small><i>  [{tout.nom}]</i></small>
                                </label>
                            )

                        })}
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }

    render() {

        console.log(this.state.type)

        if(this.state.type === "RegisterTransaction"){
            return this.registerTransactionDetailView();
        }else{
            return this.standardDetailView();
        }



    }


}

export default TransactionDetailView;
