import { useState, useEffect } from 'react';
import axiosClient from '../../../store/axiosClient';
import { useDispatch } from 'react-redux';
import { setCompanyTags } from '../../../store/themeConfigSlice';
interface ITag {
	id: number;
	title: string;
	color: string;
	company_id: number;
}
export const useCompanyTags = () => {
	const [tags, setTags] = useState<ITag[]>([]);
	const DefaultColor = '#9812B7';
	const [loadingStatus, setLoadingStatus] = useState<string>('loading');
	const [newTagTitle, setNewTagTitle] = useState<string>('');
	const [storeStatus, setStoreStatus] = useState<boolean>(false);
	const [deleteStatus, setDeleteStatus] = useState<number>(0);
	const [selectedColor, setSelectedColor] = useState(DefaultColor);
	const dispatch = useDispatch();

	const [tag, setTag] = useState<ITag>({
		id: 0,
		title: '',
		color: DefaultColor,
		company_id: 0,
	});
	useEffect(() => {
		setLoadingStatus('loading');
		axiosClient
			.get('company/settings/tags')
			.then((res) => {
				setTags(res.data);
				setLoadingStatus('success');
			})
			.catch((err) => {
				setLoadingStatus('error');
				console.log(err);
			});
	}, []);

	const saveTagHandle = () => {
		if (tag.id === 0) {
			saveTag();
		} else {
			updateTag();
		}
	};
	const handelEditTag = (tagId: number) => {
		const tag = tags.find((tag) => tag.id === tagId);
		setTag(tag ? tag : { id: 0, title: '', color: DefaultColor, company_id: 0 });
		setSelectedColor(tag ? tag.color : DefaultColor);
	};

	const handleColorSelected = (color: string) => {
		setSelectedColor(color);
		setTag({ ...tag, color: color });
	};

	const saveTag = () => {
		if (storeStatus) return;
		const data = {
			title: tag.title,
			color: tag.color,
		};
		setStoreStatus(true);
		axiosClient
			.post('company/settings/tags', data)
			.then((res) => {
				let newTags = [...tags, res.data];
				setTags(newTags);
				setNewTagTitle('');
				setTag({ ...tag, ['title']: '' });
				dispatch(setCompanyTags(newTags));
			})
			.catch((err) => {
				alert('Something went wrong. Please try again later');
				console.log(err);
			})
			.finally(() => {
				setStoreStatus(false);
			});
	};
	const updateTag = () => {
		if (storeStatus) return;
		axiosClient
			.put(`company/settings/tags/${tag.id}`, tag)
			.then((res) => {
				if (res.status === 200) {
					let newTags = tags.map((t) => (t.id === tag.id ? tag : t));
					setTags(newTags);
					dispatch(setCompanyTags(newTags));
				}
			})
			.catch((err) => {
				alert('Something went wrong. Please try again later');
				console.log(err);
			})
			.finally(() => {
				setStoreStatus(false);
				setTag({
					id: 0,
					title: '',
					color: DefaultColor,
					company_id: 0,
				});
			});
	};

	const handleDeleteTag = (tagId: number) => {
		setDeleteStatus(tagId);
		axiosClient
			.delete(`company/settings/tags/${tagId}`)
			.then((res) => {
				if (res.status === 200) {
					let newTags = tags.filter((tag: ITag) => tag.id !== tagId);
					setTags(newTags);
					dispatch(setCompanyTags(newTags));
				}
			})
			.catch((err) => {
				alert('Something went wrong. Please try again later');
				console.log(err);
			})
			.finally(() => {
				setDeleteStatus(0);
			});
	};

	return {
		tags,
		loadingStatus,
		tag,
		setTag,
		saveTagHandle,
		selectedColor,
		setSelectedColor,
		storeStatus,
		deleteStatus,
		handelEditTag,
		handleDeleteTag,
		handleColorSelected,
	};
};
