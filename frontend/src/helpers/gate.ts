const ADMIN = 1;
const TECHNICIAN = 2;
const DISPATCHER = 3;

export const canViewCalls = (user: any) => {
	console.log(user);
	if (user.roles.includes(ADMIN) || user.roles.includes(DISPATCHER)) {
		return true;
	}
	return false;
};
