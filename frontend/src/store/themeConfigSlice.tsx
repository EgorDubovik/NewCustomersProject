import { createSlice } from '@reduxjs/toolkit';
import themeConfig from '../theme.config';

const defaultState = {
	isDarkMode: false,
	mainLayout: 'app',
	theme: 'dark',
	menu: 'vertical',
	layout: 'full',
	rtlClass: 'ltr',
	animation: '',
	navbar: 'navbar-sticky',
	locale: 'en',
	sidebar: false,
	pageTitle: '',
	semidark: false,
};

const initialState = {
	theme: localStorage.getItem('theme') || themeConfig.theme,
	menu: localStorage.getItem('menu') || themeConfig.menu,
	layout: localStorage.getItem('layout') || themeConfig.layout,
	rtlClass: localStorage.getItem('rtlClass') || themeConfig.rtlClass,
	animation: localStorage.getItem('animation') || themeConfig.animation,
	navbar: localStorage.getItem('navbar') || themeConfig.navbar,
	locale: localStorage.getItem('i18nextLng') || themeConfig.locale,
	isDarkMode: false,
	sidebar: localStorage.getItem('sidebar') || defaultState.sidebar,
	semidark: localStorage.getItem('semidark') || themeConfig.semidark,
	rolesTitle: ['', 'Admin', 'Technician', 'Dispatcher'],
	rolesColor: ['', 'success', 'danger', 'info'],
	user: {
		id: 0,
		name: 'unknown',
		email: '',
		phone: '',
		roles_ids: [] as number[],
		color: '#ccc',
		isAdmin: false,
		settings: {
			timePickerLineLength: 3,
		},
	},
	companySettings: {
		taxRate: 0,
		reviewLink: '',
		companyTags: [],
	},

	sideBarNotifications: {
		storage: 0,
		schedule: 0,
	},
	showUpdateWarning: false,
};

const themeConfigSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setUserInformation(state, { payload }) {
			payload = payload || state.user;
			state.user = {
				...state.user,
				...payload,
			};
			if (payload?.roles_ids?.includes(1)) state.user.isAdmin = true;
		},
		setCompanySettings(state, { payload }) {
			state.companySettings = {
				...state.companySettings,
				...payload,
			};
		},
		setCompanyTags(state, { payload }) {
			state.companySettings.companyTags = payload;
		},
		toggleTheme(state, { payload }) {
			payload = payload || state.theme; // light | dark | system
			localStorage.setItem('theme', payload);
			state.theme = payload;
			if (payload === 'light') {
				state.isDarkMode = false;
			} else if (payload === 'dark') {
				state.isDarkMode = true;
			}

			if (state.isDarkMode) {
				document.querySelector('body')?.classList.add('dark');
			} else {
				document.querySelector('body')?.classList.remove('dark');
			}
		},
		toggleMenu(state, { payload }) {
			payload = payload || state.menu; // vertical, collapsible-vertical, horizontal
			state.sidebar = false; // reset sidebar state
			localStorage.setItem('menu', payload);
			state.menu = payload;
		},
		toggleLayout(state, { payload }) {
			payload = payload || state.layout; // full, boxed-layout
			localStorage.setItem('layout', payload);
			state.layout = payload;
		},
		toggleRTL(state, { payload }) {
			payload = payload || state.rtlClass; // rtl, ltr
			localStorage.setItem('rtlClass', payload);
			state.rtlClass = payload;
			document.querySelector('html')?.setAttribute('dir', state.rtlClass || 'ltr');
		},
		toggleAnimation(state, { payload }) {
			payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
			payload = payload?.trim();
			localStorage.setItem('animation', payload);
			state.animation = payload;
		},
		toggleNavbar(state, { payload }) {
			payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static
			localStorage.setItem('navbar', payload);
			state.navbar = payload;
		},
		toggleSemidark(state, { payload }) {
			payload = payload === true || payload === 'true' ? true : false;
			localStorage.setItem('semidark', payload);
			state.semidark = payload;
		},

		toggleSidebar(state) {
			state.sidebar = !state.sidebar;
		},

		setPageTitle(state, { payload }) {
			document.title = `${payload}`;
		},

		setSideBarNotifications(state, { payload }) {
			state.sideBarNotifications = payload;
		},
		setShowUpdateWarning(state, { payload }) {
			state.showUpdateWarning = payload;
		},
	},
});

export const {
	toggleTheme,
	toggleMenu,
	toggleLayout,
	toggleRTL,
	toggleAnimation,
	toggleNavbar,
	toggleSemidark,
	toggleSidebar,
	setPageTitle,
	setUserInformation,
	setCompanySettings,
	setCompanyTags,
	setSideBarNotifications,
	setShowUpdateWarning,
} = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
