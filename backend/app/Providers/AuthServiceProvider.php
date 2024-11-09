<?php

namespace App\Providers;

use App\Models\Addresses;
use App\Models\Company;
use App\Models\Customer;
use App\Models\Image;
use App\Models\Service;
use App\Models\Tag;
use App\Models\Role;
use App\Models\User;
use App\Models\Invoice;
use App\Models\Appointment;
use App\Models\CompanySettings\CompanyTag;
use App\Models\Job\Job;
use App\Models\Job\Notes;
use App\Models\Job\Service as JobService;
use App\Models\Payment;
use App\Models\StorageItems;
use App\Policies\JobServicePolicy;
use App\Policies\CompanyTagPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        JobService::class => JobServicePolicy::class,
        CompanyTag::class => CompanyTagPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // users
        Gate::define('view-users-list',function (User $user){
            return in_array(Role::ADMIN,Auth::user()->roles->pluck('role')->toArray()); // Only admin can view users list
        });

        Gate::define('update-users', function (User $user, User $upuser){
            return (in_array(Role::ADMIN,Auth::user()->roles->pluck('role')->toArray()) && Auth::user()->company_id == $upuser->company_id );
        });

        Gate::define('create-users',function (User $user){
            return in_array(Role::ADMIN,Auth::user()->roles->pluck('role')->toArray()); // Only admin can view users list
        });

        // Tag
        Gate::define('assign-tag',function (User $user,$customer_id, $tag_id){
            $customer = Customer::where('id',$customer_id)
                ->where('company_id',$user->company_id)->first();
            $tag = Tag::where('id',$tag_id)
                ->where('company_id',$user->company_id)->first();
            if ($customer && $tag)
                return true;
            return false;
        });

        Gate::define('untie-tag', function (User $user, $customer_id, $tag_id){
            $customer = Customer::where('id',$customer_id)
                ->where('company_id',$user->company_id)->first();
            $tag = Tag::where('id',$tag_id)
                ->where('company_id',$user->company_id)->first();
            if ($customer && $tag)
                return true;
            return false;
        });

        Gate::define('delete-tag',function (User $user, Tag $tag){
            if ($tag->company_id == $user->company_id)
                return true;
            return false;
        });

        // Customers

        Gate::define('view-customer', function(User $user, Customer $customer){
            return $user->company_id === $customer->company_id;
        });

        Gate::define('update-customer', function (User $user, Customer $customer){
           if ($user->company_id == $customer->company_id)
               return true;
           return false;
        });

        //Notes
        Gate::define('store-note',function (User $user,Customer $customer){
            if ($user->company_id == $customer->company_id)
                return true;
            return false;
        });

        // Appointment
        Gate::define('make-appointment', function(User $user, $customer_id, $address_id){
            $customer = Customer::find($customer_id);
            $address = Addresses::find($address_id);
            if($customer && $address)
                if($customer->company_id == $user->company_id && $address->customer_id == $customer->id)
                    return true;
            return false;
        });

        Gate::define('view-appointment', function(User $user, Appointment $appointment){
            return $user->company_id === $appointment->company_id;
        });

        Gate::define('update-remove-appointment', function(User $user,Appointment $appointment){
            $roleArray = $user->roles->pluck('role')->toArray();
            if(
                (in_array(Role::ADMIN,$roleArray) 
                    || in_array(Role::DISP,$roleArray) 
                    || in_array($user->id,$appointment->appointmentTechs->pluck('tech_id')->toArray())
                ) 
                && $appointment->company_id == $user->company_id ){
                return true;
            }
            return false;
        });

        //Job Payments
        Gate::define('pay-job', function(User $user, Job $job){
            return $user->company_id === $job->company_id;
        });
        Gate::define('refund',function(User $user, Job $job){
            return $user->company_id === $job->company_id && $user->isRole([Role::ADMIN, Role::DISP]);
        });

        //Job notes
        Gate::define('store-job-note',function (User $user, Job $job){
            if ($user->company_id == $job->company_id)
                return true;
            return false;
        });

        Gate::define('delete-job-note',function (User $user, Notes $note){
            return $user->id === $note->creator_id || $user->isRole(Role::ADMIN);
        });

        //Job expenses
        Gate::define('update-remove-job-expense',function (User $user, Job $job){
            if ($user->company_id == $job->company_id)
                return true;
            return false;
        });

        // Appointment notes
        // Gate::define('appointment-store-note',function (User $user, Appointment $appointment){
        //     if ($user->company_id == $appointment->company_id)
        //         return true;
        //     return false;
        // });

        // Appointment srvices
        Gate::define('add-remove-service-from-appointment',function(User $user, Appointment $appointment){
            if ($user->company_id == $appointment->company_id)
                return true;
            return false;
        });

        // Appointment tech

        Gate::define('add-tech-to-appointment',function(User $user, Appointment $appointment, $tech_id){
            $roleArray = $user->roles->pluck('role')->toArray();
            if(
                (   
                    in_array(Role::ADMIN,$roleArray) ||
                    in_array(Role::DISP,$roleArray) 
                ) 
                && $appointment->company_id == $user->company_id ){

                $isTechFromMyCompany = User::where('company_id',$user->company_id)
                    ->where('id',$tech_id)
                    ->first();
                if($isTechFromMyCompany){
                    return true;
                }
            }
            return false;
        });

        //Services
        Gate::define('create-service', function (User $user){
            return in_array(Role::ADMIN,Auth::user()->roles->pluck('role')->toArray());
        });

        Gate::define('update-service', function (User $user, Service $service){
            return (in_array(Role::ADMIN,Auth::user()->roles->pluck('role')->toArray()) && Auth::user()->company_id == $service->company_id );
        });
        
        // Payments
        Gate::define('pay-service', function(User $user, Appointment $appointment){
            if ($user->company_id == $appointment->company_id)
                return true;
            return false;
        });

        Gate::define('payment-remove', function(User $user, Payment $payment){
            return ((in_array(Role::ADMIN,Auth::user()->roles->pluck('role')->toArray()) && Auth::user()->company_id == $payment->company_id) || Auth::user()->id == $payment->tech_id);
        });

        // Company
        Gate::define('edit-company',function (User $user, Company $company){
            return (in_array(Role::ADMIN,Auth::user()->roles->pluck('role')->toArray()) && Auth::user()->company_id == $company->id );
        });
        Gate::define('change-company-settings', function(User $user){
            return $user->isRole([Role::ADMIN]);
        });

        // Invoice
        Gate::define('can-view-invoice', function(User $user, Invoice $invoice){
            if(($invoice->creater_id == Auth::user()->id || in_array(Role::ADMIN,Auth::user()->roles->pluck('role')->toArray())) && $user->company_id == $invoice->company_id)
                return true;
            return false;
        });
        Gate::define('create-invoice', function(User $user, Appointment $appointment){
            return $user->company_id === $appointment->company_id;
        });
        
        Gate::define('can-send-by-customer', function(User $user, Customer $customer){
            return $user->company_id === $customer->company_id;
        });

        // Upload images
        Gate::define('upload-images', function (User $user, Customer $customer){
            if ($user->company_id == $customer->company_id)
                return true;
            return false;
        });
        Gate::define('delete-images', function (User $user, Image $image){
            if ($user->company_id == $image->owner->company_id)
                return true;
            return false;
        });
        Gate::define('show-images', function (User $user, Image $image){
            if ($user->company_id == $image->owner->company_id)
                return true;
            return false;
        });

        //Book online
        Gate::define('book-online', function(User $user){
            if(in_array(Role::ADMIN,Auth::user()->roles->pluck('role')->toArray())){
                return true;
            }
            return false;
        });

        // Storage 
        Gate::define('update-storage', function(User $user,StorageItems $storageItem){
            return $user->id === $storageItem->user_id;
        });
    }
}
