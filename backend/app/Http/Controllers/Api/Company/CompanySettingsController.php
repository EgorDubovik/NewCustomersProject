<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use App\Models\Addresses;
use Illuminate\Http\Request;
use App\Models\CompanySettings\GeneralInfoSettings;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class CompanySettingsController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('change-company-settings');
        $companySettings = GeneralInfoSettings::getSettingsForCompany($request->user()->company_id);
        $company = $request->user()->company->load('address');

        return response()->json(['companySettings' => $companySettings, 'company' => $company], 200);
    }

    public function update(Request $request)
    {
        $this->authorize('change-company-settings');

        foreach ($request->all() as $key => $value) {
            if (array_key_exists($key, GeneralInfoSettings::$DEFAULT_SETTINGS)) {
                GeneralInfoSettings::setSetting($request->user()->company_id, $key, $value);
            }
        }

        return response()->json(['message' => 'Save success'], 200);
    }


    public function uploadLogo(Request $request)
    {
        $company = Auth::user()->company;
        Gate::authorize('edit-company', ['company' => $company]);

        $request->validate([
            'logo' => 'required|file|mimetypes:image/jpeg,image/png,image/jpg|max:2048',
        ]);

        $file = $request->file('logo');
        $extension = strtolower($file->getClientOriginalExtension());

        $filePath = 'logos/' . time() . '_' . $file->hashName();

        $manager = new ImageManager(new Driver());
        $image = $manager->read($file);
        $image->scaleDown(width: env('UPLOAD_WIDTH_SIZE'));

        if ($extension !== 'png') {
            // Convert to JPEG if not PNG
            $image = $image->toJpeg();
            $filePath = preg_replace('/\.[^.]+$/', '.jpg', $filePath);
        } else {
            // Keep as PNG
            $image = $image->toPng();
        }

        $path = Storage::disk('s3')->put($filePath, $image);
        if (!$path) {
            return response()->json(['message' => 'Error uploading image'], 500);
        }

        if ($company->logo) {
            $path = parse_url($company->logo, PHP_URL_PATH);
            $relativePath = ltrim($path, '/'); // Remove leading slash if present
            Storage::disk('s3')->delete($relativePath); // Remove old logo
        }

        $company->logo = env('AWS_FILE_ACCESS_URL') . $filePath;
        $company->save();

        return response()->json(['message' => 'Logo updated', 'newPath' => env('AWS_FILE_ACCESS_URL') . $filePath], 200);
    }

    public function updateCompanyInfo(Request $request)
    {
        $company = Auth::user()->company;
        Gate::authorize('edit-company', ['company' => $company]);


        $company->name = $request->name ?? '';
        $company->phone = $request->phone ?? '';
        $company->email = $request->email ?? '';
        if ($company->address) {
            $company->address->line1 = $request->address['line1'] ?? '';
            $company->address->line2 = $request->address['line2'] ?? '';
            $company->address->city = $request->address['city'] ?? '';
            $company->address->state = $request->address['state'] ?? '';
            $company->address->zip = $request->address['zip'] ?? '';
            $company->address->save();
        } else {
            $newAddress = Addresses::create([
                'line1' => $request->address['line1'] ?? '',
                'line2' => $request->address['line2'] ?? '',
                'city' => $request->address['city'] ?? '',
                'state' => $request->address['state'] ?? '',
                'zip' => $request->address['zip'] ?? '',
            ]);
            $company->address_id = $newAddress->id;
        }
        $company->save();
        return response()->json(['message' => 'Company info updated', 'return' => $request->address], 200);
    }


}
