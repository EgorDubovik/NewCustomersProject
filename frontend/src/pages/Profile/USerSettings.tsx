import { alertError, alertSuccsess } from '../../helpers/helper';
import axiosClient from '../../store/axiosClient';
import { useDispatch } from 'react-redux';
import { setUserInformation } from '../../store/themeConfigSlice';
import { useState } from 'react';
import { ButtonLoader } from '../../components/loading/ButtonLoader';
const UserSettings = ({ user }: { user: any }) => {
	const dispatch = useDispatch();
	const [loadingStatus, setLoadingStatus] = useState(false);
	const setTimePickerLineLength = (value: number) => {
		setLoadingStatus(true);
		axiosClient
			.post('/user-settings', { timePickerLineLength: value })
			.then((res) => {
				dispatch(setUserInformation({ settings: { ...user.settings, timePickerLineLength: value } }));
				alertSuccsess('Time picker line length updated successfully');
			})
			.catch((err) => {
				console.log(err);
				alertError('Something went wrong, please try again later');
			})
			.finally(() => {
				setLoadingStatus(false);
			});
	};
	return (
		<div className="panel">
			<h2 className="text-lg">
				User Settings
				{loadingStatus && <ButtonLoader />}
			</h2>

			<div className="table w-full">
				<table className="table" style={{ width: '100%' }}>
					<tbody>
						<tr>
							<td width="50%">Time picker line length</td>
							<td width="50%">
								<select className="form-select text-white-dark" value={user?.settings?.timePickerLineLength || 3} onChange={(e) => setTimePickerLineLength(parseInt(e.target.value))}>
									{[3, 5, 7, 9, 11, 13].map((item) => (
										<option key={item} value={item}>
											{item}
										</option>
									))}
								</select>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserSettings;
