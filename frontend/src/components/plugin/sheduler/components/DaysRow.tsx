import { formatDate } from '../../../../helpers/helper';

interface DaysRowProps {
	selectedDay: Date;
	daysArray: any;
}
const DaysRow = (props: DaysRowProps) => {
	const { selectedDay, daysArray } = props;

	return (
		<div className="scheduler-weekdays flex mt-2 border-b dark:border-gray-600 border-gray-300">
			<div className="first-item w-10"></div>
			<div key={daysArray.length} className={'weekdays text-center grid w-full'} style={{ gridTemplateColumns: `repeat(${daysArray.length}, minmax(0, 1fr))` }}>
				{daysArray.map((day: { title: string; isSelect: boolean }, index: number) => (
					<div key={index} className={`weekday py-2 ${day.isSelect ? 'bg-blue-900 rounded-t text-white' : ''}`}>
						{day.title}
					</div>
				))}
			</div>
		</div>
	);
};

export default DaysRow;
