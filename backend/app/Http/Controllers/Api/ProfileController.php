<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanySettings\GeneralInfoSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\CompanySettings\CompanyTag;
use App\Models\UserSettings;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        $user->roles_ids = $user->roles->pluck('role');

        $companySettings = GeneralInfoSettings::getSettingsForCompany($user->company_id);
        // get company tags
        $companySettings['companyTags'] = CompanyTag::where('company_id', $user->company_id)->get();
        // get sotreage items count if acrual less then expected
        $sideBarNotifications = [
            'storage' => StorageItemsController::getCountOfExpectedStorageItems($user->id),
            'schedule' => 0 //count(AppointmentController::getActiveAppointments($user->id)),
        ];
        $user['settings'] = UserSettings::getAllSettingsForUser($user->id);

        // get app version to compare on frontend
        $app_version = config('version.app_version');

        return response()->json([
            'user' => $user,
            'companySettings' => $companySettings,
            'sideBarNotifications' => $sideBarNotifications,
            'app_version' => $app_version,
        ], 200);
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'oldPassword' => 'required',
            'newPassword' => 'required',
        ]);

        if (!Hash::check($request->oldPassword, $user->password)) {
            return response()->json(['message' => 'Old password is incorrect'], 400);
        }

        if ($request->newPassword != $request->confirmPassword) {
            return response()->json(['message' => 'New password and confirm password do not match'], 400);
        }
        $user->password = Hash::make($request->newPassword);
        $user->save();
        return response()->json(['message' => 'Password updated successfully'], 200);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $request->validate(
            [
                'name' => 'required',
                'email' => 'required|email',
                'phone' => 'required',
            ],
            [
                'name.required' => 'User Name is required',
                'email.required' => 'User Email is required',
                'email.email' => 'User Email is invalid',
                'phone.required' => 'User Phone number is required',
            ]
        );

        if ($user->email != $request->email) {
            $request->validate([
                'email' => 'unique:users',
            ], [
                'email.unique' => 'Email already exists. Please use another email',
            ]);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->save();
        return response()->json(['message' => 'Profile updated successfully'], 200);
    }
}
