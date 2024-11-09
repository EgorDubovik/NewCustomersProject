<?php

namespace App\Http\Controllers\Api\Job;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Job\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\ImageManagerStatic as Imagec;

class JobImagesController extends Controller
{
   function store(Request $request, $appointment_id)
   {
      $request->validate([
         'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
      ]);

      $appointment = Appointment::find($appointment_id);

      $this->authorize('update-remove-appointment', $appointment);

      $filePath = 'images/app'.$appointment_id.'-' . time() . '_' . $request->image->hashName();
      $s3path = env('AWS_FILE_ACCESS_URL');

      $image = Imagec::make($request->image);
      if ($image->width() > env('UPLOAD_WIDTH_SIZE'))
         $image->resize(env('UPLOAD_WIDTH_SIZE'), null, function ($constraint) {
            $constraint->aspectRatio();
         });
      $image = $image->encode();

      $path = Storage::disk('s3')->put($filePath, $image);
      if (!$path)
         return response()->json(['error' => 'Something went wrong'], 500);
      Image::create([
         'job_id' => $appointment->job_id,
         'path' => $s3path.$filePath,
         'owner_id' => Auth::user()->id,
      ]);

      return response()->json(['success' => 'You have successfully uploaded the image.', 'path' => $s3path.$filePath], 200);
   }

   function index (Request $request, Appointment $appointment)
   {
      $this->authorize('view-appointment', $appointment);

      $images = $appointment->images;

      return response()->json(['images' => $images], 200);
      
   }
}
