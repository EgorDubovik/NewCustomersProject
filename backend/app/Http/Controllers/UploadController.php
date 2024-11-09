<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;
use App\Models\Image as NewImage;

class UploadController extends Controller
{

    public function store(Customer $customer, Request $request){

        Gate::authorize('upload-images', ['customer' => $customer]);

        $request->validate([
            'images' => 'required',
            'images.*' => 'image|mimes:jpeg,png,jpg',
        ]);

        foreach ($request->file('images') as $picture) {
            $filePath = 'images/'.time() . '_' . $picture->hashName();
            $image = Image::make($picture);
            if ($image->width() > env('UPLOAD_WIDTH_SIZE'))
                $image->resize(env('UPLOAD_WIDTH_SIZE'), null, function ($constraint) {
                    $constraint->aspectRatio();
                });
            $image = $image->encode();
            
            $path = Storage::disk('s3')->put($filePath, $image);
            if(!$path)
                return back()->withErrors('Something went wrong');

            NewImage::create([
                'customer_id' => $customer->id,
                'path' => $filePath,
                'owner_id' => Auth::user()->id,
            ]);
        }

        return redirect()->back()->with('status', 'Pictures uploaded successfully!');
    }

    public function view(Request $request, NewImage $image){

        Gate::authorize('show-images',['image' => $image]);
        
        return Storage::disk('s3')->response($image->path);
    }

    public function delete(Request $request, NewImage $image){
        Gate::authorize('delete-images',['image'=>$image]);
        Storage::disk('s3')->delete($image->path);
        $image->delete();
        return back();
    }

}
