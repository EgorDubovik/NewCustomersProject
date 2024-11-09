<?php

namespace App\Models\CompanySettings;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Company;

class GeneralInfoSettings extends Model
{
    use HasFactory;

    protected $table = 'company_settings';

    public static $DEFAULT_SETTINGS = [
        'taxRate' => 0,
    ];

    protected $fillable = [
        'company_id',
        'setting_key',
        'setting_value',
    ];

    /**
     * Relationship to the Company model.
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the settings for a company as a key-value pair.
     */
    public static function getSettingsForCompany($companyId)
    {
        $settings = self::where('company_id', $companyId)
            ->pluck('setting_value', 'setting_key')
            ->toArray();

        return array_merge(self::$DEFAULT_SETTINGS, $settings);
    }

    /**
     * Save or update a setting for the company.
     */
    public static function setSetting($companyId, $key, $value)
    {
        return self::updateOrCreate(
            ['company_id' => $companyId, 'setting_key' => $key],
            ['setting_value' => $value]
        );
    }

    /**
     * Delete a setting for a company.
     */
    public static function deleteSetting($companyId, $key)
    {
        return self::where('company_id', $companyId)
            ->where('setting_key', $key)
            ->delete();
    }

    public static function getSettingByKey($companyId, $key)
    {
        $settings = self::where('company_id', $companyId)
            ->where('setting_key', $key)
            ->value('setting_value');
        return $settings ?? self::$DEFAULT_SETTINGS[$key];
    }
}
