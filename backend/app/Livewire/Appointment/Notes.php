<?php

namespace App\Livewire\Appointment;

use Livewire\Component;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use App\Models\AppointmentNotes;
use App\Models\Appointment;

class Notes extends Component
{
    public Appointment $appointment;
    public $note;

    public function render()
    {
        return view('livewire.appointment.notes');
    }

    public function store(){

        Gate::authorize('appointment-store-note', $this->appointment);

        $note = str_replace(['<','>'],['&lt;','&gt;'],$this->note);

        AppointmentNotes::create([
            'appointment_id' => $this->appointment->id,
            'creator_id'    => Auth::user()->id,
            'text'          => nl2br($note),
        ]);
        $this->reset('note');
    }
}
