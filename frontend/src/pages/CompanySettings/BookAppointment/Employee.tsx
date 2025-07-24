import { useRef, useEffect, useState } from 'react';
import { alertError, areArraysEqual, getTechAbr } from '../../../helpers/helper';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import axiosClient from '../../../store/axiosClient';
import { PageCirclePrimaryLoader } from '../../../components/loading/PageLoading';
import { ButtonLoader } from '../../../components/loading/ButtonLoader';

const Employee = () => {
	const rolesTitle = useSelector((state: IRootState) => state.themeConfig.rolesTitle);
	const rolesColor = useSelector((state: IRootState) => state.themeConfig.rolesColor);
	const [loadingStatus, setLoadingStatus] = useState<boolean>(true);
	const [updateStatus, setUpdateStatus] = useState<boolean>(false);

	const [employees, setEmployees] = useState<any[]>([]);

	const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
	const [initialSelectedEmployees, setInitialSelectedEmployees] = useState<number[]>([]);
	useEffect(() => {
		setLoadingStatus(true);
		axiosClient
			.get('/company/settings/book-appointment/employees')
			.then((res) => {
				console.log(res.data);
				setEmployees(res.data.employees);
				setSelectedEmployees(res.data.selectedEmployeesId || []);
				setInitialSelectedEmployees(res.data.selectedEmployeesId || []);
			})
			.catch((err) => {
				alertError('Something went wrong. Please try again later');
			})
			.finally(() => {
				setLoadingStatus(false);
			});
	}, []);

	const selectedEmployeeHasChanges = !areArraysEqual(selectedEmployees, initialSelectedEmployees);

	const changeEmployee = (employee: any) => {
		if (selectedEmployees.includes(employee.id)) {
			setSelectedEmployees(selectedEmployees.filter((id: number) => id !== employee.id));
		} else {
			setSelectedEmployees([...selectedEmployees, employee.id]);
		}
	};

	const saveSelectedEmployees = () => {
		// save to server
		setUpdateStatus(true);
		axiosClient
			.post('/company/settings/book-appointment/employees', { selectedEmployeesId: selectedEmployees || [] })
			.then((res) => {
				setInitialSelectedEmployees(selectedEmployees);
			})
			.catch((err) => {
				alertError('Something went wrong. Please try again later');
			})
			.finally(() => {
				setUpdateStatus(false);
			});
	};
	return (
		<div>
			<h1 className="text-base">Specify who will receive the booking request</h1>
			<div className="list-employees space-y-2 mt-4">
				{loadingStatus ? (
					<div className="flex items-center justify-center">
						<PageCirclePrimaryLoader />
					</div>
				) : (
					employees?.map((employee: any) => {
						return (
							<div className="cursor-pointer bg-white dark:bg-[#1a294166] rounded-md shadow hover:shadow-lg" key={employee.id} onClick={() => changeEmployee(employee)}>
								<div className="p-4">
									<div className="flex items-center relative">
										<div className="avatar">
											<span
												className="flex justify-center items-center w-10 h-10 text-center rounded-full object-cover bg-'bg-danger text-white"
												style={{ backgroundColor: employee.color }}
											>
												{getTechAbr(employee.name)}
											</span>
										</div>
										<div className="ml-2 w-full overflow-hidden">
											<div className="user-info">
												<div className="user-name w-full font-bold dark:text-white">
													{employee.name}
													{employee.roles_ids.map((role: number, index: number) => (
														<span key={index} className={`badge badge-outline-${rolesColor[role]} ml-2 text-[10px]`}>
															{rolesTitle[role]}
														</span>
													))}
												</div>
											</div>
											<div className="user-address mt-2 ml-1">{employee.phone}</div>
										</div>
										<div className="flex items-center">
											<input type="checkbox" className="form-checkbox" checked={selectedEmployees.includes(employee.id)} onChange={() => {}} />
										</div>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>
			<div className="update-status mt-4 flex items-center justify-end">
				{selectedEmployeeHasChanges ? (
					<>
						<p className="text-gray-500 mr-2">Unsaved changes</p>
						<button type="button" className="btn btn-sm btn-primary" onClick={saveSelectedEmployees}>
							Save {updateStatus && <ButtonLoader />}
						</button>
					</>
				) : (
					<p className="text-gray-500 mr-2">No changes</p>
				)}
			</div>
			<div className="mt-4">
				<p className="text-gray-500"> In case of no selection, request will be sent to admin</p>
			</div>
		</div>
	);
};

export default Employee;
