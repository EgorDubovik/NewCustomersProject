import ReactApexChart from 'react-apexcharts';
import { viewCurrency } from '../../helpers/helper';

const DaylyOfWeek = (props: any) => {
	const isDark = true;
	const apexOptions: any = {
		chart: {
			height: 300,
			type: 'bar',
			zoom: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
		},
		colors: ['#805dca', '#e7515a'],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent'],
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '55%',
				endingShape: 'rounded',
			},
		},
		grid: {
			borderColor: isDark ? '#191e3a' : '#e0e6ed',
		},
		xaxis: {
			categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			axisBorder: {
				color: isDark ? '#191e3a' : '#e0e6ed',
			},
		},
		yaxis: {
			opposite: false,
			labels: {
				offsetX: 0,
			},
		},
		tooltip: {
			theme: isDark ? 'dark' : 'light',
			y: {
				formatter: function (val: any) {
					return viewCurrency(val);
				},
			},
		},
	};

	const apexSeries: any = [
		{
			name: 'Profit',
			data: props.series,
		},
	];
	return (
		<div className="panel">
			<h5 className="text-lg font-semibold dark:text-white">This week</h5>
			<div className="">
				<ReactApexChart options={apexOptions} series={apexSeries} type="bar" height={200} className="rounded-lg bg-white dark:bg-black overflow-hidden" />
			</div>
		</div>
	);
};

export default DaylyOfWeek;
