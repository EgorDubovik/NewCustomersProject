<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\AppointmentNotes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class AppointmentNotesController extends Controller
{
    public function store(Request $request, Appointment $appointment)
    {
        Gate::authorize('appointment-store-note', $appointment);
        
        AppointmentNotes::create([
            'appointment_id' => $appointment->id,
            'creator_id'    => Auth::user()->id,
            'text'          => nl2br($request->text),
        ]);

        return back();
    }
}
