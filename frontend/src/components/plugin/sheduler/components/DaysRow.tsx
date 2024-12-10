import { formatDate } from '../../../../helpers/helper';

interface DaysRowProps {
	selectedDay: Date;
}
const DaysRow = (props: DaysRowProps) => {
	const { selectedDay } = props;
	const today = new Date();
	const getDaysArray = (selectedDay: Date) => {
		const daysArray = [];

		const current = new Date(selectedDay.getTime());
		const dayOfWeek = current.getDay(); // 0 (Sunday) to 6 (Saturday)
		const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Adjust for Sunday being 0
		current.setDate(current.getDate() + diffToMonday);

		// Collect days from Monday to Sunday
		for (let i = 0; i < 7; i++) {
			const day = formatDate(current, 'DDD DD');
			daysArray.push({
				title: day,
				isSelect: current.getFullYear() === today.getFullYear() && current.getMonth() === today.getMonth() && current.getDate() === today.getDate(),
			});
			current.setDate(current.getDate() + 1);
		}

		return daysArray;
	};

	const daysArray = getDaysArray(selectedDay);
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
