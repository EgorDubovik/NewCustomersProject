<?php

namespace App\Http\Controllers\Landing;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class LandingController extends Controller
{
   public function store(Request $request)
   {
      DB::connection('mysql_landing')->table('stats')->insert([
         'action' => $request->action ?? "none",
         'ip' => $request->ip() ?? "none",
         'referer' => $request->referer ?? $request->headers->get('referer') ?? "unknow",
         'user_agent' => $request->header('User-Agent'),
         'created_at' => \Carbon\Carbon::parse($request->timestamp ?? now()),

      ]);

      return response()->json(['success' => 'Landing page stored']);
   }
}

