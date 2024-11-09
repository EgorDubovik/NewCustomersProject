<?php

namespace App\Http\Controllers;

use App\Models\Addresses;
use App\Models\Company;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function edit(){
        $company = Auth::user()->company;
        Gate::authorize('edit-company',['company' => $company]);
        
        return view('company.edit',['company' => $company]);
        //return redirect()->route]('profile');
    }

    public function update(Request $request){
        $company = Auth::user()->company;
        Gate::authorize('edit-company',['company' => $company]);
        
        if ($company->address()->exists()) {
            $company->address->update([
                'line1' => ($request->line1) ? $request->line1 : "",
                'line2' => ($request->line2) ? $request->line2 : "",
                'city' => ($request->city) ? $request->city : "",
                'state' => ($request->state) ? $request->state : "",
                'zip' => ($request->zip) ? $request->zip : "",
            ]);
        } else {
          $address = Addresses::create([
              'line1' => ($request->line1) ? $request->line1 : "",
              'line2' => ($request->line2) ? $request->line2 : "",
              'city' => ($request->city) ? $request->city : "",
              'state' => ($request->state) ? $request->state : "",
              'zip' => ($request->zip) ? $request->zip : "",
              'customer_id' => 0,
          ]);
          $company->address_id = $address->id;
        }

        $company->update([
            'name' => $request->customer_name,
            'phone' => $request->customer_phone,
            'email' => $request->email,
        ]);
        return redirect()->route('profile')->with('success', 'Information has been updated successful');
    }

    public function uploadLogo(Request $request){
        
        $company = Auth::user()->company;
        Gate::authorize('edit-company',['company'=> $company]);
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg'
        ]);

        $filePath = 'logos/'.time() . '_' . $request->file('logo')->hashName();
        
        $image = Image::make($request->file('logo'));
        
        if ($image->width() > env('UPLOAD_WIDTH_SIZE'))
        
            $image->resize(env('UPLOAD_WIDTH_SIZE'), env('UPLOAD_WIDTH_SIZE'), function ($constraint) {
                $constraint->aspectRatio();
            });
            
        $image = $image->encode();
        $path = Storage::disk('s3')->put($filePath, $image);
        if(!$path)
            return back()->withErrors('Something went wrong');
        
        if($company->logo){
            Storage::disk('s3')->delete($company->logo);
        }
        
        $company->logo = $filePath;
        $company->save();
        return back();
    }
}
