<?php

namespace App\Http\Controllers\Api\Job;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Job\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\ImageManager;

class JobImagesController extends Controller
{
   function store(Request $request, $appointment_id)
   {
      $request->validate([
         'image' => 'required|file|mimetypes:image/jpeg,image/png,image/jpg,image/heic,image/heif|max:2048',
      ]);      

      $appointment = Appointment::find($appointment_id);

      $this->authorize('update-remove-appointment', $appointment);

      
      $filePath = 'images/'.(env('APP_DEBUG') ? 'debug/' : "").'app'.$appointment_id.'-' . time() . '_' . $request->image->hashName();
      $s3path = env('AWS_FILE_ACCESS_URL');

      $manager = new ImageManager(new Driver());

      $image = $manager->read($request->image);
      $image->scaleDown(width:env('UPLOAD_WIDTH_SIZE'));
      $image = $image->toJpeg();
      $filePath = preg_replace('/\.[^.]+$/', '.jpg', $filePath);
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

   function destroy($appointment_id, $image_id)
   {
      $appointment = Appointment::find($appointment_id);
      $this->authorize('update-remove-appointment', $appointment);
      
      $image = Image::find($image_id);
      if($appointment->job_id != $image->job_id)
         return response()->json(['error' => 'No premitions'], 404);

      if (!$image)
         return response()->json(['error' => 'Image not found'], 404);

      // Extract relative path from full S3 URL
      $path = parse_url($image->path, PHP_URL_PATH);
      $relativePath = ltrim($path, '/'); // Remove leading slash if present
      $deleted = Storage::disk('s3')->delete($relativePath);
   
      if ($deleted) {
            $image->delete();
            return response()->json(['success' => 'You have successfully deleted the image.'], 200);
      } else {
            return response()->json(['error' => 'Failed to delete image from S3'], 500);
      }
   }

}
