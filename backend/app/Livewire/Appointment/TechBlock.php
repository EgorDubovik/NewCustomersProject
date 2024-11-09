<?php

namespace App\Livewire\Appointment;

use App\Models\Appointment;
use Livewire\Component;
use Illuminate\Support\Facades\Gate;
use App\Models\AppointmentTechs;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TechBlock extends Component
{

    public $appointment = null;
    public $techs;
    public $appointment_techs = [];
    public $mode = "save";


    public function mount(){
        if($this->mode == 'save')
            $this->appointment_techs = $this->appointment->techs;
        else if($this->mode == 'create')
            $this->appointment_techs[] = Auth::user();
    }

    public function render()
    {
        $this->techs = User::where('company_id', Auth::user()->company_id)
            ->where('active','1')
            ->get();

        return view('livewire.appointment.tech-block',[
            'techs'=>$this->techs,
            'appointment_techs' => $this->appointment_techs
        ]);
    }

    public function add($tech_id){

        if($this->appointment != null)
            Gate::authorize('add-tech-to-appointment',['appointment'=>$this->appointment,'tech_id'=>$tech_id]);
        
        if(!$this->isConteins($tech_id)){

            if($this->mode == 'save'){

                AppointmentTechs::create([
                    'appointment_id' => $this->appointment->id,
                    'tech_id'        => $tech_id,
                    'creator_id'     => Auth::user()->id,
                ]);
                
            }

            $this->appointment_techs[] = User::find($tech_id);
            
        }

        $this->dispatch('close-modal');
    }

    public function delete($tech_id){

        if($this->appointment != null){
            Gate::authorize('update-remove-appointment',['appointment'=>$this->appointment]);
            AppointmentTechs::where('appointment_id',$this->appointment->id)
                ->where('tech_id',$tech_id)
                ->delete();
        }

        foreach($this->appointment_techs as $key => $tech){
            if($tech->id == $tech_id){
                unset($this->appointment_techs[$key]);
            }
        }
    }

    private function isConteins($id){
        foreach($this->appointment_techs as $tech){
            if($tech->id == $id)
                return true;
        }
        return false;
    }
}
