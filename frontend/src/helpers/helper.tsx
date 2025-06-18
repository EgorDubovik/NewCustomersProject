import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { IAppointment } from '../types';
export const viewCurrency = (amount: number | undefined) => {
	if (typeof amount === 'string') amount = parseFloat(amount);

	if (amount === undefined || isNaN(amount)) return '$0.00';
	return amount.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	});
};

export const calculateTotalPaid = (payments: any) => {
	return payments.reduce((acc: any, payment: any) => {
		const amount = parseFloat(payment.amount);
		return acc + amount;
	}, 0);
};

export const calculateTaxAndTotal = (services: any, taxRate: number) => {
	taxRate = taxRate / 100;
	let tax = 0;
	let total = 0;
	services.forEach((service: any) => {
		const price = parseFloat(service.price);
		total += price;
		if (service.taxable) tax += price * taxRate;
	});
	total += tax;
	return { tax, total };
};
export const calculateRemaining = (payments: any, total: number) => {
	const totalPaid = payments.reduce((acc: any, payment: any) => {
		const amount = parseFloat(payment.amount);
		return acc + amount;
	}, 0);
	const remaining = total - totalPaid;
	return Math.round(remaining * 100) / 100;
};
export const getTechAbr = (name: string) => {
	return name
		.split(' ')
		.map((n: string) => n[0])
		.join('');
};

export const manualIsoString = (date: Date) => {
	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date
		.getMinutes()
		.toString()
		.padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}Z`;
};

export const showMessage = (msg = '', type = 'success') => {
	const toast: any = Swal.mixin({
		toast: true,
		position: 'top',
		showConfirmButton: false,
		timer: 3000,
		customClass: { container: 'toast' },
	});
	toast.fire({
		icon: type,
		title: msg,
		padding: '10px 20px',
	});
};

export const formatDate = (date: Date | string | undefined, format: string) => {
	if (date === undefined || !date) return '';
	if (typeof date === 'string') date = new Date(date);
	if (!(date instanceof Date)) {
		throw new Error('Invalid date object');
	}

	const zeroPad = (num: number) => num.toString().padStart(2, '0');

	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const dayAbbreviations = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	// First, handle longer tokens to avoid partial replacements
	const replacements: { [key: string]: string | number } = {
		YYYY: date.getFullYear(),
		YY: date.getFullYear().toString().slice(-2),
		MMMM: monthNames[date.getMonth()],
		MMM: monthAbbreviations[date.getMonth()],
		MM: zeroPad(date.getMonth() + 1), // Months are zero-based in JavaScript
		M: date.getMonth() + 1,
		DDDD: dayNames[date.getDay()],
		DDD: dayAbbreviations[date.getDay()],
		DD: zeroPad(date.getDate()),
		D: date.getDate(),
		HH: zeroPad(date.getHours()),
		H: date.getHours(),
		hh: zeroPad(date.getHours() % 12 || 12),
		h: date.getHours() % 12 || 12,
		mm: zeroPad(date.getMinutes()),
		m: date.getMinutes(),
		A: date.getHours() < 12 ? 'AM' : 'PM',
		ss: zeroPad(date.getSeconds()),
	};

	return format.replace(/YYYY|YY|MMMM|MMM|MM|M|DDDD|DDD|DD|D|HH|H|hh|h|mm|m|A|ss/g, (match) => replacements[match as keyof typeof replacements].toString());
};

export const alertSuccsess = (text: string) => {
	const toast = Swal.mixin({
		toast: true,
		position: 'top',
		showConfirmButton: false,
		timer: 3000,
	});
	toast.fire({
		icon: 'success',
		title: text,
		padding: '10px 20px',
	});
};

export const alertError = (text: string) => {
	const toast = Swal.mixin({
		toast: true,
		position: 'top',
		showConfirmButton: false,
		timer: 3000,
	});
	toast.fire({
		icon: 'error',
		title: text,
		padding: '10px 20px',
	});
};

export const alertInfo = (text: string) => {
	const toast = Swal.mixin({
		toast: true,
		position: 'top',
		showConfirmButton: false,
		timer: 3000,
	});
	toast.fire({
		icon: 'info',
		title: text,
		padding: '10px 20px',
	});
};

export const hexToRgb = (hex: string) => {
	let cleanHex = hex.replace('#', '');
	if (cleanHex.length === 3) {
		cleanHex = cleanHex
			.split('')
			.map((c) => c + c)
			.join('');
	}
	const bigint = parseInt(cleanHex, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	return { r, g, b };
};

export const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }) => {
	return (
		'#' +
		[r, g, b]
			.map((x) => {
				const hex = x.toString(16);
				return hex.length === 1 ? '0' + hex : hex;
			})
			.join('')
	);
};

export const mixHexColors = (hexColors: string[]) => {
	const total = hexColors.length;
	const rgbValues = hexColors.map(hexToRgb);

	const average = rgbValues.reduce(
		(acc, { r, g, b }) => {
			acc.r += r;
			acc.g += g;
			acc.b += b;
			return acc;
		},
		{ r: 0, g: 0, b: 0 }
	);

	average.r = Math.round(average.r / total);
	average.g = Math.round(average.g / total);
	average.b = Math.round(average.b / total);

	return rgbToHex(average);
};

export const getAppointmentColor = (appointment: IAppointment) => {
	if (appointment.techs.length === 0) {
		return '#1565c0';
	}
	const colors = appointment.techs.map((tech) => tech.color);

	return mixHexColors(colors);
};

export const resizeImage = (file: File, maxWidth: number) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const reader = new FileReader();

		reader.onload = (e) => {
			img.src = e.target?.result as string;
		};

		img.onload = () => {
			const canvas = document.createElement('canvas');
			const scaleFactor = maxWidth / img.width;
			const width = img.width > maxWidth ? maxWidth : img.width;
			const height = img.width > maxWidth ? img.height * scaleFactor : img.height;

			canvas.width = width;
			canvas.height = height;

			const ctx = canvas.getContext('2d');
			if (ctx) {
				ctx.drawImage(img, 0, 0, width, height);
			}
			const base64 = canvas.toDataURL('image/jpeg', 0.9); // you can change type and quality
			resolve(base64);
		};

		reader.onerror = (error) => reject(error);
		reader.readAsDataURL(file);
	});
};

export const formatCallDurationText = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	const minPart = minutes > 0 ? `${minutes} min` : '';
	const secPart = `${remainingSeconds} sec`;

	return [minPart, secPart].filter(Boolean).join(' ');
};
