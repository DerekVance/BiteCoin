import React, { Component } from 'react';
import d3 from 'd3';
import { bb } from 'billboard.js';
import 'react-widgets/lib/less/react-widgets.less';
import RwDateTimePicker from 'react-widgets/lib/DateTimePicker';

class Chart extends Component {
    componentDidMount() {
        console.log(typeof this.props.currentPriceUSD);
        var chart = bb.generate({
            "data": {
                "columns": [
                  [
                    "price",
                    this.props.currentPriceUSD
                  ]
                ]
            },
            "bindto": "#LineChart"
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        console.log("this props", this.props);
        if (nextProps.currentPriceUSD !== this.props.currentPriceUSD) {
            chart.load({
                data: {
		        columns: [
	                // ['data1', 230, 190, 300, 500, 300, 400]
                ]
            }
            });
        }
    }

    render() {

        return (
            <div>
                <div id="LineChart"></div>
                <RwDateTimePicker/>
            </div>
        );
    }
}

export default Chart;
