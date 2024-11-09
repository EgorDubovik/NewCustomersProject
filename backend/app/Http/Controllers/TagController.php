<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\CustomerTags;
use App\Models\Tag;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TagController extends Controller
{
    public function store(Request $request){

        $tag = Tag::updateOrCreate([
           'title' => $request->title,
           'company_id' => Auth::user()->company_id,
        ]);

        if ($request->has('customer_id')){
            if (Gate::allows('assign-tag',[$request->customer_id,$request->tag_id])) {
                CustomerTags::updateOrCreate([
                    'customer_id' => $request->customer_id,
                    'tag_id' => $tag->id,
                ]);
            }
        }

        return redirect()->back();
    }

    public function assign_tag(Customer $customer, Request $request){
        if (Gate::allows('assign-tag',[$customer->id,$request->tag_id])) {
            CustomerTags::updateOrCreate([
                'customer_id' => $customer->id,
                'tag_id' => $request->tag_id,
            ]);
            return redirect()->back();
        } else {
            abort(403);
        }
    }

    public function untie_tag(Request $request, Customer $customer,Tag $tag){
        Gate::authorize('untie-tag',[$customer->id, $tag->id]);
        CustomerTags::where('customer_id',$customer->id)->
            where('tag_id',$tag->id)->
            delete();
        return back();

    }

    public function delete(Tag $tag){
        Gate::authorize('delete-tag',$tag);
        $tag->delete();
        return back();
    }
}
