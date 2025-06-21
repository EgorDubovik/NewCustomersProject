export interface ICall {
	id: string;
	from_number: string;
	to_number: string;
	direction: string;
	conversation_id: string;
	user_id: string;
	phone_number_id: string;
	duration_seconds: number;
	status: string;
	is_missed_call: boolean;
	recording_url: string;
	voicemail_url: string;
	voicemail_duration: number;
	answered_at: string;
	completed_at: string;
	created_at: string;
	updated_at: string;
	customer: {
		id: string;
		name: string;
		phone_number: string;
	};
}
