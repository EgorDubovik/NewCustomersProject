import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../../store/axiosClient';
export const useViewCustomer = () => {
	const { id } = useParams();
	const [customer, setCustomer] = useState<any>({});
	const [loadingStatus, setLoadingStatus] = useState('loading');
	const [companyTags, setCompanyTags] = useState<any[]>([]);

	useEffect(() => {
		axiosClient
			.get(`/customers/${id}`)
			.then((res) => {
				setLoadingStatus('success');
				// console.log('data:', res.data);
				setCompanyTags(res.data.companyTags);
				setCustomer(res.data.customer);
			})
			.catch((err) => {
				setLoadingStatus('error');
				console.log(err);
			})
			.finally(() => {
				console.log('finally');
			});
	}, []);
	return { customer, loadingStatus, companyTags };
};
