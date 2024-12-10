import { formatDate } from '../../../../helpers/helper';
import { getTimesArray } from '../utils/helper';

interface TimesColProps {
	blockHeight: number;
	timesArray: string[];
}

const TimesCol = (props: TimesColProps) => {
	const { blockHeight, timesArray } = props;

	return (
		<div className={'times text-[0.8em] w-10 pt-2'}>
			{timesArray.map((time, index) => (
				<div key={index} className={'time  border-t border-transparent'} style={{ height: blockHeight + 'px' }}>
					<div className="time-title  -mt-2">{time}</div>
				</div>
			))}
		</div>
	);
};

export default TimesCol;
