<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserSettings;
use Illuminate\Http\Request;

class UserSettingsController extends Controller
{
	public function update(Request $request)
	{
		$user = $request->user();

		foreach ($request->all() as $key => $value) {
			UserSettings::setSetting($user->id, $key, $value);
		}

		return response()->json(['message' => 'User settings updated successfully'], 200);
	}
}
