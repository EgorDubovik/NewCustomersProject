<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Call;
use Carbon\Carbon;

class CallWebhookController extends Controller
{
	public function store(Request $request)
	{
		$eventType = $request->input('type');
		$data = $request->input('data.object');

		$callId = $data['id'];

		// Всегда либо находим, либо создаём базовую запись
		$call = Call::firstOrNew(['id' => $callId]);

		// Общие поля (могут прийти при любом событии)
		$call->fill([
			'from_number' => $data['from'] ?? $call->from_number,
			'to_number' => $data['to'] ?? $call->to_number,
			'direction' => $data['direction'] ?? $call->direction,
			'conversation_id' => $data['conversationId'] ?? $call->conversation_id,
			'user_id' => $data['userId'] ?? $call->user_id,
			'phone_number_id' => $data['phoneNumberId'] ?? $call->phone_number_id,
		]);

		if (!empty($data['answeredAt']) && !empty($data['completedAt'])) {
			$answeredAt = Carbon::parse($data['answeredAt']);
			$completedAt = Carbon::parse($data['completedAt']);
			$call->duration_seconds = $completedAt->diffInSeconds($answeredAt);
		}

		$call->status = $data['status'] ?? 'unknown';

		if ($eventType === 'call.ringing') {

		}

		if ($eventType === 'call.completed') {

			$call->completed_at = $data['completedAt'] ?? null;
			$call->answered_at = $data['answeredAt'] ?? null;

			$call->voicemail_url = $data['voicemail']['url'] ?? null;
			$call->voicemail_duration = $data['voicemail']['duration'] ?? null;

			$isMissed = $data['direction'] === 'incoming' &&
				($data['status'] ?? null) === 'completed' &&
				empty($data['answeredAt']);

			$call->is_missed_call = $isMissed;

		}

		if ($eventType === 'call.recording.completed') {
			// Попробуем вытащить первую запись из media[]
			$media = $data['media'][0] ?? null;
			if ($media) {
				$call->recording_url = $media['url'] ?? null;
			}

		}

		$call->save();

		return response()->json(['status' => 'ok']);
	}
}
