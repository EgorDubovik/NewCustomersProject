import { useState } from 'react';

const Employee = () => {
	const [employees, setEmployees] = useState<any[]>([]);
	return (
		<div>
			<h1 className="text-base">Specify who will receive the booking request</h1>
			<div>list of employees</div>
		</div>
	);
};

export default Employee;
