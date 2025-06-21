import { FC } from 'react';

interface IconPlayArrowProps {
	className?: string;
}

const IconPlayArrow: FC<IconPlayArrowProps> = ({ className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" className={className}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M8 5v14l11-7z" fill="currentColor" />
		</svg>
	);
};

export default IconPlayArrow;
