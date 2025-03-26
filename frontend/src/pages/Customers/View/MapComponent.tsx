import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store';

const MapComponent = (props: any) => {
	const { latitude, longitude } = props || {};

	const isDarkMode = useSelector((state: IRootState) => state.themeConfig.isDarkMode);
	const mapTile = isDarkMode ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' : 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png';

	return (
		<div className="w-full h-[250px] dark:bg-gray-800 bg-gray-200 flex items-center justify-center">
			{latitude && longitude ? (
				<MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }}>
					<TileLayer url={mapTile} />
					<Marker position={[latitude, longitude]}></Marker>
				</MapContainer>
			) : (
				'No Location found'
			)}
		</div>
	);
};
export default MapComponent;
