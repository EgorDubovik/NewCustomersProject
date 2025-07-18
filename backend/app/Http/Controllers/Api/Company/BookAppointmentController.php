<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BookAppointment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
class BookAppointmentController extends Controller
{
   function index()
   {
      $this->authorize('book-online');

      $bookAppointmentSettings = Auth::user()->company->bookAppointment;

      if (!$bookAppointmentSettings) {
         $bookAppointmentSettings = BookAppointment::create([
            'company_id' => Auth::user()->company->id,
            'key' => Str::random(30),
            'active' => 1,
         ]);
      }

      $comapnyServices = Auth::user()->company->services ?? [];
      $bookAppointmentServices = $bookAppointmentSettings->services ?? [];
      $tags = $bookAppointmentSettings->tags ?? [];

      $employees = Auth::user()->company->techs;
      $selectedEmployeesId = [1];

      return response()->json([
         'settings' => $bookAppointmentSettings,
         'companyServices' => $comapnyServices,
         'bookAppointmentServices' => $bookAppointmentServices,
         'bookAppointmentTagsId' => $tags,
         'employees' => $employees,
         'selectedEmployeesId' => $selectedEmployeesId,
      ], 200);
   }

   function workingTime(Request $request)
   {
      $request->validate([
         'workingTime' => 'required|json',
      ]);

      $this->authorize('book-online');

      Auth::user()->company->bookAppointment->update(['working_time' => $request->workingTime]);

      return response()->json(['workingTime' => $request->workingTime], 200);
   }


   function update(Request $request)
   {
      $request->validate([
         'active' => 'required|boolean',
      ]);

      $this->authorize('book-online');

      Auth::user()->company->bookAppointment->update(['active' => $request->active]);

      return response()->json(['active' => $request->active], 200);
   }

   function updateServices(Request $request)
   {

      $services = $request->services ?? [];

      $this->authorize('book-online');

      $bookAppointment = Auth::user()->company->bookAppointment;

      $bookAppointment->services()->sync($services);

      return response()->json(['services' => $services], 200);
   }
   public function updateTags(Request $request)
   {
      $company = Auth::user()->company;
      $this->authorize('edit-company', ['company' => $company]);
      $bookAppointment = $company->bookAppointment;
      $bookAppointment->update([
         'tags' => json_encode($request->tags)
      ]);

      return response()->json(['message' => 'Book appointment tags updated'], 200);
   }
}
