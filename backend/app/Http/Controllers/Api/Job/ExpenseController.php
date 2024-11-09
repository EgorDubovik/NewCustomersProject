<?php

namespace App\Http\Controllers\Api\Job;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Job\Expense;
use App\Models\Job\Job;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function store(Request $request, $job_id){
        
        $job = Job::find($job_id);
        if(!$job)
            return response()->json(['error' => 'Job not found'],404);

        $this->authorize('update-remove-job-expense',$job);
        
        $request->validate([
            'title' => 'required',
            'amount' => 'required',
        ]);

        $expanse = Expense::create([
            'title' => $request->title,
            'amount' => $request->amount,
            'user_id' => auth()->id(),
            'job_id' => $job->id,
            'company_id' => auth()->user()->company_id,
        ]);

        return response()->json(['expanse' => $expanse],200);

    }

    public function delete(Request $request, $expense_id){
        
        $expanse = Expense::find($expense_id);
        if(!$expanse)
            return response()->json(['error' => 'Expanse not found'],404);

        $job = Job::find($expanse->job_id);
        $this->authorize('update-remove-job-expense',$job);

        $expanse->delete();

        return response()->json(['message' => 'Expanse deleted'],200);
    }
}
