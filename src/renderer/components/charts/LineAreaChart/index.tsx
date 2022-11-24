import React from 'react';
import ReactApexChart from 'react-apexcharts';

type ChartProps = {
	[x: string]: any;
};
type ChartState = {
	chartData: any[];
	chartOptions: any;
};

class LineChart extends React.Component<ChartProps, ChartState> {
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
			<ReactApexChart
				options={this.state.chartOptions}
				series={this.state.chartData}
				type='area'
				width='100%'
				height='100%'
			/>
		);
	}
}

export default LineChart;
