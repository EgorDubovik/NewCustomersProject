import { PageCirclePrimaryLoader } from '../../components/loading/PageLoading';
import { PageLoadError } from '../../components/loading/Errors';
import { ButtonLoader } from '../../components/loading/ButtonLoader';
import Dropdown from '../../components/Dropdown';
import IconEdit from '../../components/Icon/IconEdit';
import IconTrash from '../../components/Icon/IconTrash';
import { SmallDangerLoader } from '../../components/loading/SmallCirculeLoader';
import { useCompanyTags } from './hooks/useCompanyTags';

const CompanyTags = () => {
	const { loadingStatus, tag, setTag, selectColor, selectedColor, isDropdownOpen,colors,storeStatus, saveTagHandle, handelEditTag, handleColorClick,deleteStatus, handleDeleteTag, tags } = useCompanyTags();
	return (
		<div>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<div className="panel md:w-1/2 w-full m-auto">
					<h3 className="font-semibold text-lg dark:text-white-light">Create or remove company tags</h3>
					<div className="flex items-center gap-2">
						<input type="text" value={tag.title} onChange={(e) => setTag({...tag,['title']:e.target.value})} className="form-input w-3/4" placeholder="Enter tag title" />
						<div id="color" className={`w-1/4 bg-${tag.color} h-10 rounded cursor-pointer relative`} onClick={handleColorClick}>
							{isDropdownOpen && (
								<div className="absolute w-full top-8 shadow-lg mt-2 rounded">
									{colors.map(
										(color, index) => tag.color !== color && <div key={index} className={`p-2 mt-2 cursor-pointer bg-${color} h-10 rounded`} onClick={() => selectColor(color)}></div>
									)}
								</div>
							)}
						</div>
						<button className="btn btn-primary" onClick={saveTagHandle}>
							{ storeStatus ? <ButtonLoader /> : tag.id === 0 ? 'Add' : 'Update'}
							{/* {storeStatus ? <ButtonLoader /> : 'Add'} */}
						</button>
					</div>
					<div className="mt-4">
						{tags.map((tag, index: number) => (
							<div className="inline-flex ml-4 mb-2" key={index}>
								<button className={`btn btn-sm bg-${tag.color} rounded-r-none border-none text-white shadow-none`}>
                           {deleteStatus === tag.id ? <SmallDangerLoader /> : tag.title}
                        </button>
								<div className="dropdown border-none">
                           
									<Dropdown
										placement={'bottom-start'}
										btnClassName={`btn btn-sm dropdown-toggle bg-${tag.color} rounded-l-none border-0 before:border-[5px] before:border-l-transparent before:border-r-transparent  before:border-b-0 h-full`}
										button={<span className="sr-only">Toggle dropdown</span>}
									>
										<ul className="!min-w-[170px]">
											<li>
												<button type="button" onClick={()=>handelEditTag(tag.id)}><IconEdit/> <span className='ml-2'>Edit</span></button>
											</li>
											<li>
												<button type="button" onClick={()=>handleDeleteTag(tag.id)}><IconTrash/> <span className='ml-2'>Delete</span></button>
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
