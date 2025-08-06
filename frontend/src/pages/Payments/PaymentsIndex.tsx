import { useEffect, useState } from 'react';
import axiosClient from '../../store/axiosClient';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { formatDate, viewCurrency } from '../../helpers/helper';
import { PageCirclePrimaryLoader } from '../../components/loading/PageLoading';
import { PageLoadError } from '../../components/loading/Errors';
import { getTechAbr } from '../../helpers/helper';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { SmallDangerLoader } from '../../components/loading/SmallCirculeLoader';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useDispatch } from 'react-redux';
import { ButtonLoader } from '../../components/loading/ButtonLoader';
import { graphConfig } from './config/graphConfig';
import { canDeletePayment } from '../../helpers/gate';

const PaymentsIndex = () => {
	const [loadingStatus, setLoadingStatus] = useState<string>('success');
	const [newDateStatus, setNewDateStatus] = useState<string>('success');
	const [startDate, setstartDate] = useState(moment().subtract(30, 'days').format('MM/DD/YYYY'));
	const [endDate, setendDate] = useState(moment().format('MM/DD/YYYY'));
	const [payments, setPayments] = useState<any[]>([]);
	const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
	const [filteredItems, setFilteredItems] = useState<any[]>([]);
	const [techs, setTechs] = useState<any[]>([]);
	const [selectedTechs, setSelectedTechs] = useState<any[]>([]);
	const [paymentRemoveStatus, setPaymentRemoveStatus] = useState(0);
	const isDark = useSelector((state: IRootState) => state.themeConfig.isDarkMode);
	const user = useSelector((state: IRootState) => state.themeConfig.user);
	const dispatch = useDispatch();

	// New static date
	const [groupPaymentsByType, setGroupPaymentsByType] = useState<any[]>([]);

	useEffect(() => {
		dispatch(setPageTitle('Payments'));
	}, []);

	const [series, setSeries] = useState<any[]>([]);
	const [options, setOptions] = useState<any>(graphConfig(isDark));

	useEffect(() => {
		// Фильтруем по выбранным техникам
		const filtered = techs.filter((item: any) => selectedTechs.includes(item.tech.id));
		const newSeries = filtered.map((item: any) => ({
			name: item.tech.name,
			data: item.amounts,
			color: item.tech.color,
		}));
		setSeries(newSeries);
		setFilteredPayments(payments.filter((payment: any) => selectedTechs.includes(payment.tech.id)));
	}, [selectedTechs]);

	const getPayments = () => {
		setLoadingStatus('loading');
		axiosClient
			.get('/payments', { params: { startDate, endDate } })
			.then((response) => {
				console.log(response.data);
				setGroupPaymentsByType(response.data.totalByType);
				setPayments(response.data.payments);

				const { dates, techs } = response.data.techsPaymentsByDate;

				const allTechs = techs.map((tech: any) => tech);
				setTechs(allTechs);

				setSelectedTechs(allTechs.map((item: any) => item.tech.id));

				const labels = dates.map((date: string) => formatDate(date, 'DD MMM'));

				setOptions((prev: any) => ({
					...prev,
					labels,
				}));

				setLoadingStatus('success');
			})
			.catch((error) => {
				console.log(error);
				setLoadingStatus('error');
			});
	};

	useEffect(() => {
		getPayments();
	}, [startDate, endDate]);

	const toogleViewTech = (techId: number) => {
		if (selectedTechs.includes(techId)) {
			if (selectedTechs.length === 1) return;
			setSelectedTechs(selectedTechs.filter((id) => id !== techId));
		} else {
			setSelectedTechs([...selectedTechs, techId]);
		}
	};

	useEffect(() => {
		setOptions({
			...options,

			grid: {
				...options.grid,
				borderColor: isDark ? '#191E3A' : '#E0E6ED',
			},
			fill: {
				...options.fill,
				gradient: {
					...options.fill.gradient,
					opacityFrom: isDark ? 0.19 : 0.28,
				},
			},
		});
	}, [isDark]);

	const removePaymentHandler = (paymentId: number) => {
		if (!confirm('Are you sure you want to delete this payment?')) return;
		setPaymentRemoveStatus(paymentId);

		axiosClient
			.delete('/payments/' + paymentId)
			.then((response) => {
				setFilteredPayments(filteredPayments.filter((payment) => payment.id !== paymentId));
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setPaymentRemoveStatus(0);
			});
	};

	return (
		<div>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<div className="grid grid-flow-row gap-4">
					<div className="flex justify-start items-center text-lg">
						<h1>Payments</h1>
						<div className="ml-3 p-2 dark:bg-gray-900 bg-gray-200 rounded cursor-pointer">
							From:
							<Flatpickr
								options={{ dateFormat: 'm/d/Y' }}
								value={startDate}
								onChange={(date) => {
									setstartDate(moment(date[0]).format('MM/DD/YYYY'));
								}}
								className="border-0 bg-transparent text-primary dark:text-white ml-3 w-32"
							/>
							To:
							<Flatpickr
								options={{ dateFormat: 'm/d/Y' }}
								value={endDate}
								onChange={(date) => {
									setendDate(moment(date[0]).format('MM/DD/YYYY'));
								}}
								className="border-0 bg-transparent text-primary dark:text-white ml-3 w-32"
							/>
						</div>
						{newDateStatus === 'loading' && <ButtonLoader />}
					</div>
					<div className="panel p-2">
						<ul className="">
							{techs.map((item: any, index: number) => (
								<li
									key={index}
									className={
										'p-2 float-left px-4 m-1 first:ml-0 flex cursor-pointer items-center ' +
										(selectedTechs.includes(item.tech.id) ? 'dark:bg-success-dark-light' : 'dark:bg-gray-900') +
										'  bg-gray-100 rounded-md'
									}
									onClick={() => toogleViewTech(item.tech.id)}
								>
									<div className="mr-2">
										<span
											className={"flex justify-center items-center w-10 h-10 text-center rounded-full object-cover bg-'bg-danger text-white"}
											style={{ backgroundColor: item.tech.color }}
										>
											{getTechAbr(item.tech.name)}
										</span>
									</div>
									<div className="flex-grow ml-4">
										<p className="font-semibold">{item.tech.name}</p>
										<p className="font-semibold">{item.tech.phone}</p>
									</div>
								</li>
							))}
						</ul>
					</div>

					<div className="panel p-4">
						<h2>Graph</h2>
						<div>
							<ReactApexChart series={series} options={options} type="area" height={325} />
						</div>
					</div>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6 text-center">
						<div className="panel text-center col-span-2">
							Total per period
							<div className="text-[25px] font-bold mt-2">{viewCurrency(Object.values(groupPaymentsByType).reduce((sum, value) => sum + value, 0))}</div>
						</div>
						<div className="panel">
							Credit transaction
							<div className="text-[25px] font-bold mt-2">{viewCurrency(groupPaymentsByType[1] || 0)}</div>
						</div>
						<div className="panel">
							Transfer transaction
							<div className="text-[25px] font-bold mt-2">{viewCurrency(groupPaymentsByType[4] || 0)}</div>
						</div>
						<div className="panel">
							Cash transaction
							<div className="text-[25px] font-bold mt-2">{viewCurrency(groupPaymentsByType[2] || 0)}</div>
						</div>
						<div className="panel">
							Check transaction
							<div className="text-[25px] font-bold mt-2">{viewCurrency(groupPaymentsByType[3] || 0)}</div>
						</div>
					</div>

					<div className="panel p-0 overflow-hidden">
						<div className="table-responsive">
							<table className="table-striped table-hover">
								<thead>
									<tr>
										<th>ID</th>
										<th>Tech</th>
										<th>Customer</th>
										<th>Appointment</th>
										<th>Amount</th>
										<th>Day of payment</th>
										<th>Payment type</th>
										<th className="!text-center">Actions</th>
									</tr>
								</thead>
								<tbody>
									{filteredPayments.map((payment: any) => {
										return (
											<tr key={payment.id}>
												<td>{payment.id}</td>
												<td className="text-primary whitespace-nowrap">
													<span
														className={"flex justify-center items-center w-5 h-5 text-center text-[10px] rounded-full object-cover bg-'bg-danger text-white"}
														style={{ backgroundColor: payment.tech.color }}
													>
														{getTechAbr(payment.tech.name)}
													</span>
												</td>
												<td className="text-primary whitespace-nowrap">
													<Link to={'/customer/' + payment.customer?.id || '0'}>{payment.customer ? payment.customer.name : 'Unknow'}</Link>
												</td>
												<td className="text-primary whitespace-nowrap">
													<Link to={'/appointment/' + payment.appointment?.id || '0'}>
														Appointment at {payment.appointment ? formatDate(payment.appointment.start, 'MMM DD YYYY') : 'Unknow'}
													</Link>
												</td>
												<td className={'whitespace-nowrap' + (payment.amount > 0) ? 'text-success' : 'text-danger'}>{viewCurrency(payment.amount)}</td>
												<td>{moment(payment.created_at).format('DD MMM YYYY')}</td>
												<td>{payment.type_text}</td>
												<td>
													{canDeletePayment(user) && (
														<div className="flex justify-center">
															{paymentRemoveStatus === payment.id ? (
																<SmallDangerLoader />
															) : (
																<span className="text-primary cursor-pointer" onClick={() => removePaymentHandler(payment.id)}>
																	<IconTrashLines className="text-danger" />
																</span>
															)}
														</div>
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PaymentsIndex;
