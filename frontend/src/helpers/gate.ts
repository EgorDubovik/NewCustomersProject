const ADMIN = 1;
const TECHNICIAN = 2;
const DISPATCHER = 3;

export const canViewCalls = (user: any) => {
	if (user.roles_ids.includes(ADMIN) || user.roles_ids.includes(DISPATCHER)) {
		return true;
	}
	return false;
};

export const canViewAndChangeCompanySettings = (user: any) => {
	if (user.roles_ids.includes(ADMIN)) {
		return true;
	}
	return false;
};

export const canChangeCustomerTags = (user: any) => {
	if (user.roles_ids.includes(ADMIN) || user.roles_ids.includes(DISPATCHER)) {
		return true;
	}
	return false;
};

export const canDeleteAppointment = (user: any) => {
	if (user.roles_ids.includes(ADMIN) || user.roles_ids.includes(DISPATCHER)) {
		return true;
	}
	return false;
};
