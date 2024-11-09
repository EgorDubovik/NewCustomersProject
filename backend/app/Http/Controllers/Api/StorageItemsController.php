<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StorageItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StorageItemsController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'title' => 'required',
            'quantity' => 'required',
            'expexted_quantity' => 'required'
        ]);


        $storageItem = StorageItems::updateOrCreate(
        [
            'title' => $request->title,
        ],
        [
            'title' => $request->title,
            'quantity' => $request->quantity,
            'expexted_quantity' => $request->expexted_quantity,
            'company_id' => Auth::user()->company_id,
            'user_id' => Auth::user()->id
        ]);

        return response()->json(['storageItem' => $storageItem], 200);
    }

    public function index(Request $request){
        $storageItems = StorageItems::where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json(['storageItems' => $storageItems,'user_id'=>Auth::user()->id], 200);
    }

    public function update(Request $request, $id){
        $request->validate([
            'title' => 'required',
            'quantity' => 'required',
            'expexted_quantity' => 'required'
        ]);

        $storageItem = StorageItems::find($id);
        if(!$storageItem)
            return response()->json(['error' => 'Storage item not found'], 404);

        $this->authorize('update-storage', $storageItem);

        $storageItem->title = $request->title;
        $storageItem->quantity = $request->quantity;
        $storageItem->expexted_quantity = $request->expexted_quantity;
        $storageItem->save();

        return response()->json(['storageItem' => $storageItem], 200);
    }

    public function destroy($id){
        $storageItem = StorageItems::find($id);
        if(!$storageItem)
            return response()->json(['error' => 'Storage item not found'], 404);

        $this->authorize('update-storage', $storageItem);

        $storageItem->delete();

        return response()->json(['message' => 'Storage item deleted'], 200);
    }
}
