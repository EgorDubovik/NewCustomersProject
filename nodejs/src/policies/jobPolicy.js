export const canUploadImage = (user, job) => {
	return user.company_id === job.company_id;
};

export const canDeleteImage = (user, image) => {
	return user.id === image.owner_id;
};
