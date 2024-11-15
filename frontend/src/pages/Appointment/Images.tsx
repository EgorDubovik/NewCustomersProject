import React, { useState, useRef, useEffect } from 'react';
import IconPlus from '../../components/Icon/IconPlus';
import axiosClient from '../../store/axiosClient';
import { useAppointmentContext } from './context/AppointmentContext';
import IconTrash from '../../components/Icon/IconTrash';
import { alertError, alertSuccsess } from '../../helpers/helper';
import axios, { AxiosError } from 'axios';
import { SmallDangerLoader } from '../../components/loading/SmallCirculeLoader';
import heic2any from 'heic2any';

const Images = (props: any) => {
	const { appointment, updateImages } = useAppointmentContext();

	const appointmentId = appointment?.id;
	const [images, setImages] = useState<any[]>(appointment?.images || []);
	const [uploadingStatus, setUploadingStatus] = useState('');
	const fileInputRef = useRef(null);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [showGallery, setShowGallery] = useState(false);
	const [showImageIndex, setShowImageIndex] = useState(0);
	const [delytingImageId, setDelytingImageId] = useState(0);
	const [testError, setTestError] = useState<String[]>([]);

	useEffect(() => {
		handleUpload();
	}, [selectedFiles]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFiles([...event.target.files!]);
	};

	const handleLinkClick = () => {
		if (fileInputRef.current && !uploadingStatus) {
			(fileInputRef.current as HTMLInputElement).click();
		}
	};

	const removeMetadata = async (file: File): Promise<File> => {
		return new Promise((resolve, reject) => {
		  const reader = new FileReader();
		  reader.readAsArrayBuffer(file);
		  reader.onloadend = () => {
			 const buffer = reader.result as ArrayBuffer;
			 const blob = new Blob([buffer], { type: file.type });
			 resolve(new File([blob], file.name, { type: file.type }));
		  };
		  reader.onerror = reject;
		});
	 };

	const handleUpload = async () => {
		if (selectedFiles.length == 0) return;
		try {
			for (let i = 0; i < selectedFiles.length; i++) {
				let file = selectedFiles[i];

				setUploadingStatus(`${i + 1}/${selectedFiles.length} uploading...`);
				
				
				console.log('File name:', file.name);
				console.log('File type:', file.type);
				console.log('File size (KB):', file.size / 1024);
				const formData = new FormData();
				// const reader = new FileReader();
				// reader.readAsDataURL(file);
				// await new Promise((resolve, reject) => {
				// 	reader.onloadend = () => {
				// 		const base64String = typeof reader.result === 'string' ? reader.result.split(',')[1] : '';
				// 		formData.append('image', base64String);
				// 		resolve(void 0);
				// 	};
				// 	reader.onerror = reject;
				// });
				formData.append('image', file);

				try {
					const response = await axiosClient.post('appointment/images/' + appointmentId, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
						maxContentLength: 50 * 1024 * 1024,
					});
					console.log('File uploaded successfully:', response.data);
					setImages((prevImages) => [...prevImages, response.data.image]);
				} catch (error:any) {
					if (axios.isAxiosError(error)) {
						
						alertError(JSON.stringify(error.response));
						setTestError((prev) => [...prev, JSON.stringify(error?.response)]);
					} else {
						alertError('An unknown error occurred');
					}
					console.error('Error uploading file:', error);
					throw error;
				}
			}
			console.log('All files uploaded successfully');
		} catch (error: any) {
			setTestError((prev) => [...prev, JSON.stringify(error?.response)]);
			console.error('Error uploading one or more files:', error);
		} finally {
			setUploadingStatus('Uploading completed');
			setTimeout(() => {
				setUploadingStatus('');
			}, 2000);
			setSelectedFiles([]);
		}
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
				console.log('Image deleted successfully:', response.data);

				setImages(images.filter((image) => image.id !== id));
			})
			.catch((error) => {
				alertError('Error deleting image');
				console.error('Error deleting image:', error);
			})
			.finally(() => {
				setDelytingImageId(0);
			});
	};
	return (
		<>
			<div className="flex items-center justify-between px-4 py-2">
				<h3 className="font-semibold text-lg dark:text-white-light">Images</h3>
				<div>
					{testError.map((err, index) => (
						<div key={index}>{err}</div>
					))}
				</div>
				{uploadingStatus && <div className="ml-2">{uploadingStatus}</div>}
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
