import { useEffect, useRef, useState } from 'react';
import { ICall } from './type';
import IconPhoneMissed from '../../components/Icon/IconPhoneMissed';
import IconPhoneForwarded from '../../components/Icon/IconPhoneForwarded';
import IconClose from '../../components/Icon/IconClose';
import IconPersonAdd from '../../components/Icon/IconPersonAdd';
import IconPlayArrow from '../../components/Icon/IconPlayArrow';
import { formatCallDurationText, formatDate } from '../../helpers/helper';
import IconIncomingCall from '../../components/Icon/InconIncomingCall';
import IconPause from '../../components/Icon/IconPause';
import { Link } from 'react-router-dom';

const CallInfo = ({ selectedCall, setSelectedCall }: { selectedCall: ICall; setSelectedCall: (call: ICall | null) => void }) => {
	const height = 30;
	const barCount = 60;
	const bars = useRef<number[]>(Array.from({ length: barCount }, () => Math.floor(Math.random() * height)));
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
		if (!selectedCall.recording_url) return;
		setCurrentTime(0);
		setDuration(0);
		setProgress(0);
		setIsPlaying(false);
		bars.current = Array.from({ length: barCount }, () => Math.floor(Math.random() * height));
	}, [selectedCall.recording_url]);

	useEffect(() => {
		if (!selectedCall.recording_url) return;
		const audio = audioRef.current;
		if (!audio) return;

		const updateProgress = () => {
			setCurrentTime(audio.currentTime);
			setProgress((audio.currentTime / audio.duration) * 100);
		};

		const setAudioDuration = () => {
			setDuration(audio.duration);
		};

		audio.addEventListener('timeupdate', updateProgress);
		audio.addEventListener('loadedmetadata', setAudioDuration);
		audio.addEventListener('ended', () => setIsPlaying(false));

		return () => {
			audio.removeEventListener('timeupdate', updateProgress);
			audio.removeEventListener('loadedmetadata', setAudioDuration);
		};
	}, [selectedCall.recording_url]);
	const togglePlayback = () => {
		const audio = audioRef.current;
		if (!audio) return;

		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
		setIsPlaying(!isPlaying);
	};

	return (
		<div>
			<div className={`header flex items-center justify-between rounded-t-lg dark:text-white text-gray-800  `}>
				<div className="flex items-center gap-2">
					<div className="">
						{selectedCall.is_missed_call ? (
							<IconPhoneMissed className="w-6 h-6 text-danger" />
						) : selectedCall.direction === 'incoming' ? (
							<IconIncomingCall className="w-6 h-6 text-success" />
						) : (
							<IconPhoneForwarded className="w-6 h-6 text-info" />
						)}
					</div>
					<div className="number">
						{selectedCall.customer ? (
							<Link className="text-base text-primary" to={`/customer/${selectedCall.customer.id}`}>
								<p className="text-xl">{selectedCall.customer.name}</p>
								<p className="text-sm dark:text-gray-400 text-gray-600">{selectedCall.from_number}</p>
							</Link>
						) : (
							<p className="dark:text-white text-base">{selectedCall.from_number}</p>
						)}
					</div>
				</div>
				<div className="actions flex items-center gap-4">
					<button className="text-white" onClick={() => setSelectedCall(null)}>
						<IconClose className="w-6 h-6" />
					</button>
				</div>
			</div>
			<div className="content mt-4">
				<div className="call-info py-4">
					<div className="grid grid-cols-3 gap-2 items-center">
						<div>
							<p className="text-sm font-semibold">Duration:</p>
							<p className="text-sm dark:text-white text-gray-600">{formatCallDurationText(selectedCall.duration_seconds)}</p>
						</div>
						<div>
							<p className="text-sm font-semibold">Answered:</p>
							<p className="text-sm dark:text-white text-gray-600">{formatDate(selectedCall.answered_at, 'at HH:mm A')}</p>
						</div>
						<div>
							<p className="text-sm font-semibold">Created Date:</p>
							<p className="text-sm dark:text-white text-gray-600">{formatDate(selectedCall.created_at, 'MMM DD YYYY at HH:mm A')}</p>
						</div>
					</div>
				</div>

				{selectedCall.recording_url && (
					<div className="call-record flex items-center gap-2 mt-4 ml-auto">
						<div className="">
							{isPlaying ? (
								<button onClick={togglePlayback}>
									<IconPause className="w-10 h-10 text-primary" />
								</button>
							) : (
								<button onClick={togglePlayback}>
									<IconPlayArrow className="w-10 h-10 text-primary" />
								</button>
							)}
						</div>
						<div className={`relative h-[${height}px] overflow-hidden flex items-end gap-[2px]  p-2 rounded-md`}>
							{bars.current.map((height, i) => (
								<div
									key={i}
									className="w-[3px] bg-gray-400 transition-colors duration-300"
									style={{
										height: `${height}px`,
										backgroundColor:
											(i / barCount) * 100 < progress
												? '#3b82f6' // Tailwind's blue-500
												: '#d1d5db', // gray-300
									}}
								/>
							))}
						</div>
						<div className="progress flex items-center gap-2">
							<div className="time">{formatCallDurationText(currentTime)}</div>/<div className="duration">{formatCallDurationText(duration)}</div>
						</div>
						<audio ref={audioRef} src={selectedCall.recording_url} preload="metadata" />
					</div>
				)}
				<div className="call-actions border-t border-gray-200 dark:border-gray-800 mt-4 flex items-center justify-start">
					{!selectedCall.customer && (
						<div className="mt-4">
							<Link
								to={`/customers/create?phone=${selectedCall.from_number}`}
								className="flex items-center gap-2 px-4 py-2 rounded dark:bg-primary/10 bg-primary/10  dark:text-white text-gray-700 hover:bg-primary/20 "
							>
								<IconPersonAdd className="w-6 h-6  text-success" />
								Create Customer
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CallInfo;
