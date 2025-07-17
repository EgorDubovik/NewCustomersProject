const ADMIN = 1;
const TECHNICIAN = 2;
const DISPATCHER = 3;

export const canViewCalls = (user: any) => {
	if (user.roles.includes(ADMIN) || user.roles.includes(DISPATCHER)) {
		return true;
	}
	return false;
};

export const canViewAndChangeCompanySettings = (user: any) => {
	if (user.roles.includes(ADMIN)) {
		return true;
	}
	return false;
};
