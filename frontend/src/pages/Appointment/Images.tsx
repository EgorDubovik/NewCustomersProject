import React, { useState, useRef, useEffect } from 'react';
import IconPlus from '../../components/Icon/IconPlus';
import axiosClient from '../../store/axiosClient';
import { useAppointmentContext } from './context/AppointmentContext';
import IconTrash from '../../components/Icon/IconTrash';
import { alertError, alertSuccsess } from '../../helpers/helper';
import { SmallDangerLoader } from '../../components/loading/SmallCirculeLoader';
import CircularProgress from '../../components/loading/CircularProgress';

type UploadinImage = {
	file: File;
	previewUrl: string;
	progress: number;
};

const Images = (props: any) => {
	const { appointment, updateImages } = useAppointmentContext();

	const appointmentId = appointment?.id;
	const [images, setImages] = useState<any[]>(appointment?.images || []);
	const fileInputRef = useRef(null);
	const [showGallery, setShowGallery] = useState(false);
	const [showImageIndex, setShowImageIndex] = useState(0);
	const [delytingImageId, setDelytingImageId] = useState(0);
	const [uploadingImages, setUploadingImages] = useState<UploadinImage[]>([]);

	const handleLinkClick = () => {
		if (fileInputRef.current) {
			(fileInputRef.current as HTMLInputElement).click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);

		const previews = files.map((file) => ({
			file,
			previewUrl: URL.createObjectURL(file),
			progress: 70,
		}));
		uploadAll(previews);
		setUploadingImages(previews);
	};

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	const uploadAll = async (imagesToUpload: UploadinImage[]) => {
		console.log('uploading images', imagesToUpload);

		for (let i = 0; i < imagesToUpload.length; i++) {
			const image = imagesToUpload[i];
			const formData = new FormData();
			formData.append('image', image.file);

			try {
				const res = await axiosClient.post(`appointment/images/${appointmentId}`, formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
					onUploadProgress: (e) => {
						console.log('progress', e);
						if (e.total) {
							const percent = Math.round((e.loaded * 100) / e.total);
							setUploadingImages((prev) => prev.map((img, index) => (index === i ? { ...img, progress: percent } : img)));
						}
					},
				});

				console.log('uploaded image', res.data.image);
				setUploadingImages((prev) => prev.filter((img, index) => index !== i));
				setImages((prevImages) => [...prevImages, res.data.image]);
			} catch (err) {
				alertError('Ошибка загрузки файла');
			}
		}
		// Очистить после загрузки
		setUploadingImages([]);
	};

	const openGallery = (index: number) => {
		console.log('open gallery');
		setShowImageIndex(index);
		setShowGallery(true);
	};
	const setNextImage = () => {
		if (showImageIndex < images.length - 1) {
			setShowImageIndex(showImageIndex + 1);
		} else {
			setShowImageIndex(0);
		}
	};

	const setPrevImage = () => {
		if (showImageIndex > 0) {
			setShowImageIndex(showImageIndex - 1);
		} else {
			setShowImageIndex(images.length - 1);
		}
	};

	const destroyImage = (id: number) => {
		setDelytingImageId(id);
		axiosClient
			.delete('appointment/images/' + appointment?.id + '/' + id)
			.then((response) => {
				setImages(images.filter((image) => image.id !== id));
			})
			.catch((error) => {
				if (error.response?.status === 404) {
					alertError('Image not found');
					setImages(images.filter((image) => image.id !== id));
					return;
				}
				alertError('Error deleting image');
			})
			.finally(() => {
				setDelytingImageId(0);
			});
	};
	return (
		<>
			<div className="flex items-center justify-between px-4 py-2">
				<h3 className="font-semibold text-lg dark:text-white-light">Images</h3>
				<button onClick={handleLinkClick} className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
					<IconPlus className="w-4 h-4" />
				</button>
				<input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" multiple />
			</div>
			<div className="grid grid-cols-4 md:grid-cols-7 gap-3 p-2">
				{images.map((image: any, index: number) => (
					<div key={index} className={`relative group`}>
						{delytingImageId == image.id && (
							<div className="absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center">
								<SmallDangerLoader />
							</div>
						)}
						{delytingImageId != image.id && (
							<div
								onClick={() => destroyImage(image.id)}
								className="absolute top-[-1px] right-0 w-full h-[20px] rounded-t-lg bg-gray-950/90 flex justify-center hover:text-danger cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
							>
								<IconTrash />
							</div>
						)}
						{delytingImageId == image.id && <div className="absolute w-full h-full z-10 blur bg-gray-950/50"></div>}
						<img src={image.path} className={`w-full cursor-pointer rounded-lg h-20 ${delytingImageId == image.id ? 'blur' : ''}`} onClick={() => openGallery(index)} />
					</div>
				))}
				{uploadingImages.map((img, index) => (
					<div key={`preview-${index}`} className="relative w-full h-20">
						<img src={img.previewUrl} className="w-full h-full object-cover rounded-lg" />
						{img.progress <= 100 && (
							<div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
								<CircularProgress progress={img.progress} />
							</div>
						)}
					</div>
				))}
			</div>

			{showGallery && (
				<>
					<div className="z-60 fixed bottom-0 top-0 left-0 right-0 bg-black bg-opacity-80 "></div>
					<div className="z-80 fixed top-0 left-0 w-10 md:w-20 h-full cursor-pointer bg-black bg-opacity-80 hover:bg-opacity-100" onClick={setPrevImage}>
						<div className="flex items-center justify-center h-full">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-9-7 9-7" />
							</svg>
						</div>
					</div>
					<div className="z-70 fixed bottom-0 top-0 left-0 right-0" onClick={() => setShowGallery(false)}>
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<img src={images[showImageIndex]?.path} className="w-full h-full object-cover rounded-lg" />
						</div>
					</div>
					<div className="z-80 fixed right-0 top-0 w-10 md:w-20 h-full cursor-pointer bg-black bg-opacity-80 hover:bg-opacity-100" onClick={setNextImage}>
						<div className="flex items-center justify-center h-full">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Images;
