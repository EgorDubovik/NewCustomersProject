import IconCopy from '../../../components/Icon/IconCopy';
import IconPlus from '../../../components/Icon/IconPlus';
import IconTrash from '../../../components/Icon/IconTrash';
import { useState, useEffect } from 'react';
import { useApiRequest } from '../../../hooks/useApiRequest';
import { PageCirclePrimaryLoader } from '../../../components/loading/PageLoading';
import { PageLoadError } from '../../../components/loading/Errors';
import axiosClient from '../../../store/axiosClient';
import { alertError, alertSuccsess } from '../../../helpers/helper';
import { ButtonLoader } from '../../../components/loading/ButtonLoader';

const EndPoints = () => {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [createNewTokenLoading, setCreateNewTokenLoading] = useState(false);
	const [deleteTokenLoading, setDeleteTokenLoading] = useState(false);
	const { loadingStatus, data, error, sendRequest } = useApiRequest({
		url: 'company/settings/access-token',
		method: 'GET',
	});
	useEffect(() => {
		if (data) {
			setAccessToken(data.token);
		}
	}, [data]);

	useEffect(() => {
		sendRequest();
	}, []);

	const createNewToken = () => {
		setCreateNewTokenLoading(true);

		axiosClient
			.post('company/settings/access-token')
			.then((response) => {
				setAccessToken(response.data.token);
			})
			.catch((error) => {
				console.log(error);
				alertError('Something went wrong');
			})
			.finally(() => {
				setCreateNewTokenLoading(false);
			});
	};

	const deleteToken = () => {
		setDeleteTokenLoading(true);
		axiosClient
			.delete('company/settings/access-token')
			.then(() => {
				setAccessToken(null);
			})
			.catch((error) => {
				console.log(error);
				alertError('Something went wrong');
			})
			.finally(() => {
				setDeleteTokenLoading(false);
			});
	};

	const copyAccessToken = () => {
		navigator.clipboard.writeText(accessToken!);
		alertSuccsess('Access token copied to clipboard');
	};

	return (
		<div>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<div className="container w-full max-w-[700px] md:w-1/2 3xl:w-1/4 mx-auto px-4 sm:px-8">
					<div className="panel pt-2">
						<div className="panel-header">
							<h3 className="text-lg font-semibold text-center">Access token</h3>
						</div>
						<div className="panel-body">
							{/* view access token */}
							{accessToken !== null ? (
								<>
									<div className="flex items-center justify-between mt-4">
										<div className="flex items-center gap-4 overflow-hidden">
											<p className="whitespace-nowrap">Access token:</p>
											<p className="text-center text-black dark:text-white-light truncate">{accessToken}</p>
										</div>
										<div className="flex items-center gap-4 ml-2">
											<button className="btn btn-primary" onClick={copyAccessToken}>
												<IconCopy />
											</button>
											<button className="text-red-500" onClick={deleteToken}>
												{deleteTokenLoading ? <ButtonLoader /> : <IconTrash />}
											</button>
										</div>
									</div>
									<div className="mt-4">
										<p className="text-sm text-gray-600 dark:text-gray-500">
											Use this access token to authenticate requests to the API. <br />
											Add it to the Authorization header as a Bearer token.
										</p>
									</div>
								</>
							) : (
								// create access token
								<div className="flex flex-col items-center justify-center mt-4">
									<button className="btn btn-primary mt-5" onClick={createNewToken}>
										{createNewTokenLoading ? <ButtonLoader /> : <IconPlus className="mr-2" />}
										Create access token
									</button>
								</div>
							)}
						</div>
					</div>
					<div className="panel mt-5">
						<div className="panel-header">
							<h3>End Points</h3>
						</div>
						<div className="panel-body">
							<div className="flex items-center justify-between mt-4">
								<div className="flex items-center gap-4">
									<p className="">End Point:</p>
									<p className="text-center text-black dark:text-white-light ">/api/appointments</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EndPoints;
