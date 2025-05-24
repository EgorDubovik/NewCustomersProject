import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axiosClient from '../store/axiosClient';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export function useApiRequest<T = any>(initialConfig: any) {
	const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('idle');
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<any>(null);
	const dispatch = useDispatch();

	// config для axios берём только из initialConfig
	const sendRequest = useCallback(
		async (overrideConfig: any = {}) => {
			setLoadingStatus('loading');
			setError(null);
			setData(null);
			try {
				// Просто склеиваем initialConfig + overrideConfig
				const config = { ...initialConfig, ...overrideConfig };
				const response = await axiosClient(config);
				console.log(response.data);
				if (response.data?.user) {
					// dispatch(setUser(response.data.user));
				}
				setData(response.data);
				setLoadingStatus('success');
				return response.data;
			} catch (e: any) {
				setError(e);
				setLoadingStatus('error');
			}
		},
		[dispatch, initialConfig]
	);

	return { loadingStatus, data, error, sendRequest };
}
