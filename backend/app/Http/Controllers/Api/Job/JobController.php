<?php

namespace App\Http\Controllers\Api\Job;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job\Job;
class JobController extends Controller
{
    public function delete(Request $request, $id)
    {
        $job = Job::find($id);
        if (!$job)
            return response()->json(['error' => 'Job not found'], 404);

        $this->authorize('delete-job', $job);

        $job->services()->delete();
        $job->notes()->delete();
        $job->expenses()->delete();
        $job->images()->delete();

        $job->delete();

        return response()->json(['message' => 'Job deleted'], 200);
    }

    public function assignTags(Request $request, $job_id)
    {
        $job = Job::find($job_id);
        if (!$job)
            return response()->json(['error' => 'Job not found'], 404);

        $this->authorize('assign-tags', $job);

        $job->tags()->sync($request->tags);

        return response()->json(['message' => 'Tags assigned successfully'], 200);
    }
}
