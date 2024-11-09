<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Models\AppointmentService;

class AppointmentServiceController extends Controller
{
    public function store(Request $request, Appointment $appointment)
    {   
        Gate::authorize('add-remove-service-from-appointment',[$appointment]);
         
        $appointmentService = AppointmentService::create([
            'appointment_id' => $appointment->id,
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
        ]);
        return response()->json(['success' => 'success','service' => $appointmentService], 200);
    }

    public function delete(Request $request, AppointmentService $appointmentService) {
        
        Gate::authorize('add-remove-service-from-appointment',[$appointmentService->appointment]);
        $appointmentService->delete();
        
        return response()->json(['success' => 'success'], 200);

    }

    public function update(Request $request) {
        $appointmentService = AppointmentService::find($request->serviceId);
        if(!$appointmentService)
            return abort(404);

        Gate::authorize('add-remove-service-from-appointment',[$appointmentService->appointment]);

        $appointmentService->update([
            'title'           => $request->title,
            'price'           => $request->price,
            'description'     => $request->description,
        ]);

        return response()->json(['success' => 'success','service' => $appointmentService], 200);

    }
}
