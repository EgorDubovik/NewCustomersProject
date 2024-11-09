<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompanyTechController extends Controller
{
    public function index(Request $request){
        $company = $request->user()->company;
        
        $techs = $company->techs->load('roles');

        return response()->json(['techs' => $techs], 200);
    }
}
