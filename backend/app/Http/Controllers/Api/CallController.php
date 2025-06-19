<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Call;


class CallController extends Controller
{
	public function index()
	{
		$calls = Call::orderBy('created_at', 'desc')
			->with('customer')
			->get();

		return response()->json($calls);
	}
}
