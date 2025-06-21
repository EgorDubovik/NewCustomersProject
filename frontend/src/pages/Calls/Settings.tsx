import { useEffect, useState } from 'react';
import { useApiRequest } from '../../hooks/useApiRequest';
import { PageCirclePrimaryLoader } from '../../components/loading/PageLoading';
import { PageLoadError } from '../../components/loading/Errors';
import axiosClient from '../../store/axiosClient';
import { ButtonLoader } from '../../components/loading/ButtonLoader';
import { alertError, alertSuccsess } from '../../helpers/helper';
import IconCopy from '../../components/Icon/IconCopy';
import IconTrash from '../../components/Icon/IconTrash';

const Settings = () => {
	const [callWebhookKey, setCallWebhookKey] = useState('');
	const [createStatus, setCreateStatus] = useState<'loading' | 'success' | 'error' | 'none'>('none');
	const { sendRequest, loadingStatus, data } = useApiRequest({
		url: '/calls/settings',
		method: 'get',
	});

	useEffect(() => {
		sendRequest();
	}, []);

	useEffect(() => {
		if (data) {
			if (data.status === 'success') {
				setCallWebhookKey(data.data.callWebhookKey);
			}
		}
	}, [data]);

	const handleCreateCallWebhook = () => {
		setCreateStatus('loading');
		axiosClient
			.post('/calls/settings')
			.then((res) => {
				if (res.status === 200) {
					setCallWebhookKey(res.data.data.callWebhookKey);
				}
			})
			.catch((err) => {
				alertError('Failed to create call webhook');
			})
			.finally(() => {
				setCreateStatus('none');
			});
	};

	const handleCopyCallWebhook = () => {
		navigator.clipboard.writeText(import.meta.env.VITE_API_URL + '/calls/webhook/' + callWebhookKey);
		alertSuccsess('Call webhook url copied to clipboard');
	};

	const handleDeleteCallWebhook = () => {
		setCreateStatus('loading');
		axiosClient
			.delete('/calls/settings')
			.then((res) => {
				if (res.status === 200) {
					setCallWebhookKey('');
				}
			})
			.catch((err) => {
				alertError('Failed to delete call webhook');
			})
			.finally(() => {
				setCreateStatus('none');
			});
	};

	return (
		<div>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<>
					<div className="flex justify-between items-center text-lg">
						<h1>Call Settings</h1>
					</div>
					<div className="panel w-1/2 m-auto">
						{callWebhookKey.length > 0 ? (
							<div>
								<h2>Call Webhook Url</h2>
								<div className="flex items-center mt-4">
									<input
										readOnly
										id="addonsRight"
										type="text"
										placeholder=""
										className="form-input rounded-r-none"
										value={import.meta.env.VITE_API_URL + '/calls/webhook/' + callWebhookKey}
									/>
									<button type="button" className="btn btn-primary rounded-none" onClick={handleCopyCallWebhook}>
										<IconCopy />
									</button>
									<button type="button" className="btn btn-danger rounded-l-none" onClick={handleDeleteCallWebhook}>
										<IconTrash />
									</button>
								</div>
							</div>
						) : (
							<div className="flex flex-col items-center">
								<p>Call webhook url not set yet</p>
								<p className="mt-4">
									<button className="btn btn-primary" onClick={() => handleCreateCallWebhook()} disabled={createStatus === 'loading'}>
										Create Call Webhook url
										{createStatus === 'loading' && <ButtonLoader />}
									</button>
								</p>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Settings;
