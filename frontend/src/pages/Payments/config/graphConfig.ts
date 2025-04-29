import { viewCurrency } from '../../../helpers/helper';

export const graphConfig = (isDark: boolean) => {
	return {
		chart: {
			height: 325,
			type: 'area',
			fontFamily: 'Nunito, sans-serif',
			zoom: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
		},

		dataLabels: {
			enabled: false,
		},
		stroke: {
			show: true,
			curve: 'smooth',
			width: 2,
			lineCap: 'square',
		},
		dropShadow: {
			enabled: true,
			opacity: 0.2,
			blur: 10,
			left: -7,
			top: 22,
		},
		colors: [],
		labels: [],
		xaxis: {
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			crosshairs: {
				show: true,
			},
			labels: {
				offsetY: 5,
				style: {
					fontSize: '12px',
					cssClass: 'apexcharts-xaxis-title',
				},
			},
		},
		yaxis: {
			tickAmount: 7,
			labels: {
				formatter: (value: number) => {
					//if (value >= 1000) return '$' + (Math.round((value / 10)) / 100) + 'k';
					return viewCurrency(value);
				},
				offsetX: -10,
				offsetY: 0,
				style: {
					fontSize: '12px',
					cssClass: 'apexcharts-yaxis-title',
				},
			},
		},
		grid: {
			borderColor: isDark ? '#191E3A' : '#E0E6ED',
			strokeDashArray: 5,
			xaxis: {
				lines: {
					show: true,
				},
			},
			yaxis: {
				lines: {
					show: false,
				},
			},
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
			},
		},
		legend: {
			show: false,
		},
		tooltip: {
			marker: {
				show: true,
			},
			x: {
				show: false,
			},
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				inverseColors: !1,
				opacityFrom: isDark ? 0.19 : 0.28,
				opacityTo: 0.05,
				stops: isDark ? [100, 100] : [45, 100],
			},
		},
	};
};
