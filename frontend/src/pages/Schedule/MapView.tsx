import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression, LatLngBoundsExpression, LatLngBounds, LatLngTuple } from 'leaflet';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import axiosClient from '../../store/axiosClient';
import { alertError, alertSuccsess, formatDate } from '../../helpers/helper';
import { IAppointment } from '../../types';
import { Link } from 'react-router-dom';

const createCustomIcon = (color: string) => {
	return L.divIcon({
		className: 'custom-div-icon', // Optional className for additional styling
		html: `<div style="
		 background-color: ${color}; 
		 width: 15px; 
		 height: 15px; 
		 border-radius: 50%; 
		 border: 2px solid white; 
		 box-shadow: 0 0 5px rgba(0,0,0,0.5);
	  "></div>`,
		iconSize: [15, 15],
		iconAnchor: [10, 10], // Center the icon
	});
};
const calculateBounds = (appointments: IAppointment[]): LatLngBoundsExpression => {
	const latitudes = appointments.map((p) => p.job.address?.lat);
	const longitudes = appointments.map((p) => p.job.address?.lon);
	const southWest: LatLngTuple = [Math.min(...latitudes), Math.min(...longitudes)];
	const northEast: LatLngTuple = [Math.max(...latitudes), Math.max(...longitudes)];
	return [southWest, northEast];
};

const FitBounds: React.FC<{ bounds: LatLngBoundsExpression }> = ({ bounds }) => {
	const map = useMap();

	useEffect(() => {
		if (bounds) {
			map.fitBounds(bounds); // Adjust map to fit bounds
		}
	}, [bounds, map]);

	return null;
};

const MapView = () => {
	const position: LatLngExpression = [33.113929, -96.7471829];
	const mapZoom = 12;
	const isDarkMode = useSelector((state: IRootState) => state.themeConfig.isDarkMode);
	const mapTile = isDarkMode ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' : 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png';

	const [appointments, setAppointments] = useState<IAppointment[]>([]);
	const [showLoader, setShowLoader] = useState(true);
	const [selctedAppointment, setSelectedAppointment] = useState<number>(0);
	const [bounds, setBounds] = useState<LatLngBoundsExpression | undefined>(undefined);
	useEffect(() => {
		setShowLoader(true);
		axiosClient
			.get('/maps/todays')
			.then((res) => {
				console.log(res.data.appointments);
				setAppointments(res.data.appointments);
			})
			.catch((err) => {
				alertError('Something went wrong, Please try again later');
				console.log(err);
			})
			.finally(() => {
				setShowLoader(false);
			});
	}, []);

	useEffect(() => {
		if (appointments.length > 0) {
			setBounds(calculateBounds(appointments));
		}
	}, [appointments]);

	const onMouseOverHandler = (appointment_id: number) => {
		setSelectedAppointment(appointment_id);
	};

	return (
		<div className="absolute left-0 right-0 h-full">
			<div className="grid grid-cols-6 h-full">
				<div className="col-span-5 h-full">
					<MapContainer center={position} zoom={mapZoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
						<TileLayer url={mapTile} />
						{bounds && <FitBounds bounds={bounds} />}
						{appointments.map((appointment) => (
							<Marker
								position={[appointment.job.address?.lat || 0, appointment.job.address?.lon || 0]}
								icon={createCustomIcon(appointment.techs[0]?.color || 'gray')}
								key={appointment.id}
								eventHandlers={{
									mouseover: () => {
										onMouseOverHandler(appointment.id);
									},
									mouseout: () => {
										onMouseOverHandler(0);
									},
								}}
							></Marker>
						))}
					</MapContainer>
				</div>
				<div className="col-span-1 h-full min-h-0 dark:bg-gray-800 bg-blue-50">
					<div className="title p-2">
						<h3 className="font-semibold dark:text-white-light">Appointments</h3>
					</div>

					{showLoader && <div className="p-2">Loading...</div>}

					<ul>
						{!showLoader && appointments.length === 0 && <div className="p-2">No appointments today</div>}
						{appointments.map((appointment) => (
							<li className="p-2" key={appointment.id} style={{ opacity: selctedAppointment === appointment.id || selctedAppointment === 0 ? 1 : 0.4 }}>
								<Link to={`/appointment/${appointment.id}`}>
									<div className="p-2 dark:bg-gray-700 bg-white shadow-md  rounded-lg border-l-2 " style={{ borderLeftColor: appointment.techs[0]?.color || 'gray' }}>
										<div className="flex items-center justify-between">
											<div className="ml-3">
												<div className="text-sm font-medium dark:text-white">{appointment.job.customer.name}</div>
												<div className="text-xs font-medium dark:text-gray-400">{appointment.job.services[0].title}</div>
											</div>
											<div className="appointment-time">
												{formatDate(appointment.start, 'hh A')} - {formatDate(appointment.end, 'hh A')}
											</div>
										</div>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default MapView;
