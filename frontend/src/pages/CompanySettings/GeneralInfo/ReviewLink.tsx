import { useState } from "react";
import { SmallPrimaryLoader } from "../../../components/loading/SmallCirculeLoader";
import axiosClient from "../../../store/axiosClient";
import { alertError, alertSuccsess } from "../../../helpers/helper";

const ReviewLink = (props:any) => {
	const { companySettings, setCompanySettings } = props;
	console.log(companySettings);
	// const [reviewLink, setReviewLink] = useState(companySettings.reviewLink || '');
	const [storeStatus, setStoreStatus] = useState(false);

	const saveReviewLink = () => {
		setStoreStatus(true);

		axiosClient.put('/company/settings', { reviewLink:companySettings.reviewLink })
			.then((res) => {
				setCompanySettings({ ...companySettings, reviewLink: companySettings.reviewLink });
			})
			.catch((err) => {
				alertError('Something went wrong, Please try again later');
				console.log(err);
			})
			.finally(() => {
				alertSuccsess('Review Link Updated');
				setStoreStatus(false);
			});
	};

	return (
		<div className="panel">
			<div className="panel-header">Add link for review</div>
			<div className="panel-body mt-2">
				<div className="flex items-center gap-2">
					<input type="text" value={companySettings.reviewLink} onChange={(e) => setCompanySettings({...companySettings, reviewLink: e.target.value})} className="form-input w-3/4" placeholder="Enter review link" />
					<button className="btn btn-primary" onClick={saveReviewLink}>
						{storeStatus ? <SmallPrimaryLoader /> : 'Save'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ReviewLink;
