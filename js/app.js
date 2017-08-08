import { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Chart from './components/Chart';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bitcoinHistory: null,
			dateRange: {
				startDate: moment().subtract(7, 'days'),
				endDate: moment()
			}
		};
	}

	componentDidMount() {
		this._setBitCoinPriceHistory(this.state.dateRange);
	}

	_setBitCoinPriceHistory(dateRange) {
		const startDate = moment(dateRange.startDate).format('YYYY-MM-DD');
		const endDate = moment(dateRange.endDate).format('YYYY-MM-DD');
		const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;

		fetch( url )
			.then(function(response) {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then( (historicalPriceData) => {
				this.setState({
					bitcoinHistory: historicalPriceData,
					dateRange
				});
			});
	}

	render () {
		if (this.state.bitcoinHistory === null) {
			return <h2>Price Loading</h2>;
		}
		return (
			<Chart
				setPriceHistory={ this._setBitCoinPriceHistory.bind(this) }
				dateRange= { this.state.dateRange }
				bitcoinHistory= { this.state.bitcoinHistory }
			/>
		);
	}
}

ReactDOM.render(<App/>,  document.getElementById("app"));
