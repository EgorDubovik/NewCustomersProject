import { PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import App from '../../App';
import { IRootState } from '../../store';
import { toggleSidebar, setUserInformation, setCompanySettings, setSideBarNotifications, setShowUpdateWarning } from '../../store/themeConfigSlice';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import Portals from '../../components/Portals';
import axiosClient from '../../store/axiosClient';

const DefaultLayout = ({ children }: PropsWithChildren) => {
	const themeConfig = useSelector((state: IRootState) => state.themeConfig);
	const dispatch = useDispatch();

	const [showLoader, setShowLoader] = useState(true);

	function loadHeadData() {
		axiosClient.get('/user').then((res) => {
			if (res.status == 200) {
				if (res.data.app_version && import.meta.env.VITE_APP_VERSION !== res.data.app_version) setShowUpdateWarning(true);
				dispatch(setUserInformation(res.data.user));
				dispatch(setCompanySettings(res.data.companySettings || {}));
				dispatch(setSideBarNotifications(res.data.sideBarNotifications || {}));
			}
		});
	}

	useEffect(() => {
		const screenLoader = document.getElementsByClassName('screen_loader');
		if (screenLoader?.length) {
			screenLoader[0].classList.add('animate__fadeOut');
			setTimeout(() => {
				setShowLoader(false);
			}, 200);
		}
		loadHeadData();
	}, []);

	return (
		<App>
			{/* BEGIN MAIN CONTAINER */}
			<div className="relative">
				{/* sidebar menu overlay */}
				<div className={`${(!themeConfig.sidebar && 'hidden') || ''} fixed inset-0 bg-[black]/60 z-50 lg:hidden`} onClick={() => dispatch(toggleSidebar())}></div>
				{/* screen loader */}
				{showLoader && (
					<div className="screen_loader fixed inset-0 bg-[#fafafa] dark:bg-[#060818] z-[60] grid place-content-center animate__animated">
						<svg width="64" height="64" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" fill="#4361ee">
							<path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
								<animateTransform attributeName="transform" type="rotate" from="0 67 67" to="-360 67 67" dur="2.5s" repeatCount="indefinite" />
							</path>
							<path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
								<animateTransform attributeName="transform" type="rotate" from="0 67 67" to="360 67 67" dur="8s" repeatCount="indefinite" />
							</path>
						</svg>
					</div>
				)}

				<div className={`${themeConfig.navbar} main-container text-black dark:text-white-dark min-h-screen`}>
					{/* BEGIN SIDEBAR */}
					<Sidebar />
					{/* END SIDEBAR */}

					<div className="main-content flex flex-col min-h-screen">
						{themeConfig.showUpdateWarning && (
							<div className="fixed top-0 left-0 right-0 h-16 bg-orange-800/70 z-50 text-center text-white text-lg">
								Current Version: {import.meta.env.VITE_APP_VERSION} is out of date<br></br>
								Please{' '}
								<a className="underline" href="#" onClick={() => window.location.reload()}>
									reload the page
								</a>{' '}
								to update
							</div>
						)}

						{/* BEGIN TOP NAVBAR */}
						<Header />
						{/* END TOP NAVBAR */}

						{/* BEGIN CONTENT AREA */}

						<div className={`${themeConfig.animation} p-2 md:p-6 animate__animated`}>{children}</div>

						{/* END CONTENT AREA */}

						{/* BEGIN FOOTER */}
						<Footer />
						{/* END FOOTER */}
						<Portals />
					</div>
				</div>
			</div>
		</App>
	);
};

export default DefaultLayout;
