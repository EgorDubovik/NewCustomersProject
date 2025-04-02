import { useEffect } from 'react';
import axiosClient from '../../store/axiosClient';

const ActiveAppointments = () => {
	useEffect(() => {
		axiosClient
			.get('/appointment/active')
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return <div>Active Appointments</div>;
};

export default ActiveAppointments;
