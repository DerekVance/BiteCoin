import { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';
import d3 from 'd3';
import { bb } from 'billboard.js';
import 'react-datepicker/dist/react-datepicker.css';


class Chart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			chart:  null
		}
	}

	componentDidMount() {
		const dates = _.map(this.props.bitcoinHistory.bpi, (value, key) => key)
		const prices = _.map(this.props.bitcoinHistory.bpi, (value) => value)

		const chart = bb.generate({
			"data": {
				"x": "x",
				"columns": [
  			[
				"x",
					...dates
				],
				[
					"prices",
					...prices
				]
			]
		},
			"axis": {
				"x": {
					"type": "timeseries",
					"tick": {
						"format": "%Y-%m-%d"
					}
				}
			  },
			  "bindto": "#LineChart"
		  });
		this.setState({ chart })
	}

	componentWillReceiveProps(nextProps) {
		if (!_.isEqual(this.props.bitcoinHistory.bpi, nextProps.bitcoinHistory.bpi)) {
			const dates = _.map(nextProps.bitcoinHistory.bpi, (value, key) => key)
			const prices = _.map(nextProps.bitcoinHistory.bpi, (value) => value)
			this.state.chart.load({
				"columns": [
					[
						"x",
					...dates
				],
				[
					"prices",
					...prices
				]
			]
		});
	}
	}

	handleStartDateChange(date) {
		const dateRange = {
			startDate: date,
			endDate: this.props.dateRange.endDate
		}
		 this.props.setPriceHistory(dateRange)
	}

	handleEndDateChange(date) {
		const dateRange = {
			endDate: date,
			startDate: this.props.dateRange.startDate
		}
		this.props.setPriceHistory(dateRange)
	}

    render() {
        return (
            <div>
                <div id="LineChart"></div>
				<DatePicker
        			selected={ this.props.dateRange.startDate}
        			onChange={this.handleStartDateChange.bind(this)}
    			/>
				<DatePicker
        			selected={ this.props.dateRange.endDate}
        			onChange={this.handleEndDateChange.bind(this)}
    			/>
            </div>
        );
    }
}

export default Chart;
