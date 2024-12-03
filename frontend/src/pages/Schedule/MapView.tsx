import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
const MapView = () => {
	const position: LatLngExpression = [33.12968, -96.7099];

	return (
		<div className="absolute left-0 right-0 h-full">
			<div className="grid grid-cols-6 h-full">
				<div className="col-span-5 h-full">
					<MapContainer center={position} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
						<TileLayer
							// attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
							url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
						/>

						<Marker position={position}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker>
					</MapContainer>
				</div>
				<div className="col-span-1 h-full min-h-0">Appointment list</div>
			</div>
		</div>
	);
};

export default MapView;
