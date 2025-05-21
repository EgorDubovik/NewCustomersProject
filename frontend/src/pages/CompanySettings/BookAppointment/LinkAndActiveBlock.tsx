import { useState, useRef } from 'react';
import IconCopy from '../../../components/Icon/IconCopy';
import axiosClient from '../../../store/axiosClient';
import { ButtonLoader } from '../../../components/loading/ButtonLoader';
import { alertError, alertSuccsess } from '../../../helpers/helper';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const LinkAndActiveBlock = (props: any) => {
	const [settings, setSettings] = useState<any>(props.settings);
	const linkRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState(false);
	const [loadingTags, setLoadingTags] = useState(false);
	const tags = useSelector((state: any) => state.themeConfig.companySettings.companyTags);
	const [bookAppointmentTagsId, setBookAppointmentTagsId] = useState<number[]>(props.bookAppointmentTagsId);
	const [bookAppointmentTags, setBookAppointmentTags] = useState<any[]>([]);

	useEffect(() => {
		const bookAppointmentTags = tags.filter((tag: any) => bookAppointmentTagsId.includes(tag.id));
		console.log('bookAppointmentTags:', bookAppointmentTags);
		setBookAppointmentTags(bookAppointmentTags);
	}, [bookAppointmentTagsId, tags]);

	const coppyLink = () => {
		linkRef.current?.select();
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(linkRef.current?.value || '')
				.then(() => {
					alertSuccsess('Link copied successfully');
					console.log('copied');
				})
				.catch((err) => {
					alertError('Failed to copy link');
					console.log(err);
				});
		}
	};

	const changeActive = (e: any) => {
		setLoading(true);
		axiosClient
			.post('/company/settings/book-appointment/update', { active: e.target.checked })
			.then((res) => {
				console.log(res.data);
				setSettings({ ...settings, active: res.data.active });
			})
			.catch((err) => {
				console.log(err);
				alertError('Failed to update book appointment active status');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const changeBookAppointmentTags = (tags: any) => {
		const oldTags = bookAppointmentTags;
		setBookAppointmentTags(tags);
		setLoadingTags(true);
		axiosClient
			.post('/company/settings/book-appointment/tags', { tags: tags.map((tag: any) => tag.id) })
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
				alertError('Failed to update book appointment tags');
				setBookAppointmentTags(oldTags);
			})
			.finally(() => {
				setLoadingTags(false);
			});
	};

	const addTagToBookAppointmentOnline = (tagId: number) => {
		const newTags = [...bookAppointmentTags, tags.find((tag: any) => tag.id === tagId)];
		changeBookAppointmentTags(newTags);
	};

	const removeTagFromBookAppointmentOnline = (tagId: number) => {
		const newTags = bookAppointmentTags.filter((tag: any) => tag.id !== tagId);

		changeBookAppointmentTags(newTags);
	};

	return (
		<div className="panel p-4">
			<div className="mb-2">
				<div className="mb-4">{settings.active ? <p className="text-green-500">Book appointment online is active</p> : <p className="text-red-500">Book appointment online is inactive</p>}</div>
				<div className="flex items-center">
					<div className="flex items-center">
						<label className="w-12 h-6 relative mt-2">
							<input
								type="checkbox"
								className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
								id="custom_switch_checkbox1"
								checked={settings.active}
								onChange={changeActive}
							/>
							<span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
						</label>
						{loading && (
							<div className="w-5 h-5 ml-2">
								<ButtonLoader />
							</div>
						)}
					</div>
					<div className="flex w-full ml-10">
						<input
							disabled={settings.active ? false : true}
							ref={linkRef}
							readOnly
							id="addonsRight"
							type="text"
							placeholder=""
							className="form-input ltr:rounded-r-none rtl:rounded-l-none"
							value={window.location.origin + '/appointment/book/' + settings.key}
						/>
						<button type="button" className="btn btn-secondary ltr:rounded-l-none rtl:rounded-r-none" onClick={coppyLink}>
							<IconCopy />
						</button>
					</div>
				</div>
				<div className="grid grid-cols-2 mt-4">
					<div className="border-r dark:border-gray-800 pr-2">
						Choose a tag to link with this book appointment online:
						<div className="flex gap-2 mt-2">
							{tags.map((tag: any, index: number) =>
								bookAppointmentTags.find((t: any) => t.id === tag.id) ? null : (
									<button onClick={() => addTagToBookAppointmentOnline(tag.id)} key={index} className="btn btn-sm border-none text-white shadow-none" style={{ backgroundColor: tag.color }}>
										{tag.title}
									</button>
								)
							)}
						</div>
					</div>
					<div className="pl-2">
						<div className="flex items-center">Selected tags: {loadingTags && <ButtonLoader />}</div>
						<div className="flex gap-2 mt-2">
							{bookAppointmentTags.map((tag: any, index: number) => (
								<button onClick={() => removeTagFromBookAppointmentOnline(tag.id)} key={index} className="btn btn-sm border-none text-white shadow-none" style={{ backgroundColor: tag.color }}>
									{tag.title}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LinkAndActiveBlock;
