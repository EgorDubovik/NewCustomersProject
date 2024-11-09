<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $employees = $request->user()->company->techs;
        $employees->load('roles');
        $employees->map(function($employee){
            $employee->rolesArray = $employee->roles->pluck('role');
            return $employee;
        });
        return response()->json(['employees' => $employees], 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create-users');

        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'rolesArray' => 'required',
            'pass1' => 'required',
            'color' => 'required',
        ]);

        $company = $request->user()->company;

        $employee = $company->techs()->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => password_hash($request->password, PASSWORD_BCRYPT),
            'phone' => $request->phone,
            'company_id' => Auth::user()->company_id,
            'color' => $request->color,
        ]);

        // Add roles to user if not selected
        foreach ($request->rolesArray as $role){
            if(in_array($role, Role::ROLES_ID)){
                Role::create([
                    'user_id' => $employee->id,
                    'role' => $role,
                ]);
            }
        }

        $employee->rolesArray = $employee->roles->pluck('role');

        return response()->json(['employee' => $employee], 200);
    }

    public function update(Request $request, $id)
    {
        $employee = $request->user()->company->techs()->find($id);

        if(!$employee)
            return response()->json(['error' => 'Employee not found'], 404);

        $this->authorize('update-users', $employee);

        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'rolesArray' => 'required',
            'color' => 'required',
        ]);

        $employee->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'color' => $request->color,
            'password' => $request->pass1 ? password_hash($request->pass1, PASSWORD_BCRYPT) : $employee->password,
        ]);

        $employee->roles()->delete();

        // Add roles to user if not selected
        foreach ($request->rolesArray as $role){
            if(in_array($role, Role::ROLES_ID)){
                Role::create([
                    'user_id' => $employee->id,
                    'role' => $role,
                ]);
            }
        }

        $employee->rolesArray = $employee->roles->pluck('role');

        return response()->json(['employee' => $employee], 200);
    }
}
