<?php

namespace App\Http\Controllers\Api\Company;

use App\Models\CompanySettings\EndPointToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class EndPointTokenController extends Controller
{
	public function show()
	{
		$company = Auth::user()->company;

		if (!$company) {
			return response()->json([
				'message' => 'Company not found',
			], 404);
		}

		$accessToken = EndPointToken::where('company_id', $company->id)->first();

		return response()->json([
			'token' => $accessToken->token ?? null,
		]);
	}

	public function store()
	{
		$company = Auth::user()->company;

		if (!$company) {
			return response()->json([
				'message' => 'Company not found',
			], 404);
		}

		$accessToken = EndPointToken::updateOrCreate([
			'company_id' => $company->id,
		], [
			'token' => Str::random(60),
		]);

		return response()->json([
			'message' => 'Access token created successfully',
			'token' => $accessToken->token,
		]);
	}

	public function delete()
	{
		$company = Auth::user()->company;

		if (!$company) {
			return response()->json([
				'message' => 'Company not found',
			], 404);
		}

		EndPointToken::where('company_id', $company->id)->delete();

		return response()->json([
			'message' => 'Access token deleted successfully',
		]);
	}
}
