<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Call;
use Illuminate\Http\Request;

class CallController extends Controller
{
	public function index(Request $request)
	{
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
}
