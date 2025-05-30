import { useEffect, useState } from 'react';
import { PageCirclePrimaryLoader } from '../../../components/loading/PageLoading';
import { PageLoadError } from '../../../components/loading/Errors';
import TaxRate from './TaxRate';
import CompanyLogo from './CompanyLogo';
import CompanyInfo from './CompanyInfo';
import { useApiRequest } from '../../../hooks/useApiRequest';
import ReviewLink from './ReviewLink';
import { alertError } from '../../../helpers/helper';

const CompanyGeneralInfo = () => {
	const [companySettings, setCompanySettings] = useState<any>({});
	const [company, setCompany] = useState<any>({});

	const { loadingStatus, data, error, sendRequest } = useApiRequest({
		url: '/company/settings',
		method: 'get',
	});

	useEffect(() => {
		if (data) {
			setCompanySettings(data.companySettings);
			setCompany(data.company);
		}
	}, [data]);

	useEffect(() => {
		sendRequest();
	}, []);

	return (
		<div>
			<div className="flex justify-start items-center text-lg">
				<h1>Company General Settings</h1>
			</div>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<div className="py-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-3">
						<div className="grid grid-rows-none gap-3">
							<CompanyLogo company={company} setCompany={setCompany} />
							<TaxRate companySettings={companySettings} setCompanySettings={setCompanySettings} />
							<ReviewLink companySettings={companySettings} setCompanySettings={setCompanySettings} />
						</div>

						<div className="grid grid-rows-none gap-3">
							<CompanyInfo company={company} setCompany={setCompany} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CompanyGeneralInfo;
