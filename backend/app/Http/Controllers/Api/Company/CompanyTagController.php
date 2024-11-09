<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CompanySettings\CompanyTag;

class CompanyTagController extends Controller
{
    public function index(){
        $companyTags = CompanyTag::where('company_id', auth()->user()->company_id)->get();
        return response()->json($companyTags);
    }

    public function store(Request $request){

        $this->authorize('create', CompanyTag::class);

        $request->validate([
            'title' => 'required',
            'color' => 'required',
        ]);

        $companyTag = new CompanyTag();
        $companyTag->title = $request->title;
        $companyTag->color = $request->color;
        $companyTag->company_id = auth()->user()->company_id;
        $companyTag->save();

        return response()->json($companyTag);
    }

    public function update(Request $request, $id){

        $companyTag = CompanyTag::find($id);
        if(!$companyTag){
            return response()->json(['message' => 'Company Tag not found'], 404);
        }
        
        $this->authorize('update', $companyTag);

        $request->validate([
            'title' => 'required',
            'color' => 'required',
        ]);

        $companyTag->title = $request->title;
        $companyTag->color = $request->color;
        $companyTag->save();

        return response()->json($companyTag);
    }

    public function delete(Request $request,  $id){
        $companyTag = CompanyTag::find($id);
        if(!$companyTag){
            return response()->json(['message' => 'Company Tag not found'], 404);
        }
        $this->authorize('delete', $companyTag);
        $companyTag->delete();
        return response()->json(['message' => 'Company Tag deleted successfully']);
    }
}
