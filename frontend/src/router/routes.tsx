import { lazy } from 'react';
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
import DefaultLayout from '../components/Layouts/DefaultLayout';
import BlankLayout from '../components/Layouts/BlankLayout';
import AuthPrivetRoute from '../middleware/AuthPrivetRoute';
import Customers from '../pages/Customers/List/Customers';
const Schedule = lazy(() => import('../pages/Schedule/Schedule'));
const Appointment = lazy(() => import('../pages/Appointment/Index'));
const Error404 = lazy(() => import('../components/Error404'));
import CreateCustomer from '../pages/Customers/Create/CreateCustomer';
import Create from '../pages/Invoice/Create';
import UpdateCustomer from '../pages/Customers/Update/UpdateCustomer';
import ReviewFeedback from '../pages/ReviewFeedback/Index';
import SingUp from '../pages/Authentication/SingUp';
import MapView from '../pages/Schedule/MapView';
import DefaultFullSpaceLayout from '../components/Layouts/DefaultFullSpaceLayout';
import EndPoints from '../pages/CompanySettings/EndPoints/EndPoints';
import Settings from '../pages/Calls/Settings';
import AppointmentConfirmed from '../pages/BookAppointment/AppointmentConfirmed';
const Invoices = lazy(() => import('../pages/Invoice/Invoices'));
const Employees = lazy(() => import('../pages/Employees'));
const CreateAppointment = lazy(() => import('../pages/Appointment/Create/CreateAppointment'));
const ViewCustomer = lazy(() => import('../pages/Customers/View/ViewCustomer'));
const ProfilePage = lazy(() => import('../pages/Profile/ProfilePage'));
const PaymentsIndex = lazy(() => import('../pages/Payments/PaymentsIndex'));
const BookAppointment = lazy(() => import('../pages/BookAppointment'));
const ViewAppointment = lazy(() => import('../pages/BookAppointment/ViewAppointment'));
const AppointmentCanceled = lazy(() => import('../pages/BookAppointment/AppointmentCanceled'));
const BookAppointmentSettings = lazy(() => import('../pages/CompanySettings/BookAppointment/Index'));
const Storage = lazy(() => import('../pages/Storage/index'));
// Company Settings
const CompanyGeneralInfo = lazy(() => import('../pages/CompanySettings/GeneralInfo/CompanyGeneralInfo'));
const CompanyServices = lazy(() => import('../pages/CompanySettings/CompanyServices'));
const CompanyTags = lazy(() => import('../pages/CompanySettings/CompanyTags'));
const ActiveAppointments = lazy(() => import('../pages/Schedule/ActiveAppointments'));
const Calls = lazy(() => import('../pages/Calls/Index'));

const routes = [
	// dashboard
	{
		path: '/',
		element: <AuthPrivetRoute />,
		children: [
			{
				index: true,
				element: (
					<DefaultLayout>
						{' '}
						<Dashboard />
					</DefaultLayout>
				),
			},
			{
				path: '/schedule',
				element: (
					<DefaultLayout>
						{' '}
						<Schedule />
					</DefaultLayout>
				),
			},
			{
				path: 'schedule/maps/:range',
				element: (
					<DefaultFullSpaceLayout>
						<MapView />
					</DefaultFullSpaceLayout>
				),
			},
			{
				path: 'schedule/active/appointments',
				element: (
					<DefaultLayout>
						<ActiveAppointments />
					</DefaultLayout>
				),
			},
			{
				path: '/appointment/:id',
				element: (
					<DefaultLayout>
						{' '}
						<Appointment />
					</DefaultLayout>
				),
			},
			{
				path: 'appointment/create/:customerId',
				element: (
					<DefaultLayout>
						{' '}
						<CreateAppointment />
					</DefaultLayout>
				),
			},
			{
				path: 'invoice/send/:appointmentId',
				element: (
					<DefaultLayout>
						{' '}
						<Create />
					</DefaultLayout>
				),
			},
			{
				path: 'invoices',
				element: (
					<DefaultLayout>
						{' '}
						<Invoices />
					</DefaultLayout>
				),
			},
			{
				path: '/customers',
				element: (
					<DefaultLayout>
						{' '}
						<Customers />
					</DefaultLayout>
				),
			},
			{
				path: '/customer/:id',
				element: (
					<DefaultLayout>
						{' '}
						<ViewCustomer />
					</DefaultLayout>
				),
			},
			{
				path: '/customer/update/:id',
				element: (
					<DefaultLayout>
						{' '}
						<UpdateCustomer />
					</DefaultLayout>
				),
			},
			{
				path: '/customers/create',
				element: (
					<DefaultLayout>
						{' '}
						<CreateCustomer />
					</DefaultLayout>
				),
			},
			{
				path: '/company-settings/services',
				element: (
					<DefaultLayout>
						{' '}
						<CompanyServices />
					</DefaultLayout>
				),
			},
			{
				path: '/company-settings/book-online',
				element: (
					<DefaultLayout>
						{' '}
						<BookAppointmentSettings />
					</DefaultLayout>
				),
			},
			{
				path: '/company-settings/general',
				element: (
					<DefaultLayout>
						{' '}
						<CompanyGeneralInfo />
					</DefaultLayout>
				),
			},
			{
				path: '/company-settings/tags',
				element: (
					<DefaultLayout>
						{' '}
						<CompanyTags />
					</DefaultLayout>
				),
			},
			{
				path: '/company-settings/endpoints',
				element: (
					<DefaultLayout>
						<EndPoints />
					</DefaultLayout>
				),
			},
			{
				path: '/employees',
				element: (
					<DefaultLayout>
						<Employees />
					</DefaultLayout>
				),
			},
			{
				path: '/profile',
				element: (
					<DefaultLayout>
						<ProfilePage />
					</DefaultLayout>
				),
			},
			{
				path: '/payments',
				element: (
					<DefaultLayout>
						<PaymentsIndex />
					</DefaultLayout>
				),
			},
			{
				path: '/storage',
				element: (
					<DefaultLayout>
						<Storage />
					</DefaultLayout>
				),
			},
			{
				path: '/calls',
				element: (
					<DefaultLayout>
						<Calls />
					</DefaultLayout>
				),
			},
			{
				path: '/calls/settings',
				element: (
					<DefaultLayout>
						<Settings />
					</DefaultLayout>
				),
			},
		],
	},
	//Authentication
	{
		path: '/auth/signin',
		element: (
			<BlankLayout>
				<LoginBoxed />
			</BlankLayout>
		),
	},
	{
		path: '/auth/signup',
		element: (
			<BlankLayout>
				<SingUp />
			</BlankLayout>
		),
	},
	{
		path: '/appointment/book/:paramKey',
		element: <BookAppointment />,
	},
	{
		path: '/appointment/book/view/:providerKey',
		// element: <ViewAppointment />,
		element: <AppointmentConfirmed />,
	},
	{
		path: '/appointment/book/cancel/:paramKey',
		element: <AppointmentCanceled />,
	},
	{
		path: '/review-feedback/:paramKey',
		element: <ReviewFeedback />,
	},
	{
		path: '*',
		element: (
			<BlankLayout>
				<Error404 />
			</BlankLayout>
		),
	},
];

export { routes };
