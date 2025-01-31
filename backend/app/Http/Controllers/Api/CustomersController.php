<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\ReferalLinksCode;
use App\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class CustomersController extends Controller
{
   public function index(Request $request)
   {
      $searchTerm = $request->input('search', '');
      $customers = Customer::where('company_id', Auth::user()->company->id)
         ->search($searchTerm)
         ->orderBy('created_at', 'DESC')
         ->with('address')
         ->paginate($request->limit ?? 10);

      return response()->json($customers);
   }

   public function show(Request $request, $id)
   {
      $user = Auth::user() ?? $request->user();
      $customer = Customer::where('company_id', $user->company->id)
         ->with([
            'address',
            'jobs' => function ($query) use ($user) {
               $query->with('appointments');
               if (!$user->isRole([Role::ADMIN, Role::DISP])) {
                  $query->whereHas('appointments.techs', function ($q) use ($user) {
                     $q->where('tech_id', $user->id);
                  });
               }
            },
            'jobs.appointments.techs',
            'jobs.services',
            'tags',
         ])
         ->find($id);

      $comapnyTags = Auth::user()->company->tags ?? [];

      if (!$customer) {
         return response()->json(['error' => 'Customer not found'], 404);
      }

      return response()->json(['customer' => $customer, 'companyTags' => $comapnyTags], 200);
   }

   public function store(Request $request)
   {
      $request->validate([
         'phone' => 'required',
         'address1' => 'required',
      ]);
      DB::beginTransaction();
      try {
         $customer = Customer::create([
            'name' => $request->name ?? 'Unknown',
            'phone' => $request->phone,
            'email' => $request->email,
            'company_id' => Auth::user()->company->id,
         ]);

         $address = $customer->address()->create([
            'line1' => $request->address1,
            'line2' => $request->address2,
            'city' => $request->city,
            'state' => $request->state,
            'zip' => $request->zip,
         ]);

         $referalCode = ReferalLinksCode::create([
            'company_id' => Auth::user()->company_id,
            'customer_id' => $customer->id,
            'code' => Str::random(10),
         ]);
         DB::commit();
      } catch (\Exception $e) {
         DB::rollBack();
         $address = null;
         return response()->json(['error' => 'Error creating customer'], 500);
      }

      // Get lan and lng from address
      if ($address) {
         $location = $this->getLatLong($address->full);
         if ($location) {
            $address->update([
               'lat' => $location['lat'],
               'lon' => $location['lng'],
            ]);
         }
      }

      return response()->json($customer);
   }

   public function update(Request $request, $customer_id)
   {
      $customer = Customer::find($customer_id);
      if (!$customer) {
         return response()->json(['error' => 'Customer not found'], 404);
      }

      $request->validate([
         'phone' => 'required',
      ]);

      $customer->update([
         'name' => $request->name ?? 'Unknown',
         'phone' => $request->phone,
         'email' => $request->email,
      ]);

      return response()->json(['customer' => $customer], 200);
   }

   public function updateAddress(Request $request, $customer_id, $address_id)
   {
      $customer = Customer::find($customer_id);
      if (!$customer) {
         return response()->json(['error' => 'Customer not found'], 404);
      }

      $address = $customer->address()->find($address_id);
      if (!$address) {
         return response()->json(['error' => 'Address not found'], 404);
      }

      $request->validate([
         'address1' => 'required',
      ]);

      $address->update([
         'line1' => $request->address1,
         'line2' => $request->address2,
         'city' => $request->city,
         'state' => $request->state,
         'zip' => $request->zip,
      ]);

      // Get lan and lng from address
      $location = $this->getLatLong($address->full);
      if ($location) {
         $address->update([
            'lat' => $location['lat'],
            'lon' => $location['lng'],
         ]);
      }

      $customer->load('address');

      return response()->json(['customer' => $customer], 200);
   }

   public function storeAddress(Request $request, $customer_id)
   {
      $customer = Customer::find($customer_id);
      if (!$customer) {
         return response()->json(['error' => 'Customer not found'], 404);
      }

      $request->validate([
         'address1' => 'required',
      ]);

      $address = $customer->address()->create([
         'line1' => $request->address1,
         'line2' => $request->address2,
         'city' => $request->city,
         'state' => $request->state,
         'zip' => $request->zip,
      ]);

      // Get lan and lng from address
      $location = $this->getLatLong($address->full);
      if ($location) {
         $address->update([
            'lat' => $location['lat'],
            'lon' => $location['lng'],
         ]);
      }

      $customer->load('address');

      return response()->json(['customer' => $customer], 200);
   }

   public function deleteAddress(Request $request, $customer_id, $address_id)
   {
      $customer = Customer::find($customer_id);
      if (!$customer) {
         return response()->json(['error' => 'Customer not found'], 404);
      }

      $address = $customer->address()->find($address_id);
      if (!$address) {
         return response()->json(['error' => 'Address not found'], 404);
      }
      $address->update([
         'active' => false,
      ]);
      $customer->load('address');
      return response()->json(['customer' => $customer], 200);
   }

   private function getLatLong($address)
   {
      $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
         'address' => $address,
         'key' => env('GOOGLE_MAPS_API_KEY'),
      ]);
      if ($response->ok() && isset($response['results'][0]['geometry']['location'])) {
         $location = $response['results'][0]['geometry']['location'];
         return [
            'lat' => $location['lat'],
            'lng' => $location['lng'],
         ];
      } else
         return null;
   }
}
