// Sidebar

export const lineChartDataSidebar = [
	{
		name: 'Balance',
		data: [ 10, 39, 80, 50, 10 ]
	},
	{
		name: 'Profit',
		data: [ 20, 60, 30, 40, 20 ]
	}
];

export const lineChartOptionsSidebar = {
	chart: {
		toolbar: {
			show: false
		}
	},
	markers: {
		size: 0,
		colors: '#868CFF',
		strokeColors: 'white',
		strokeWidth: 2,
		strokeOpacity: 0.9,
		strokeDashArray: 0,
		fillOpacity: 1,
		// discrete: [],
		shape: 'circle',
		radius: 2,
		offsetX: 0,
		offsetY: 0,
		showNullDataPoints: true
	},
	tooltip: {
		theme: 'dark'
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth',
		type: 'gradient'
	},
	xaxis: {
		categories: [ 'Sat', 'Sun', 'Mon', 'Tue', 'Wed' ],
		labels: {
			style: {
				colors: 'white',
				fontSize: '12px',
				fontWeight: '500'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: false
	},
	legend: {
		show: false
	},
	grid: {
		show: false,
		column: {
			colors: [ 'transparent' ], // takes an array which will be repeated on columns
			opacity: 0.5
		}
	},
	fill: {
		type: 'gradient',
		gradient: {
			type: 'vertical',
			shadeIntensity: 0.1,
			opacityFrom: 0.3,
			opacityTo: 0.9,
			colorStops: [
				[
					{
						offset: 0,
						color: 'white',
						opacity: 1
					},
					{
						offset: 100,
						color: 'white',
						opacity: 0
					}
				],
				[
					{
						offset: 0,
						color: '#6AD2FF',
						opacity: 1
					},
					{
						offset: 100,
						color: '#6AD2FF',
						opacity: 0.2
					}
				]
			]
		}
	}
};

// Overall Revenue Dashboards Default

export const lineChartDataOverallRevenue = [
	{
		name: 'Revenue',
		data: [ 50, 64, 48, 66, 49, 68 ]
	},
	{
		name: 'Profit',
		data: [ 30, 40, 24, 46, 20, 46 ]
	}
];

export const lineChartOptionsOverallRevenue = {
	chart: {
		toolbar: {
			show: false
		},
		dropShadow: {
			enabled: true,
			top: 13,
			left: 0,
			blur: 10,
			opacity: 0.1,
			color: '#4318FF'
		}
	},
	colors: [ '#4318FF', '#39B8FF' ],
	markers: {
		size: 0,
		colors: 'white',
		strokeColors: '#7551FF',
		strokeWidth: 3,
		strokeOpacity: 0.9,
		strokeDashArray: 0,
		fillOpacity: 1,
		// discrete: [],
		shape: 'circle',
		radius: 2,
		offsetX: 0,
		offsetY: 0,
		showNullDataPoints: true
	},
	tooltip: {
		theme: 'dark'
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth',
		type: 'line'
	},
	xaxis: {
		type: 'numeric',
		categories: [ 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB' ],
		labels: {
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: false
	},
	legend: {
		show: false
	},
	grid: {
		show: false,
		column: {
			color: [ '#7551FF', '#39B8FF' ],
			opacity: 0.5
		}
	},
	color: [ '#7551FF', '#39B8FF' ]
};

// Daily Traffic Dashboards Default

export const barChartDataDailyTraffic = [
	{
		name: 'Daily Traffic',
		data: [ 20, 30, 40, 20, 45, 50, 30 ]
	}
];

export const barChartOptionsDailyTraffic = {
	chart: {
		toolbar: {
			show: false
		}
	},
	tooltip: {
		style: {
			fontSize: '12px'
		},
		onDatasetHover: {
			style: {
				fontSize: '12px'
			}
		},
		theme: 'dark'
	},
	xaxis: {
		categories: [ '00', '04', '08', '12', '14', '16', '18' ],
		show: false,
		labels: {
			show: true,
			style: {
				colors: '#A3AED0',
				fontSize: '14px',
				fontWeight: '500'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: false,
		color: 'black',
		labels: {
			show: true,
			style: {
				colors: '#CBD5E0',
				fontSize: '14px'
			}
		}
	},
	grid: {
		show: false,
		strokeDashArray: 5,
		yaxis: {
			lines: {
				show: true
			}
		},
		xaxis: {
			lines: {
				show: false
			}
		}
	},
	fill: {
		type: 'gradient',
		gradient: {
			type: 'vertical',
			shadeIntensity: 1,
			opacityFrom: 0.7,
			opacityTo: 0.9,
			colorStops: [
				[
					{
						offset: 0,
						color: '#4318FF',
						opacity: 1
					},
					{
						offset: 100,
						color: 'rgba(67, 24, 255, 1)',
						opacity: 0.28
					}
				]
			]
		}
	},
	dataLabels: {
		enabled: false
	},
	plotOptions: {
		bar: {
			borderRadius: 10,
			columnWidth: '40px'
		}
	}
};

// Daily Traffic Dashboards Default

export const barChartDataHoursSpent = [
	{
		name: 'Hours Spent',
		data: [ 2.7, 2.3, 5, 6, 4, 3 ]
	}
];

export const barChartOptionsHoursSpent = {
	chart: {
		toolbar: {
			show: false
		}
	},
	tooltip: {
		style: {
			fontSize: '12px'
		},
		onDatasetHover: {
			style: {
				fontSize: '12px'
			}
		},
		theme: 'dark'
	},
	xaxis: {
		categories: [ 'S', 'M', 'T', 'W', 'T', 'F' ],
		show: false,
		labels: {
			show: true,
			style: {
				colors: '#A3AED0',
				fontSize: '14px',
				fontWeight: '500'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: true,
		color: 'black',
		labels: {
			show: true,
			style: {
				colors: '#CBD5E0',
				fontSize: '14px'
			}
		}
	},
	grid: {
		borderColor: 'rgba(163, 174, 208, 0.3)',
		show: true,
		yaxis: {
			lines: {
				show: true,
				opacity: 0.5
			}
		},
		row: {
			opacity: 0.5
		},
		xaxis: {
			lines: {
				show: false
			}
		}
	},
	fill: {
		type: 'solid',
		colors: [ '#5E37FF' ],
		opacity: 1
	},
	dataLabels: {
		enabled: false
	},
	plotOptions: {
		bar: {
			borderRadius: 10,
			columnWidth: '40px'
		}
	}
};

// Project Default Dashboards Default

export const lineChartDataProjectStatus = [
	{
		name: 'Projects',
		data: [ 20, 30, 28, 32, 29, 36, 40 ]
	}
];

export const lineChartOptionsProjectStatus = {
	chart: {
		toolbar: {
			show: false
		},
		dropShadow: {
			enabled: true,
			top: 13,
			left: 0,
			blur: 10,
			opacity: 0.1,
			color: '#4318FF'
		}
	},
	colors: [ '#4318FF' ],
	markers: {
		size: 0,
		colors: 'white',
		strokeColors: '#4318FF',
		strokeWidth: 2,
		strokeOpacity: 0.9,
		strokeDashArray: 0,
		fillOpacity: 1,
		// discrete: [],
		shape: 'circle',
		radius: 2,
		offsetX: 0,
		offsetY: 0,
		showNullDataPoints: true
	},
	tooltip: {
		theme: 'dark'
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth',
		type: 'gradient'
	},
	xaxis: {
		categories: [ 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri' ],
		labels: {
			style: {
				colors: '#A3AED0',
				fontSize: '14px',
				fontWeight: '500'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: false
	},
	legend: {
		show: false
	},
	dropShadow: {
		enabled: true,
		top: 0,
		left: 0,
		blur: 3,
		opacity: 0.5
	},
	grid: {
		show: false,
		column: {
			colors: [ 'transparent' ], // takes an array which will be repeated on columns
			opacity: 0.5
		}
	}
};

// Mini Area Chart Green
export const lineChartDataMiniArea1 = [
	{
		name: 'Price',
		data: [ 100, 250, 300, 220, 280, 250, 300, 230, 300, 350, 250, 350 ]
	}
];

export const lineChartOptionsMiniArea1 = {
	chart: {
		height: '70px',
		toolbar: {
			show: false
		},
		redrawOnParentResize: true
	},
	tooltip: {
		enabled: false,
		theme: 'dark'
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth',
		width: 3.5
	},
	xaxis: {
		type: 'datetime',
		categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		labels: {
			show: false,
			style: {
				colors: '#c8cfca',
				fontSize: '12px'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: false,
		labels: {
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		}
	},
	legend: {
		show: false
	},
	grid: {
		show: false,
		strokeDashArray: 5,
		borderColor: '#56577A'
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'dark',
			type: 'horizontal',
			shadeIntensity: 0,

			inverseColors: true,
			opacityFrom: 0,
			opacityTo: 0.8
		},
		colors: [ '#01B574' ]
	},
	colors: [ '#01B574' ]
};

// Mini Area Chart Red
export const lineChartDataMiniArea2 = [
	{
		name: 'Price',
		data: [ 120, 220, 275, 290, 372, 316 ]
	}
];

export const lineChartOptionsMiniArea2 = {
	chart: {
		height: '20px',
		toolbar: {
			show: false
		},
		redrawOnParentResize: true
	},
	tooltip: {
		theme: 'dark',
		enabled: false
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth',
		width: 3.5
	},
	xaxis: {
		show: false,
		type: 'datetime',
		categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun' ],
		labels: {
			show: false,
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: false,
		labels: {
			style: {
				colors: '#EE5D50',
				fontSize: '12px'
			}
		}
	},
	legend: {
		show: false
	},
	grid: {
		show: false,
		strokeDashArray: 5,
		borderColor: '#56577A'
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'dark',
			type: 'horizontal',
			shadeIntensity: 0,

			inverseColors: true,
			opacityFrom: 0,
			opacityTo: 0.8
		},
		colors: [ '#EE5D50' ]
	},
	colors: [ '#EE5D50' ]
};

// User Activity Users Reports

export const barChartDataUserActivity = [
	{
		name: 'PRODUCT A',
		data: [ 70, 55, 41, 67, 22, 43 ]
	},
	{
		name: 'PRODUCT B',
		data: [ 90, 70, 60, 50, 80, 90 ]
	}
];

export const barChartOptionsUserActivity = {
	chart: {
		stacked: true,
		toolbar: {
			show: false
		}
	},
	tooltip: {
		style: {
			fontSize: '12px'
		},
		onDatasetHover: {
			style: {
				fontSize: '12px'
			}
		},
		theme: 'dark'
	},
	xaxis: {
		categories: [ 'S', 'M', 'T', 'W', 'T', 'F' ],
		show: false,
		labels: {
			show: true,
			style: {
				colors: '#A3AED0',
				fontSize: '14px',
				fontWeight: '500'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: true,
		color: 'black',
		labels: {
			show: true,
			style: {
				colors: '#A3AED0',
				fontSize: '14px',
				fontWeight: '500'
			}
		}
	},

	grid: {
		borderColor: 'rgba(163, 174, 208, 0.3)',
		show: true,
		yaxis: {
			lines: {
				show: true,
				opacity: 0.5
			}
		},
		row: {
			opacity: 0.5
		},
		xaxis: {
			lines: {
				show: false
			}
		}
	},
	fill: {
		type: 'solid',
		colors: [ '#5E37FF', '#6AD2FF' ]
	},
	legend: {
		show: false
	},
	colors: [ '#5E37FF', '#6AD2FF' ],
	dataLabels: {
		enabled: false
	},
	plotOptions: {
		bar: {
			borderRadius: 10,
			columnWidth: '30px'
		}
	}
};
// Consumption Users Reports

export const barChartDataConsumption = [
	{
		name: 'PRODUCT A',
		data: [ 400, 370, 330, 390, 320, 350, 360, 320, 380 ]
	},
	{
		name: 'PRODUCT B',
		data: [ 400, 370, 330, 390, 320, 350, 360, 320, 380 ]
	},
	{
		name: 'PRODUCT C',
		data: [ 400, 370, 330, 390, 320, 350, 360, 320, 380 ]
	}
];

export const barChartOptionsConsumption = {
	chart: {
		stacked: true,
		toolbar: {
			show: false
		}
	},
	tooltip: {
		style: {
			fontSize: '12px'
		},
		onDatasetHover: {
			style: {
				fontSize: '12px'
			}
		},
		theme: 'dark'
	},
	xaxis: {
		categories: [ '17', '18', '19', '20', '21', '22', '23', '24', '25' ],
		show: false,
		labels: {
			show: true,
			style: {
				colors: '#A3AED0',
				fontSize: '14px',
				fontWeight: '500'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: false,
		color: 'black',
		labels: {
			show: false,
			style: {
				colors: '#A3AED0',
				fontSize: '14px',
				fontWeight: '500'
			}
		}
	},

	grid: {
		borderColor: 'rgba(163, 174, 208, 0.3)',
		show: true,
		yaxis: {
			lines: {
				show: false,
				opacity: 0.5
			}
		},
		row: {
			opacity: 0.5
		},
		xaxis: {
			lines: {
				show: false
			}
		}
	},
	fill: {
		type: 'solid',
		colors: [ '#5E37FF', '#6AD2FF', '#E1E9F8' ]
	},
	legend: {
		show: false
	},
	colors: [ '#5E37FF', '#6AD2FF', '#E1E9F8' ],
	dataLabels: {
		enabled: false
	},
	plotOptions: {
		bar: {
			borderRadius: 10,
			columnWidth: '20px'
		}
	}
};

// Line Chart Car Interface
export const lineChartDataAreaCarInterface = [
	{
		name: 'Price',
		data: [ 40, 50, 30, 44, 40 ]
	}
];

export const lineChartOptionsAreaCarInterface = {
	chart: {
		height: '70px',
		toolbar: {
			show: false
		},
		redrawOnParentResize: true
	},
	tooltip: {
		enabled: false,
		theme: 'dark'
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth',
		width: 3.5
	},
	xaxis: {
		type: 'datetime',
		categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May' ],
		labels: {
			show: false,
			style: {
				colors: '#c8cfca',
				fontSize: '12px'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: false,
		labels: {
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		}
	},
	legend: {
		show: false
	},
	grid: {
		show: false,
		strokeDashArray: 5,
		borderColor: '#56577A'
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'dark',
			type: 'vertical',
			shadeIntensity: 0,

			inverseColors: true,
			opacityFrom: 0.4,
			opacityTo: 0
		},
		colors: [ '#707EAE' ]
	},
	colors: [ '#707EAE' ]
};

// Line Chart Events Calendar
export const lineChartDataAreaEventsCalendar = [
	{
		name: 'Price',
		data: [ 100, 250, 300, 220, 280, 250, 300, 230, 300, 350, 250, 350 ]
	}
];

export const lineChartOptionsAreaEventsCalendar = {
	chart: {
		height: '70px',
		toolbar: {
			show: false
		},
		redrawOnParentResize: true
	},
	tooltip: {
		enabled: false,
		theme: 'dark'
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth',
		width: 3.5
	},
	xaxis: {
		type: 'datetime',
		categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		labels: {
			show: false,
			style: {
				colors: '#c8cfca',
				fontSize: '12px'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: false,
		labels: {
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		}
	},
	legend: {
		show: false
	},
	grid: {
		show: false,
		strokeDashArray: 5,
		borderColor: '#56577A'
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'dark',
			type: 'vertical',
			shadeIntensity: 0,

			inverseColors: true,
			opacityFrom: 0.6,
			opacityTo: 0
		},
		colors: [ '#707EAE' ]
	},
	colors: [ '#707EAE' ]
};

export const pieChartOptions = {
	labels: [ 'Your files', 'System', 'Empty' ],
	colors: [ '#4318FF', '#6AD2FF', '#EFF4FB' ],
	chart: {
		width: '50px'
	},
	states: {
		hover: {
			filter: {
				type: 'none'
			}
		}
	},
	legend: {
		show: false
	},
	dataLabels: {
		enabled: false
	},
	// hover: { mode: null },
	plotOptions: {
		donut: {
			expandOnClick: false,
			donut: {
				labels: {
					show: false
				}
			}
		}
	},
	fill: {
		colors: [ '#4318FF', '#6AD2FF', '#EFF4FB' ]
	},
	tooltip: {
		enabled: true,
		theme: 'dark'
	}
};

export const pieChartData = [ 63, 25, 12 ];

// Past examples
// Past examples
// Past examples
// Past examples
// Past examples
// Past examples
// Past examples
// Past examples
// Past examples
// Past examples
// Past examples
// Past examples
// Past examples
// Past examples
// Past examples
// Past examples

export const donutChartOptionsGeneral = {
	series: [ 75, 25 ],
	labels: [ 'Done', 'In progress' ],
	colors: [ '#3182CE', 'lightgray' ],
	chart: {
		height: 500,
		width: '100%'
	},
	states: {
		hover: {
			filter: {
				type: 'none'
			}
		}
	},
	legend: {
		show: false
	},
	dataLabels: {
		enabled: false
	},
	plotOptions: {
		donut: {
			expandOnClick: false,
			donut: {
				labels: {
					show: false
				}
			}
		}
	},
	fill: {
		colors: [ '#3182CE', 'lightgray' ]
	},
	tooltip: {
		enabled: true,
		theme: 'dark'
	}
};

export const donutChartDataGeneral = [ 75, 25 ];

export const barChartDataCharts1 = [
	{
		name: 'Sales by age',
		data: [ 20, 30, 40, 20, 45, 30 ]
	}
];

export const barChartOptionsCharts1 = {
	chart: {
		toolbar: {
			show: false
		}
	},
	tooltip: {
		style: {
			fontSize: '12px'
		},
		onDatasetHover: {
			style: {
				fontSize: '12px'
			}
		},
		theme: 'dark'
	},
	xaxis: {
		categories: [ '16-20', '21-25', '26-30', '31-35', '36-42', '42+' ],
		show: true,
		labels: {
			show: true,
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: true,
		color: 'black',
		labels: {
			show: true,
			style: {
				colors: '#CBD5E0',
				fontSize: '14px'
			}
		}
	},
	grid: {
		strokeDashArray: 5,
		yaxis: {
			lines: {
				show: true
			}
		},
		xaxis: {
			lines: {
				show: false
			}
		}
	},
	fill: {
		type: 'solid',
		colors: [ '#000000' ]
	},
	dataLabels: {
		enabled: false
	},
	plotOptions: {
		bar: {
			borderRadius: 8,
			columnWidth: '40px'
		}
	}
};

export const barChartDataCharts2 = [
	{
		name: 'Sales by age',
		data: [ 20, 30, 40, 20, 45 ]
	}
];

export const barChartOptionsCharts2 = {
	chart: {
		toolbar: {
			show: false
		}
	},
	tooltip: {
		style: {
			fontSize: '12px'
		},
		onDatasetHover: {
			style: {
				fontSize: '12px'
			}
		},
		theme: 'dark'
	},
	xaxis: {
		categories: [ '16-20', '21-26', '26-30', '31-42', '42+' ],
		show: true,
		labels: {
			show: true,
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: true,
		color: 'black',
		labels: {
			show: true,
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		}
	},
	grid: {
		strokeDashArray: 5,
		yaxis: {
			lines: {
				show: true
			}
		},
		xaxis: {
			lines: {
				show: false
			}
		}
	},
	fill: {
		type: 'solid',
		colors: [ '#000000' ]
	},
	dataLabels: {
		enabled: false
	},
	plotOptions: {
		bar: {
			horizontal: true,
			borderRadius: 8,
			columnWidth: '40px'
		}
	}
};

export const lineBarChartData = [
	{
		name: 'Organic Search',
		type: 'bar',
		data: [ 440, 505, 414, 671, 160, 550, 350, 138 ]
	},
	{
		name: 'Referral',
		type: 'line',
		data: [ 232, 421, 352, 273, 143, 222, 173, 311 ]
	}
];

export const lineBarChartOptions = {
	chart: {
		toolbar: {
			show: false
		}
	},
	tooltip: {
		theme: 'dark'
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth'
	},
	xaxis: {
		type: 'datetime',
		categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		labels: {
			style: {
				colors: '#CBD5E0',
				fontSize: '12px'
			}
		}
	},
	yaxis: {
		labels: {
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		}
	},
	legend: {
		show: false
	},
	grid: {
		strokeDashArray: 5,
		yaxis: {
			lines: {
				show: true
			}
		},
		xaxis: {
			lines: {
				show: true
			}
		}
	},
	fill: {
		type: 'solid',
		gradient: {
			type: 'vertical',
			shadeIntensity: 0.5,

			inverseColors: true,
			opacityFrom: 0.8,
			opacityTo: 0
		},
		colors: [ '#000000', '#3182CE' ]
	},
	plotOptions: {
		bar: {
			borderRadius: 2,
			columnWidth: '8px'
		}
	},
	colors: [ '#000000', '#3182CE' ]
};

function generateData(baseval: number, count: number, yrange: { max: number; min: number }) {
	var i = 0;
	var series = [];
	while (i < count) {
		var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
		var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
		var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

		series.push([ x, y, z ]);
		baseval += 86400000;
		i++;
	}
	return series;
}

export const bubbleChartData = [
	{
		name: 'Dataset 1',
		data: generateData(new Date('11 Feb 2017 GMT').getTime(), 10, {
			min: 10,
			max: 30
		})
	},
	{
		name: 'Dataset 2',
		data: generateData(new Date('11 Feb 2017 GMT').getTime(), 10, {
			min: 10,
			max: 30
		})
	}
];

export const bubbleChartOptions = {
	chart: {
		toolbar: {
			show: false
		}
	},
	tooltip: {
		theme: 'dark'
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth'
	},
	xaxis: {
		type: 'datetime',
		labels: {
			style: {
				colors: '#CBD5E0',
				fontSize: '12px'
			}
		}
	},
	yaxis: {
		labels: {
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		}
	},
	legend: {
		show: false
	},
	grid: {
		strokeDashArray: 5,
		yaxis: {
			lines: {
				show: true
			}
		},
		xaxis: {
			lines: {
				show: true
			}
		}
	},
	fill: {
		type: 'solid',
		gradient: {
			type: 'vertical',
			shadeIntensity: 0.5,

			inverseColors: true,
			opacityFrom: 0.8,
			opacityTo: 0
		},
		colors: [ '#000000', '#3182CE' ]
	},
	plotOptions: {
		bar: {
			borderRadius: 2,
			columnWidth: '8px'
		}
	},
	colors: [ '#000000', '#3182CE' ]
};

export const donutChartOptionsCharts1 = {
	series: [ 50, 15, 10, 20, 5 ],
	labels: [ 'Dev.to', 'Creative Tim', 'Github', 'Bootsnipp', 'Codeinwp' ],
	colors: [ '#63B3ED', '#4299E1', '#3182CE', '#2B6CB0', '#2C5282', '#2A4365' ],
	chart: {
		width: '100%'
	},
	states: {
		hover: {
			filter: {
				type: 'none'
			}
		}
	},
	legend: {
		show: false
	},
	dataLabels: {
		enabled: false
	},
	plotOptions: {
		donut: {
			expandOnClick: false,
			donut: {
				labels: {
					show: false
				}
			}
		}
	},

	fill: {
		colors: [ '#63B3ED', '#4299E1', '#3182CE', '#2B6CB0', '#2C5282', '#2A4365' ]
	},
	tooltip: {
		enabled: true,
		theme: 'dark'
	}
};

export const donutChartDataCharts1 = [ 50, 15, 10, 20, 5 ];

export const pieChartOptionsCharts1 = {
	labels: [ 'Dev.to', 'Creative Tim', 'Github' ],
	colors: [ '#4299E1', '#3182CE', '#2B6CB0' ],
	chart: {
		width: '100%'
	},
	states: {
		hover: {
			filter: {
				type: 'none'
			}
		}
	},
	legend: {
		show: false
	},
	dataLabels: {
		enabled: false
	},
	plotOptions: {
		donut: {
			expandOnClick: false,
			donut: {
				labels: {
					show: false
				}
			}
		}
	},
	fill: {
		colors: [ '#4299E1', '#3182CE', '#2B6CB0' ]
	},
	tooltip: {
		enabled: true,
		theme: 'dark'
	}
};

export const pieChartDataCharts1 = [ 70, 10, 20 ];

export const radarChartOptionsCharts = {
	chart: {
		type: 'radar',
		toolbar: {
			show: false
		},
		width: '100%'
	},
	labels: [ 'Travel', 'Shopping', 'Food', 'Grocery', 'Security', 'Others' ],
	colors: [ '#3182CE', '#333' ],
	states: {
		hover: {
			filter: {
				type: 'none'
			}
		}
	},
	yaxis: {
		show: false
	},
	markers: {
		show: false,
		enabled: false
	},
	xaxis: {
		labels: {
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		}
	},
	stroke: {
		show: true,
		width: 2,
		colors: [ '#000000', '#333' ],
		dashArray: 0
	},
	legend: {
		show: false
	},
	dataLabels: {
		enabled: false
	},
	fill: {
		colors: [ '#000000', '#333' ]
	},
	tooltip: {
		enabled: true,
		theme: 'dark'
	}
};

export const radarChartDataCharts = [
	{
		name: 'Subject 1',
		data: [ 45, 52, 38, 24, 33, 10 ]
	},
	{
		name: 'Subject 2',
		data: [ 26, 21, 20, 6, 8, 15 ]
	}
];

export const polarChartOptionsCharts = {
	chart: {
		type: 'polarArea',
		toolbar: {
			show: false
		},
		width: '100%'
	},
	labels: [ 'Subject 1', 'Subject2', 'Subject 3', 'Subject 4' ],
	colors: [ '#4299E1', '#3182CE', '#2B6CB0', '#2C5282' ],
	states: {
		hover: {
			filter: {
				type: 'none'
			}
		}
	},
	yaxis: {
		show: false,
		labels: {
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		}
	},
	markers: {
		show: false,
		enabled: false
	},
	stroke: {
		show: true,
		width: 2,
		colors: [ '#4299E1', '#3182CE', '#2B6CB0', '#2C5282' ],
		dashArray: 0
	},
	legend: {
		show: false
	},
	dataLabels: {
		enabled: false
	},
	fill: {
		type: 'solid',
		opacity: 1,
		colors: [ '#4299E1', '#3182CE', '#2B6CB0', '#2C5282' ]
	},
	tooltip: {
		enabled: true,
		theme: 'dark'
	}
};

export const polarChartDataCharts = [ 7, 14, 20, 25 ];

export const barChartDataSmartHome = [
	{
		name: 'Sales by day',
		data: [ 150, 200, 100, 300, 400, 170 ]
	}
];

export const barChartOptionsSmartHome = {
	chart: {
		toolbar: {
			show: false
		}
	},
	tooltip: {
		style: {
			fontSize: '12px'
		},
		onDatasetHover: {
			style: {
				fontSize: '12px'
			}
		},
		theme: 'dark'
	},
	xaxis: {
		categories: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ],
		show: true,
		labels: {
			show: true,
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: true,
		color: 'black',
		labels: {
			show: true,
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		}
	},
	grid: {
		strokeDashArray: 5,
		yaxis: {
			lines: {
				show: true
			}
		},
		xaxis: {
			lines: {
				show: false
			}
		}
	},
	fill: {
		type: 'solid',
		colors: [ '#A0AEC0' ]
	},
	dataLabels: {
		enabled: false
	},
	plotOptions: {
		bar: {
			borderRadius: 8,
			columnWidth: '20px'
		}
	}
};

// Total Spent Horizon Free

export const lineChartDataTotalSpent = [
	{
		name: 'Revenue',
		data: [ 50, 64, 48, 66, 49, 68 ]
	},
	{
		name: 'Profit',
		data: [ 30, 40, 24, 46, 20, 46 ]
	}
];

export const lineChartOptionsTotalSpent = {
	chart: {
		toolbar: {
			show: false
		},
		dropShadow: {
			enabled: true,
			top: 13,
			left: 0,
			blur: 10,
			opacity: 0.1,
			color: '#4318FF'
		}
	},
	colors: [ '#4318FF', '#39B8FF' ],
	markers: {
		size: 0,
		colors: 'white',
		strokeColors: '#7551FF',
		strokeWidth: 3,
		strokeOpacity: 0.9,
		strokeDashArray: 0,
		fillOpacity: 1,
		shape: 'circle',
		radius: 2,
		offsetX: 0,
		offsetY: 0,
		showNullDataPoints: true
	},
	tooltip: {
		theme: 'dark'
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth',
		type: 'line'
	},
	xaxis: {
		type: 'numeric',
		categories: [ 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB' ],
		labels: {
			style: {
				colors: '#A3AED0',
				fontSize: '12px',
				fontWeight: '500'
			}
		},
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	yaxis: {
		show: false
	},
	legend: {
		show: false
	},
	grid: {
		show: false,
		column: {
			color: [ '#7551FF', '#39B8FF' ],
			opacity: 0.5
		}
	},
	color: [ '#7551FF', '#39B8FF' ]
};
