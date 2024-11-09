<?php

namespace App\Policies;

use App\Models\Job\Job;
use Illuminate\Auth\Access\Response;
use App\Models\Job\Service;
use App\Models\User;

class JobServicePolicy
{


    /**
     * Determine whether the user can create models.
     */
    public function store(User $user, Job $job): bool
    {
        return $user->company_id === $job->company_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Service $service): bool
    {
        return $user->company_id === $service->job->company_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Service $service): bool
    {
        return $user->company_id === $service->job->company_id;
    }
}
