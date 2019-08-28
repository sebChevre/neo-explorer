import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DashBoardView from './blockchain/dashboard/DashBoardView';
import PortefeuillesCmp from "./blockchain/PortefeuillesViewCmp";
import NoeudsCmp from './blockchain/NoeudsCmp'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BlockView from "./blockchain/block/BlockView";
import BlocksListView from "./blockchain/dashboard/BlocksListView";
import TransactionsListView from "./blockchain/dashboard/TransactionsListView";
import TransactionView from "./blockchain/block/TransactionView";

class App extends Component {
  render() {
    return (
        <div id="container-fluid mainContainer">
            <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="/">NeoExplorer</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link"  to="/blocks">Blocks</Link>

                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"  to="/transactions">Transactions</Link>

                        </li>
                      <li className="nav-item">
                        <Link className="nav-link"  to="/addresses">Adresses</Link>

                      </li>
                        <li className="nav-item">
                            <Link className="nav-link"  to="/assets">Assets</Link>

                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"  to="/contracts">Contracts</Link>

                        </li>

                    </ul>

                </div>
            </nav>

            <div id="mainContainer">

                    <Route exact path="/" component={DashBoardView} />
                    <Route path="/blocks" component={BlocksListView}/>
                    <Route path="/block/:blockId" component={BlockView} />

                    <Route path="/transactions" component={TransactionsListView}/>
                    <Route path="/transaction/:transactionHash" component={TransactionView} />

            </div>

        </Router>
        </div>


    );
  }
}

export default App;
