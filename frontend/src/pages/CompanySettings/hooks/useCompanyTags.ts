import { useState, useEffect } from 'react';
import axiosClient from '../../../store/axiosClient';
interface ITag {
	id: number;
	title: string;
	color: string;
	company_id: number;
}
export const useCompanyTags = () => {
   const [tags, setTags] = useState<ITag[]>([]);
	const [loadingStatus, setLoadingStatus] = useState<string>('loading');
	const [newTagTitle, setNewTagTitle] = useState<string>('');
	const [storeStatus, setStoreStatus] = useState<boolean>(false);
   const [deleteStatus, setDeleteStatus] = useState<number>(0);
	const [tag, setTag] = useState<ITag>({
		id: 0,
		title: '',
		color: 'primary',
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

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState('primary'); // Default color

	// const colors = ['primary', 'success', 'danger', 'warning', 'info', '[#f0f]'];
	const colors = [
		'[#4A90E2]', // Soft blue
		'[#7ED321]', // Lime green
		'[#D0021B]', // Bright red
		'[#F8E71C]', // Sun yellow
		'[#50E3C2]', // Aqua teal
		'[#D8D8D8]', // Soft gray
		'[#4A4A4A]', // Charcoal gray
		'[#9013FE]', // Deep purple
		'[#FF4081]', // Blush pink
		'[#00BCD4]', // Cool cyan
	];
	const handleColorClick = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const selectColor = (color: string) => {
		setTag({ ...tag,['color']:color });
		setIsDropdownOpen(false); // Close the dropdown after selecting
	};

	const saveTagHandle = () => {
		if(tag.id === 0){
			saveTag();
		} else {
			updateTag();
		}
	};
   const handelEditTag = (tagId:number) => {
		const tag = tags.find((tag) => tag.id === tagId);
		setTag(tag ? tag : { id: 0, title: '', color: 'primary', company_id: 0 });
   }

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
					setTags([...tags, res.data]);
					setNewTagTitle('');
					setTag({...tag,['title']:''});
				})
				.catch((err) => {
					alert('Something went wrong. Please try again later');
					console.log(err);
				})
				.finally(() => {
					setStoreStatus(false);
				});
	}
	const updateTag = () => {
		if (storeStatus) return;
		axiosClient.put(`company/settings/tags/${tag.id}`, tag)
			.then((res) => {
				if (res.status === 200) {
					setTags(tags.map((t) => t.id === tag.id ? tag : t));
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
					color: 'primary',
					company_id: 0,
				});
			});
		
	}

   const handleDeleteTag = (tagId:number) => {
      setDeleteStatus(tagId);
      axiosClient.delete(`company/settings/tags/${tagId}`)
         .then((res) => {
            console.log(res);
            if(res.status === 200){
               setTags(tags.filter((tag) => tag.id !== tagId));
            }
         })
         .catch((err) => {
            alert('Something went wrong. Please try again later');
            console.log(err);
         })
         .finally(() => {
            setDeleteStatus(0);
         });
   }

   return { tags, loadingStatus, tag, setTag, saveTagHandle, isDropdownOpen, handleColorClick, colors, selectColor, selectedColor, storeStatus, deleteStatus, handelEditTag, handleDeleteTag };
}
