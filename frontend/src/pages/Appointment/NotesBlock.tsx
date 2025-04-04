import { useState, useRef } from 'react';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axiosClient from '../../store/axiosClient';
import { ButtonLoader } from '../../components/loading/ButtonLoader';
import { SmallDangerLoader } from '../../components/loading/SmallCirculeLoader';
import { useAppointmentContext } from './context/AppointmentContext';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { formatDate } from '../../helpers/helper';

const NotesBlock = () => {
	const { appointment, updateNotes } = useAppointmentContext();
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const notes = appointment?.notes;
	const appointmentId = appointment?.id;
	const [newNote, setNewNote] = useState<string>('');
	const [loadingSaveNote, setLoadingSaveNote] = useState<boolean>(false);
	const [loadingRemoveNote, setLoadingRemoveNote] = useState<number>(0);
	const userInformation = useSelector((state: IRootState) => state.themeConfig.user);
	const handleChange = (event: any) => {
		setNewNote(event.target.value);
		const rowCount = (event.target.value.match(/\n/g) || []).length + 1;
		rowCount > 4 ? (event.target.rows = 4) : (event.target.rows = rowCount);
	};

	const handleScroll = (event: any) => {
		event.stopPropagation();
	};

	const handelSaveNote = () => {
		setLoadingSaveNote(true);
		axiosClient
			.post(`job/notes/${appointment?.job_id}`, { text: newNote })
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					notes?.unshift(res.data.note);
					updateNotes(notes || []);
					if (textareaRef.current) textareaRef.current.rows = 1;
					setNewNote('');
				}
			})
			.catch((err) => {
				alert('Something went wrong. Please try again later');
				console.log(err);
			})
			.finally(() => {
				setLoadingSaveNote(false);
			});
	};

	const handleRemoveNote = (noteId: number) => {
		setLoadingRemoveNote(noteId);
		axiosClient
			.delete(`job/notes/${noteId}`)
			.then((res) => {
				if (res.status === 200) {
					updateNotes(notes?.filter((note) => note.id !== noteId) || []);
				}
			})
			.catch((err) => {
				alert('Something went wrong. Please try again later');
				console.log(err);
			})
			.finally(() => {
				setLoadingRemoveNote(0);
			});
	};

	return (
		<div className="panel p-4 relative">
			<h3 className="font-semibold text-lg dark:text-white-light">Notes</h3>
			<PerfectScrollbar onWheel={handleScroll} className="pb-10 max-h-[260px] scrollbar-container">
				<ul className="mt-2">
					{notes?.map((note, index: number) => (
						<li key={index} className="flex justify-between items-center mb-2 border-b dark:border-gray-800 pb-2">
							<div className="">
								<div className="creator dark:text-gray-600 text-gray-400">
									{note.creator.name} {formatDate(note.updated_at, 'MMM DD')}
								</div>
								<div className="note mt-1 dark:text-gray-300 text-gray-500" dangerouslySetInnerHTML={{ __html: note.text.replace(/\n/g, '<br>') }}></div>
							</div>
							{loadingRemoveNote === note.id ? (
								<SmallDangerLoader />
							) : (
								note.creator.id === userInformation.id && (
									<div className="">
										<button type="button" onClick={() => handleRemoveNote(note.id)} className="ml-4">
											<IconTrashLines />
										</button>
									</div>
								)
							)}
						</li>
					))}
				</ul>
			</PerfectScrollbar>
			<div className="flex absolute bottom-2 right-2 left-2">
				<textarea
					ref={textareaRef}
					rows={1}
					value={newNote}
					onChange={handleChange}
					placeholder="Type note here..."
					className="form-textarea ltr:rounded-r-none rtl:rounded-l-none"
					onKeyDown={(e) => {
						if (e.key === 'Enter' && e.ctrlKey) {
							e.preventDefault();
							if (newNote.trim()) {
								handelSaveNote();
							}
						}
					}}
				/>
				<button onClick={handelSaveNote} type="button" className="btn btn-secondary ltr:rounded-l-none rtl:rounded-r-none">
					{loadingSaveNote ? <ButtonLoader /> : 'Save'}
				</button>
			</div>
		</div>
	);
};

export default NotesBlock;
