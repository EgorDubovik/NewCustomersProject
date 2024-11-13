import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
import IconMapPin from '../../components/Icon/IconMapPin';
import IconPhone from '../../components/Icon/IconPhone';
import IconMail from '../../components/Icon/IconMail';
import IconSend from '../../components/Icon/IconSend';
import { useAppointmentContext } from './context/AppointmentContext';
import IconCopy from '../../components/Icon/IconCopy';
import { alertError, alertSuccsess, formatDate } from '../../helpers/helper';

const CustomerInfoBlock = (props: any) => {
	const navigate = useNavigate();
	const { appointment } = useAppointmentContext();

	const copyPhone = (phone: string) => {
		navigator.clipboard
			.writeText(phone)
			.then(() => {
				alertSuccsess('Phone number copied to clipboard');
			})
			.catch((err) => {
				alertError('Failed to copy phone number');
			});
	};

	const copyAddress = (address: string) => {
		navigator.clipboard
			.writeText(address)
			.then(() => {
				alertSuccsess('Address copied to clipboard');
			})
			.catch((err) => {
				alertError('Failed to copy address');
			});
	}

	return (
		<div className="panel p-0 pb-4">
			<div className="flex items-center justify-between p-4">
				<h3 className="font-semibold text-lg dark:text-white-light">
					<Link to={'/customer/' + appointment?.customer?.id} className="hover:underline">
						{appointment?.customer?.name}
					</Link>
				</h3>
				<Link to={'/customer/update/' + (appointment?.customer?.id ?? 0) + '?redirectTo=' + window.location.pathname} className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
					<IconPencilPaper className="w-4 h-4" />
				</Link>
			</div>
			<div className="mb-1">
				<div className="flex flex-col justify-center items-center ">
					<div className="w-full h-[200px] rounded flex justify-center items-center dark:bg-gray-800 bg-gray-200">Click here to view mini map</div>
				</div>
				<div className="px-4 pb-4">
					<ul className="mt-5 flex flex-col m-auto space-y-4 font-semibold dark:text-white-dark">
						<li className="flex justify-between">
							<div className='flex gap-2'>
								<IconMapPin className="shrink-0" />
								<span className='whitespace-nowrap'>
									<a href={`https://www.google.com/maps?q=${encodeURIComponent(appointment?.address)}`} target="_blank" rel="noopener noreferrer">
										{appointment?.address}
									</a>
								</span>
							</div>
							{appointment?.address && (
								<button onClick={() => copyAddress(appointment?.address || 'No data')}>
									<IconCopy className='cursor-pointer hover:text-primary'/>
								</button>
							)}
						</li>
						<li className="flex justify-between">
							<div className="flex gap-2">
								<IconPhone />
								<span className="whitespace-nowrap">
									<a href={`tel:${appointment?.customer.phone}`}>{appointment?.customer?.phone}</a>
								</span>
							</div>
							{appointment?.customer.phone && (
								<button onClick={() => copyPhone(appointment?.customer.phone || 'No data')}>
									<IconCopy className='cursor-pointer hover:text-primary' />
								</button>
							)}
						</li>
						<li>
							{appointment?.customer?.email ? (
								<button className="flex justify-between w-full" onClick={() => navigate('/invoice/send/' + appointment?.id)}>
									<div className="flex gap-2">
										<IconMail className="w-5 h-5 shrink-0" />
										<span className="truncate">{appointment?.customer?.email}</span>
									</div>
									
										<div className="flex gap-2 hover:text-primary">
											<IconSend className="w-5 h-5 shrink-0" />
											Send Invoice
										</div>
								</button>
							): (
								<div className="flex justify-between gap-2">
									<div className='flex gap-2'>
										<IconMail className="w-5 h-5 shrink-0" />
										<span className="truncate">No email</span>
									</div>
									<Link to={'/customer/update/' + (appointment?.customer?.id ?? 0) + '?redirectTo=' + window.location.pathname} className="text-primary">
										Please Add email
									</Link>
								</div>
							)}
						</li>
						<div className='border-t border-[#ebedf2] dark:border-[#191e3a] mt-4'></div>
						<div className="mt-2">
							<div className="text-left">Invoices ({appointment?.job?.invoices.length || 0})</div>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
								{appointment?.job?.invoices.map((invoice) => (
									<div key={invoice.id} className='w-full hover:dark:bg-white-dark/10 hover:bg-gray-200 bg-gray-100 hover:text-primary dark:bg-white-dark/5 p-2 rounded'>
										<Link to={'/invoice/' + invoice.id} className="">
											#{invoice.id}
											<span className='ml-1'> at {formatDate(invoice.created_at, 'MMM DD YYYY')}</span>
										</Link>
										
									</div>
								))}
							</div>
						</div>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CustomerInfoBlock;
