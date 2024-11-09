<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;

class CompanyServicesController extends Controller
{
    public function index(Request $request){
        $company = $request->user()->company;
        if(!$company)
            return response()->json(['error' => 'Company not found'], 404);

        $services = $company->services()->orderBy('created_at', 'desc')->get();
        $userRoles = Auth::user()->roles->pluck('role')->toArray();
        $rolesTitles = Role::ROLES;
        $rolesWithTitles = array_map(function ($roleNumber) use ($rolesTitles) {
            return $rolesTitles[$roleNumber];
        }, $userRoles);
        
        return response()->json(['services' => $services, 'userRols'=>$rolesWithTitles], 200);
    }

    public function store(Request $request){
        $this->authorize('create-service');

        $company = $request->user()->company;
        if(!$company)
            return response()->json(['error' => 'Company not found'], 404);

        $request->validate([
            'title' => 'required',
            'price' => 'required|numeric',
        ]);

        $service = $company->services()->create([
            'title' => $request->title,
            'price' => $request->price,
            'description' => $request->description ?? '',
            'company_id' => $company->id,
        ]);

        return response()->json(['service' => $service], 200);
    }

    public function delete(Request $request, $id){
        

        $company = $request->user()->company;
        if(!$company)
            return response()->json(['error' => 'Company not found'], 404);

        $service = $company->services()->where('id',$id)->first();
        if(!$service)
            return response()->json(['error' => 'Service not found'], 404);

        $this->authorize('update-service', $service);

        $service->delete();
        return response()->json(['message' => 'Service deleted'], 200);
    }

    public function update(Request $request, $id){
        $company = $request->user()->company;
        if(!$company)
            return response()->json(['error' => 'Company not found'], 404);

        $service = $company->services()->where('id',$id)->first();
        if(!$service)
            return response()->json(['error' => 'Service not found'], 404);

        $this->authorize('update-service', $service);

        $request->validate([
            'title' => 'required',
            'price' => 'required|numeric',
        ]);

        $service->update([
            'title' => $request->title,
            'price' => $request->price,
            'description' => $request->description ?? '',
        ]);

        return response()->json(['service' => $service], 200);
    }
}
