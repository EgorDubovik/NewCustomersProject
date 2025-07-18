import { useState, useEffect } from 'react';
import axiosClient from '../../../store/axiosClient';
import WorkingTime from './WorkingTime';
import { PageLoadError } from '../../../components/loading/Errors';
import { PageCirclePrimaryLoader } from '../../../components/loading/PageLoading';
import LinkAndActiveBlock from './LinkAndActiveBlock';
import Services from './Services'; // Add this line
import Employee from './Employee';

export interface CompanyServiceType {
	id: number;
	title: string;
	price: number;
	description: string;
}

const BookAppointmentSettings = () => {
	const [loadingStatus, setLoadingStatus] = useState<string>('loading');
	const [settings, setSettings] = useState<any>({});
	const [loadedCompanyServices, setLoadetCompanyServices] = useState<CompanyServiceType[]>([]);
	const [bookService, setBookService] = useState<CompanyServiceType[]>([]);
	const [bookAppointmentTagsId, setBookAppointmentTagsId] = useState<number[]>([]);
	const [workingTime, setWorkingTime] = useState<WorkingTime>({
		monday: { from: 0, to: 0 },
		tuesday: { from: 0, to: 0 },
		wednesday: { from: 0, to: 0 },
		thursday: { from: 0, to: 0 },
		friday: { from: 0, to: 0 },
		saturday: { from: 0, to: 0 },
		sunday: { from: 0, to: 0 },
	});

	useEffect(() => {
		axiosClient
			.get('/company/settings/book-appointment')
			.then((res) => {
				console.log(res.data);
				setWorkingTime(JSON.parse(res.data.settings.working_time));
				setSettings(res.data.settings);
				setLoadetCompanyServices(res.data.companyServices || []);
				setBookService(res.data.bookAppointmentServices || []);
				setBookAppointmentTagsId(res.data.bookAppointmentTagsId || []);

				setLoadingStatus('success');
			})
			.catch((err) => {
				console.log(err);
				setLoadingStatus('error');
			});
	}, []);

	return (
		<div>
			<div>
				<div className="flex justify-start items-center text-lg">
					<h1>Book Appointments online settings</h1>
				</div>
				{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
				{loadingStatus === 'error' && <PageLoadError />}
				{loadingStatus === 'success' && (
					<div className="py-4">
						<div className="grid grid-cols-1 md:grid-cols-4 gap-5">
							<WorkingTime workingTime={workingTime} />
							<div className="md:col-span-2">
								<LinkAndActiveBlock settings={settings} bookAppointmentTagsId={bookAppointmentTagsId} />
								<div className="panel p-2 mt-5 pb-4">
									<Services loadedCompanyServices={loadedCompanyServices} bookService={bookService} />
								</div>
							</div>
							<div className="panel">
								<Employee />
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default BookAppointmentSettings;
