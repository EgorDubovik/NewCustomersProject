<?php

namespace App\Http\Controllers\Api\Job;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job\Job;
use App\Models\Job\Notes;

class JobNotesController extends Controller
{
   public function store(Request $request, $jobId)
   {
      $job = Job::find($jobId);
      if (!$job) return response()->json(['error' => 'Job not found'], 404);
      $this->authorize('store-job-note', $job);
      $note = Notes::create([
         'job_id' => $job->id,
         'creator_id'    => $request->user()->id,
         'text'          => $request->text,
      ]);
      $note->load('creator');
      return response()->json(['message' => 'Note added to job', 'note' => $note], 200);
   }

   public function delete(Request $request, $noteId)
   {
      $note = Notes::find($noteId);
      if (!$note)
         return response()->json(['error' => 'Note not found'], 404);
      $this->authorize('delete-job-note', $note);
      $note->delete();
      return response()->json(['message' => 'Note removed from appointment'], 200);
   }
}
