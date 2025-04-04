<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $employees = $request->user()->company->techs;
        $employees->load('roles');
        $employees->map(function ($employee) {
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
            'pass2' => 'required',
            'color' => 'required',
        ], [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'phone.required' => 'Phone is required',
            'rolesArray.required' => 'Roles are required',
            'pass1.required' => 'Password is required',
            'pass2.required' => 'Password confirmation is required',
            'color.required' => 'Color is required',
        ]);

        if ($request->pass1 !== $request->pass2) {
            return response()->json(['error' => 'Passwords do not match'], 400);
        }

        $company = $request->user()->company;

        $employee = $company->techs()->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => password_hash($request->pass1, PASSWORD_BCRYPT),
            'phone' => $request->phone,
            'company_id' => Auth::user()->company_id,
            'color' => $request->color,
        ]);

        // Add roles to user if not selected
        foreach ($request->rolesArray as $role) {
            if (in_array($role, Role::ROLES_ID)) {
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

        if (!$employee)
            return response()->json(['error' => 'Employee not found'], 404);

        $this->authorize('update-users', $employee);

        DB::beginTransaction();

        try {

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

            if (Auth::user()->id == $employee->id) {
                if (Auth::user()->isRole([Role::ADMIN]) && !in_array(Role::ADMIN, $request->rolesArray)) {
                    Role::create([
                        'user_id' => $employee->id,
                        'role' => Role::ADMIN,
                    ]);
                }
            }

            // Add roles to user if not selected
            foreach ($request->rolesArray as $role) {
                if (in_array($role, Role::ROLES_ID)) {
                    Role::create([
                        'user_id' => $employee->id,
                        'role' => $role,
                    ]);
                }
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }

        $employee->rolesArray = $employee->roles->pluck('role');

        return response()->json(['employee' => $employee], 200);
    }
}
