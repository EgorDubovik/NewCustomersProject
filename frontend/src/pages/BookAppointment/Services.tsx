import React, { useContext } from 'react';
import { CustomerContext } from './CustomerContext';
import { CustomerContextType } from './@types';
const Services = () => {
	const { services, selectedServices, updateSelectedServices, setSliderIndex } = useContext(CustomerContext) as CustomerContextType;
	const onselected = (id: number) => {
		updateSelectedServices(id);
	};

	const nextPage = () => {
		setSliderIndex(2);
	};

	return (
		<div className="col-span-2 text-left p-2 pb-12">
			<h2 className="font-bold">Select service</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
				{services.map((service, index) => {
					return (
						<div
							key={index}
							className="bg-white border rounded-lg shadow-md text-sm cursor-pointer"
							onClick={() => {
								onselected(service.id);
							}}
						>
							<div className={'rounded-t-lg p-2 flex justify-between ' + (selectedServices.includes(service.id) ? 'bg-blue-500 text-white' : 'text-gray-800')}>
								<div className="font-bold text-lg pl-4">{service.title}</div>
								<div className={'selected ' + (selectedServices.includes(service.id) ? 'visible' : 'invisible')}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>
								</div>
							</div>
							<div className="text-gray-700 pl-6 p-2 ">{service.description}</div>
							<div className="text-blue-600 pl-6 pb-2  text-lg">${service.price}</div>
						</div>
					);
				})}
			</div>
			<div className="justify-end mt-10 hidden md:flex">
				{selectedServices.length > 0 ? (
					<button onClick={nextPage} type="button" className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 font-medium rounded-md text-sm px-10 py-2 me-2 mb-2">
						Continue{' '}
						<svg className="ml-2" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed">
							<path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
						</svg>
					</button>
				) : (
					<button type="button" className="flex items-center text-white bg-blue-300 font-medium rounded-md text-sm px-10 py-2 me-2 mb-2" disabled>
						Continue{' '}
						<svg className="ml-2" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed">
							<path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
						</svg>
					</button>
				)}
			</div>
			<div className="text-right fixed md:hidden bottom-0 left-0 w-full pl-4 pr-4">
				{selectedServices.length > 0 ? (
					<button onClick={nextPage} type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 font-medium rounded-md text-sm px-3 py-1.5 me-2 mb-2 w-full">
						Continue
					</button>
				) : (
					<button type="button" className="text-white bg-blue-300 font-medium rounded-md text-sm px-3 py-1.5 me-2 mb-2 w-full" disabled>
						Continue
					</button>
				)}
			</div>
		</div>
	);
};

export default Services;
