import { useRef } from 'react';
import { ITile } from '../types';
import { Link } from 'react-router-dom';

const Grids = (props: any) => {
	const appointmentTiles = props.appointmentTiles || [];
	const daysArray = props.daysArray || [];
	// const startTime = props.startTime || null;
	const defaultAppointmentOpacity = props.defaultAppointmentOpacity;
	const defaultAppointmentBgColor = props.defaultAppointmentBgColor;
	// const endTime = props.endTime || null;
	const timesArray = props.timesArray || [];
	const totalDuration = props.totalDuration || null;
	const blockHeight = props.blockHeight || 50;

	const onAppointmentClick = props.onAppointmentClick || null;
	const setAppointmentStyle = props.setAppointmentStyle || null;

	// const setAppointmentForCurentDate = props.setAppointmentForCurentDate || null;

	const dayInnerRef = useRef(null);
	const dayInnerHeight = useRef(0);
	const dayInnerOffsettop = useRef(0);

	// const calculateTimePercentage = (time: any) => {
	// 	const relativeTime = time.clone().set({ hour: startTime.hour(), minute: startTime.minute() });
	// 	const elaspseTime = moment.duration(time.diff(relativeTime));
	// 	return (elaspseTime.asMinutes() / totalDuration.asMinutes()) * 100;
	// };
	const procentToMinutes = (procent: number) => {
		return Math.round((totalDuration.asMinutes() * procent) / 100);
	};

	const isDragging = useRef(false);
	const startPosition = useRef(0);
	const appointmentOffsetTop = useRef(0);
	const appointmentOffsetInner = useRef(0);
	const appointmentRef = useRef<HTMLDivElement | null>(null);
	const appointmentProcentHeightRef = useRef(0);
	const appointmentPxHeightRef = useRef(0);
	const appointmentIndex = useRef(0);
	const newProcentTop = useRef(0);
	// const deltaProcent = (15 * 100) / totalDuration.asMinutes();
	const deltaPx = useRef(0);
	const isMoving = useRef(false);

	const handleMouseDown = (e: any, index: number) => {
		// if (e.target.className.indexOf('appointment-title') != -1) return;
		// appointmentIndex.current = index;
		// appointmentRef.current = e.currentTarget;
		// const dayInnerElement = e.currentTarget.closest('.day-inner');
		// dayInnerHeight.current = dayInnerElement.getBoundingClientRect().height;
		// dayInnerOffsettop.current = dayInnerElement.getBoundingClientRect().top;
		// if (appointmentRef.current) {
		// 	appointmentOffsetTop.current = appointmentRef.current.getBoundingClientRect().top;
		// 	appointmentPxHeightRef.current = appointmentRef.current.getBoundingClientRect().height;
		// 	appointmentRef.current.style.zIndex = '100';
		// 	appointmentRef.current.style.width = '100%';
		// 	appointmentRef.current.style.left = '0%';
		// }
		// appointmentOffsetInner.current = appointmentOffsetTop.current - dayInnerOffsettop.current;
		// appointmentProcentHeightRef.current = calculateTimePercentage(appointmentList[index].end) - calculateTimePercentage(appointmentList[index].start);
		// startPosition.current = e.clientY;
		// // deltaPx.current = (deltaProcent * dayInnerHeight.current) / 100;
		// isDragging.current = true;
	};

	const handleMouseMove = (e: any) => {
		// if (!isDragging.current) return;
		// let changedPosition = e.clientY - startPosition.current;
		// let newTopPosition = appointmentOffsetInner.current + changedPosition; // new position of appointment in px from top of dayInner
		// if (newTopPosition >= 0 && appointmentPxHeightRef.current + newTopPosition <= dayInnerHeight.current) {
		// 	isMoving.current = true;
		// 	let t = Math.round(newTopPosition / deltaPx.current);
		// 	newTopPosition = t * deltaPx.current;
		// 	newProcentTop.current = (newTopPosition / dayInnerHeight.current) * 100;
		// 	if (appointmentRef.current) appointmentRef.current.style.top = newProcentTop.current + '%';
		// }
	};

	const handleMouseUp = () => {
		// if (!isDragging.current || !isMoving.current) {
		// 	isDragging.current = false;
		// 	isMoving.current = false;
		// 	return;
		// }
		// appointmentList[appointmentIndex.current].start = moment(appointmentList[appointmentIndex.current].start.format('YYYY-MM-DD') + ' ' + startTime.format('HH:mm')).add(
		// 	procentToMinutes(newProcentTop.current),
		// 	'minutes'
		// );
		// appointmentList[appointmentIndex.current].end = moment(appointmentList[appointmentIndex.current].end.format('YYYY-MM-DD') + ' ' + startTime.format('HH:mm')).add(
		// 	procentToMinutes(newProcentTop.current + appointmentProcentHeightRef.current),
		// 	'minutes'
		// );
		// isDragging.current = false;
		// if (appointmentRef.current) appointmentRef.current.style.zIndex = '1';
		// isMoving.current = false;
		// setAppointmentForCurentDate(appointmentList);
	};

	const getTileStyle = (tile: ITile) => {
		let backgroundStyles = {
			backgroundColor: tile.appointment.backgroundColor ?? defaultAppointmentBgColor,
			inset: '1px',
			opacity: tile.appointment.opacity ?? defaultAppointmentOpacity,
		};

		let titleStyles = {
			color: '#fff',
		};

		let extendedBackgroundStyles = {};
		let extendedTitleStyle = {};

		if (setAppointmentStyle) {
			({ extendedBackgroundStyles, extendedTitleStyle } = setAppointmentStyle(tile.appointment));
		}

		backgroundStyles = { ...backgroundStyles, ...extendedBackgroundStyles };
		titleStyles = { ...titleStyles, ...extendedTitleStyle };

		return { backgroundStyles, titleStyles };
	};

	return (
		<div className={'dates grid  w-full'} style={{ gridTemplateColumns: `repeat(${daysArray.length}, minmax(0, 1fr))` }}>
			{daysArray.map((day: any, index: number) => (
				<div className="date pt-2 first:border-0 border-l dark:border-gray-600 border-gray-300" key={index}>
					<div className="day-inner relative h-full" ref={dayInnerRef}>
						<div className="appointments-list overflow-hidden absolute h-full left-0 top-0 right-0" onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
							{appointmentTiles[index] &&
								appointmentTiles[index].map((tile: ITile, tindex: number) => {
									return (
										<Link
											key={tile.appointment.title + '-' + tindex + tile.top}
											// onClick={() => {
											// 	onAppointmentClick(tile.appointment ?? {});
											// }}
											to={`/appointment/${tile.appointment.id}`}
											// onMouseDown={(e) => {
											// 	handleMouseDown(e, tindex);
											// }}
											className={'appointment text-[.8em]  absolute p-[2px] cursor-pointer'}
											style={{ height: tile.height + '%', width: tile.width + '%', left: tile.left + '%', top: tile.top + '%' }}
										>
											<div className={'appointment-conteiner rounded absolute'} style={getTileStyle(tile).backgroundStyles}></div>
											<div className={'sticky font-bold'} style={getTileStyle(tile).titleStyles}>
												<div className="appointment-title px-2 pt-1 hover:underline ">{tile.appointment.title}</div>
												{/* <div className="appointment-time px-2">{{tile.start.format('hh:mm A')} - {form tile.end.format('hh:mm A')}}</div> */}
											</div>
										</Link>
									);
								})}
						</div>
						{timesArray.map((time: string, index: number) => (
							<div key={index} className={'date-time dark:border-gray-600 border-gray-300 border-t'} style={{ height: blockHeight + 'px' }}></div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default Grids;
