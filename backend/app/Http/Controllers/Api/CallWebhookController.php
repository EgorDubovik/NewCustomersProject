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

		if ($eventType === 'call.ringing') {
			// Создаём, если не существует
			$call = Call::firstOrCreate(
				['id' => $callId],
				[
					'from_number' => $data['from'],
					'to_number' => $data['to'],
					'direction' => $data['direction'],
					'status' => 'ringing',
					'conversation_id' => $data['conversationId'],
					'user_id' => $data['userId'] ?? null,
					'phone_number_id' => $data['phoneNumberId'],
				]
			);
		}

		if ($eventType === 'call.completed') {
			// Обновляем звонок
			$call = Call::find($callId);

			if ($call) {
				$isMissed = $data['direction'] === 'incoming' &&
					$data['status'] === 'completed' &&
					empty($data['answeredAt']);
				if (!empty($data['answeredAt']) && !empty($data['completedAt'])) {
					$answeredAt = Carbon::parse($data['answeredAt']);
					$completedAt = Carbon::parse($data['completedAt']);

					$durationSeconds = $completedAt->diffInSeconds($answeredAt);
				} else {
					$durationSeconds = 0;
				}
				$call->update([
					'status' => 'completed',
					'completed_at' => $data['completedAt'] ?? null,
					'answered_at' => $data['answeredAt'] ?? null,
					'voicemail_url' => $data['voicemail']['url'] ?? null,
					'voicemail_duration' => $data['voicemail']['duration'] ?? null,
					'is_missed_call' => $isMissed,
					'duration_seconds' => $durationSeconds,
				]);
			}
		}

		if ($eventType === 'call.recording.completed') {
			// Добавляем ссылку на запись
			$call = Call::find($callId);
			if ($call) {
				$call->update([
					'recording_url' => $data['recording']['url'] ?? null
				]);
			}
		}

		return response()->json(['status' => 'ok']);
	}
}
