import React from 'react';
import Chart from 'react-apexcharts';

type ChartProps = {
	[x: string]: any;
};
type ChartState = {
	chartData: any[];
	chartOptions: any;
};

class BubbleChart extends React.Component<ChartProps, ChartState> {
	constructor(props: { chartData: any[]; chartOptions: any }) {
		super(props);
		this.state = {
			chartData: [],
			chartOptions: {}
		};
	}

	componentDidMount() {
		this.setState({
			chartData: this.props.chartData,
			chartOptions: this.props.chartOptions
		});
	}

	render() {
		return (
			<Chart
				options={this.state.chartOptions}
				series={this.state.chartData}
				type='bubble'
				width='100%'
				height='100%'
			/>
		);
	}
}

export default BubbleChart;
