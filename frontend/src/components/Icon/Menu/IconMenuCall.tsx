import React from 'react';

interface IconMenuCallProps {
	className?: string;
}
const IconMenuCall: React.FC<IconMenuCallProps> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
			<path d="M0 0h24v24H0z" fill="none" />
			<path
				d="M13 9h-2v2h2V9zm4 0h-2v2h2V9zm3 6.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 9v2h2V9h-2z"
				fill="currentColor"
			/>
		</svg>
	);
};

export default IconMenuCall;
