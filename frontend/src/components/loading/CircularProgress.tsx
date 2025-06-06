type CircularProgressProps = {
	progress: number; // от 0 до 100
};

const CircularProgress = ({ progress }: CircularProgressProps) => {
	const offset = 100 - progress;

	return (
		<div className="relative w-10 h-10">
			<svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
				{/* фон */}
				<circle className="text-gray-700" stroke="currentColor" strokeWidth="2" fill="none" cx="18" cy="18" r="15.9155" />
				{/* активная часть */}
				<circle
					className="text-white transition-all duration-300 ease-in-out"
					stroke="currentColor"
					strokeWidth="2"
					strokeDasharray="100"
					strokeDashoffset={offset}
					fill="none"
					cx="18"
					cy="18"
					r="15.9155"
				/>
			</svg>
			<span className="absolute inset-0 flex items-center justify-center text-xs text-white font-semibold">{progress}%</span>
		</div>
	);
};

export default CircularProgress;
