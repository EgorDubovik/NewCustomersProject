<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\Company;
use App\Models\CompanySettings;
use App\Models\Role;
use App\Models\Settings;
use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{

    public function create(Request $request){
        return view("auth.register");
    }

    public function store(RegisterRequest $request){

        // Create company
        $company = Company::create([
            'name' => $request->company_name,
        ]);

        // Create first user for company
        $user = User::create([
            'name' => $request->user_name,
            'company_id' => $company->id,
            'email' => $request->email,
            'password' => password_hash($request->password, PASSWORD_BCRYPT),
        ]);

        Settings::create([
            'company_id' => $company->id,
        ]);
        
        // CompanySettings::create([
        //     'company_id' => $company->id,
        // ]);
        
        // Add admin role for first user
        Role::create([
           'user_id' => $user->id,
           'role' => Role::ADMIN,
        ]);

        return view('auth.register-done');
    }
}
