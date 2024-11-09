<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'old_password' => 'required',
            'password' => 'required',
            'password2' => 'required|same:password'
        ];
    }

    public function  messages()
    {
        return [
            'old_password.required' => 'The Old Password field is required.',
            'password.required' => 'The Password field is required.',
            'password2.required' => 'The Re-enter password field is required.',

        ];
    }
}
