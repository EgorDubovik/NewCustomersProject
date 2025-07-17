const UserSettings = ({ userSettings, setUserSettings }: { userSettings: any; setUserSettings: any }) => {
	return (
		<div className="panel">
			<h2 className="text-lg">User Settings</h2>

			<div className="table w-full">
				<table className="table" style={{ width: '100%' }}>
					<tbody>
						<tr>
							<td width="50%">Time picker line length</td>
							<td width="50%">
								<select
									className="form-select text-white-dark"
									value={userSettings.timePickerLineLength}
									onChange={(e) => setUserSettings({ ...userSettings, timePickerLineLength: parseInt(e.target.value) })}
								>
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
