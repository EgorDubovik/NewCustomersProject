<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Call;

class CallController extends Controller
{
	public function index()
	{
		$calls = Call::orderBy('created_at', 'desc')->get();

		return response()->json($calls);
	}
}
