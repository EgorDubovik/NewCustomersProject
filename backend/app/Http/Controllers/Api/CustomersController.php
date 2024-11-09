<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\ReferalLinksCode;
use Illuminate\Support\Facades\DB;

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
      $customer = Customer::where('company_id', Auth::user()->company->id)
         ->with([
            'address',
            'jobs.appointments.techs',
            'jobs.services',
            'tags',
         ])
         ->find($id);

      if (!$customer) {
         return response()->json(['error' => 'Customer not found'], 404);
      }


      

      // foreach ($customer->jobs as $job) {
      //    $job->totalPaid = $job->totalPaid();
      //    $job->remainingBalance = $job->remainingBalance();
      //    $job->techs = $job->techs;
      // }

      return response()->json($customer, 200);
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

         $customer->address()->create([
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
         return response()->json(['error' => 'Error creating customer'], 500);
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
      $address->delete();
      $customer->load('address');
      return response()->json(['customer' => $customer], 200);
   }
}
