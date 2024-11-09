<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\CompanySettings\CompanyTag;
use App\Models\Role;
use App\Models\User;

class CompanyTagPolicy
{


    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
        return $user->isRole([Role::ADMIN]);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, CompanyTag $companyTag): bool
    {
        return $user->isRole([Role::ADMIN]) && $user->company_id == $companyTag->company_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, CompanyTag $companyTag): bool
    {
        return $user->isRole([Role::ADMIN]) && $user->company_id == $companyTag->company_id;
    }

}
