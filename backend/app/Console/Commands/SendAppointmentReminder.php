<?php

namespace app\Console\Commands;

use App\Models\Appointment;
use App\Notifications\AppointmentReminder;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class SendAppointmentReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'appointment_reminder:send';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send Appointment reminder';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $currentTime = Carbon::now();
        $nextHour = Carbon::now()->addHour();

        $appointments = Appointment::where('start','>=',$currentTime)
                                ->where('start','<=',$nextHour)
                                ->get();
        
        foreach($appointments as $appointment)
            foreach($appointment->techs as $tech){
                $tech->notify(new AppointmentReminder($appointment));
            }


        return 0;
    }
}
