import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chart from './components/Chart';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBitcionPrice: null
        };
    }

    componentDidMount() {
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then( (stories) => {
            this.setState({ currentBitcionPrice: stories });
            console.log(stories);
        });
    }

    _getBitCoinPrice() {
        return Number(this.state.currentBitcionPrice.bpi.USD.rate);
    }

    render () {
        if (this.state.currentBitcionPrice === null) {
            return <h2>Price Loading</h2>;
        }
        return (
            <Chart
                currentPriceUSD={ this._getBitCoinPrice() }/>
        )
    }
}

ReactDOM.render(<App/>,  document.getElementById("app"));
