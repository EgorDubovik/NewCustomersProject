<?php

namespace App\Http\Controllers\Api\Job;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job\Job;
use App\Models\Job\Service;
use Illuminate\Support\Facades\Gate;

class JobServicesController extends Controller
{
    public function store(Request $request, $job_id){

        $job = Job::find($job_id);
        if(!$job)
            return response()->json(['error' => 'Job not found'], 404);

        $this->authorize('store', [Service::class, $job]);

        $service = $job->services()->create([
            'title' => $request->title,
            'price' => $request->price,
            'taxable' => $request->taxable,
            'description' => $request->description,
        ]);

        return response()->json(['service' => $service], 200);
    }

    public function update(Request $request, $job_id, $service_id){

        $job = Job::find($job_id);
        if(!$job)
            return response()->json(['error' => 'Job not found'], 404);

        $service = Service::find($service_id);
        if(!$service)
            return response()->json(['error' => 'Service not found'], 404);

        $this->authorize('update', $service);

        $service->update([
            'title' => $request->title,
            'price' => $request->price,
            'taxable' => $request->taxable,
            'description' => $request->description,
        ]);

        return response()->json(['service' => $service], 200);
    }

    public function destroy($job_id, $service_id){

        $job = Job::find($job_id);
        if(!$job)
            return response()->json(['error' => 'Job not found'], 404);

        $service = Service::find($service_id);
        if(!$service)
            return response()->json(['error' => 'Service not found'], 404);

        $this->authorize('delete', $service);

        $service->delete();

        return response()->json(['message' => 'Service deleted'], 200);
    }
}
