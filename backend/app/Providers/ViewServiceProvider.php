<?php

namespace App\Providers;

use App\Models\Customer;
use Illuminate\Support\Facades;
use Illuminate\View\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use App\Models\Service;
use App\Models\User;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {

        Facades\View::composer(
            ['schedule.create', 'schedule.edit','schedule.show'],
            function (View $view){
                $services = Service::where('company_id',Auth::user()->company_id)->get();
                $view->with('services',$services);
            }
        );
    }
}
