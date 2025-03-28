import { PageCirclePrimaryLoader } from '../../components/loading/PageLoading';
import { PageLoadError } from '../../components/loading/Errors';
import { ButtonLoader } from '../../components/loading/ButtonLoader';
import Dropdown from '../../components/Dropdown';
import IconEdit from '../../components/Icon/IconEdit';
import IconTrash from '../../components/Icon/IconTrash';
import { SmallDangerLoader } from '../../components/loading/SmallCirculeLoader';
import { useCompanyTags } from './hooks/useCompanyTags';
import { ChromePicker } from 'react-color';
import { useState } from 'react';
const CompanyTags = () => {
	const { loadingStatus, tag, setTag, selectedColor, storeStatus, saveTagHandle, handelEditTag, deleteStatus, handleDeleteTag, tags, handleColorSelected } = useCompanyTags();
	const [showColorPicker, setShowColorPicker] = useState(false);
	return (
		<div>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<div className="panel md:w-1/2 w-full m-auto">
					<h3 className="font-semibold text-lg dark:text-white-light">Create or remove company tags</h3>
					<div className="flex items-center gap-2 mt-4">
						<input type="text" value={tag.title} onChange={(e) => setTag({ ...tag, ['title']: e.target.value })} className="form-input w-3/4" placeholder="Enter tag title" />
						<div id="color" className={`w-1/4 h-10 relative `}>
							<div
								className="absolute flex items-center justify-center text-white cursor-pointer rounded-md top-0 left-0 w-full h-full z-10"
								style={{ backgroundColor: selectedColor }}
								onClick={() => setShowColorPicker(!showColorPicker)}
							>
								Choose color
							</div>
							{showColorPicker && (
								<div className="absolute top-12 left-0 w-full h-full z-20">
									<div className="fixed top-0 left-0 right-0 bottom-0" onClick={() => setShowColorPicker(false)}></div>
									<ChromePicker disableAlpha={true} color={selectedColor} onChange={(color) => handleColorSelected(color.hex)} />
								</div>
							)}
						</div>

						<button className="btn btn-primary" onClick={saveTagHandle}>
							{storeStatus ? <ButtonLoader /> : tag.id === 0 ? 'Add' : 'Update'}
							{/* {storeStatus ? <ButtonLoader /> : 'Add'} */}
						</button>
					</div>
					<p className="text-[13px] mt-4 text-gray-500 dark:text-gray-400">If you need same color as another tag, please just click on the tag</p>
					<div className="inline-flex flex-wrap gap-3 mt-4">
						{tags.map((tag, index: number) => (
							<div className="inline-flex" key={index}>
								<button className={`btn btn-sm rounded-r-none border-none text-white shadow-none`} style={{ backgroundColor: tag.color }} onClick={() => handleColorSelected(tag.color)}>
									{deleteStatus === tag.id ? <SmallDangerLoader /> : tag.title}
								</button>
								<div className="dropdown border-none">
									<Dropdown
										placement={'bottom-start'}
										btnClassName={`btn btn-sm dropdown-toggle rounded-l-none border-0 before:border-[5px] before:border-l-transparent before:border-r-transparent  before:border-b-0 h-full`}
										style={{ backgroundColor: tag.color }}
										button={<span className="sr-only">Toggle dropdown</span>}
									>
										<ul className="!min-w-[170px]">
											<li>
												<button type="button" onClick={() => handelEditTag(tag.id)}>
													<IconEdit /> <span className="ml-2">Edit</span>
												</button>
											</li>
											<li>
												<button type="button" onClick={() => handleDeleteTag(tag.id)}>
													<IconTrash /> <span className="ml-2">Delete</span>
												</button>
											</li>
										</ul>
									</Dropdown>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CompanyTags;
