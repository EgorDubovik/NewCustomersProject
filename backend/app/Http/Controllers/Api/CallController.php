<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Call;
use App\Models\CompanySettings\GeneralInfoSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CallController extends Controller
{
	public function index(Request $request)
	{
		$this->authorize('see-calls');
		$status = in_array($request->status, ['all', 'incoming', 'outgoing', 'missed']) ? $request->status : 'all';
		$calls = Call::orderBy('created_at', 'desc')
			->with('customer')
			->when($status !== 'all', function ($query) use ($status) {
				if ($status === 'missed') {
					$query->where('is_missed_call', true);
				} else {
					$query->where('direction', $status);
				}
			})
			->paginate($request->per_page ?? 10);

		return response()->json($calls);
	}


	public function getCallSettings(Request $request)
	{
		$this->authorize('change-call-settings');

		$callWebhookKey = GeneralInfoSettings::getSettingByKey($request->user()->company_id, 'callWebhookKey');
		return response()->json([
			'status' => 'success',
			'data' => [
				'callWebhookKey' => $callWebhookKey,
			],
		]);
	}

	public function createCallWebhook(Request $request)
	{
		$this->authorize('change-call-settings');

		$webhookKey = Str::random(32);
		GeneralInfoSettings::setSetting($request->user()->company_id, 'callWebhookKey', $webhookKey);
		return response()->json([
			'status' => 'success',
			'data' => [
				'callWebhookKey' => $webhookKey,
			],
		]);
	}

	public function deleteCallWebhook(Request $request)
	{
		$this->authorize('change-call-settings');

		GeneralInfoSettings::setSetting($request->user()->company_id, 'callWebhookKey', null);
		return response()->json([
			'status' => 'success',
		]);
	}
}
