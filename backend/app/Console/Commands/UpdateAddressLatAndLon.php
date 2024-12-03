<?php

namespace App\Console\Commands;

use App\Models\Addresses;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class UpdateAddressLatAndLon extends Command
{
   /**
    * The name and signature of the console command.
    *
    * @var string
    */
   protected $signature = 'address:update';

   /**
    * The console command description.
    *
    * @var string
    */
   protected $description = 'Update address lat and lon';

   /**
    * Execute the console command.
    */
   public function handle()
   {
      $this->info('Update address lat and lon');
      $this->info('Start');

      $apiKey = env('GOOGLE_MAPS_API_KEY');
      if (!$apiKey) {
         $this->error('GOOGLE_MAPS_API_KEY is not set in .env file');
         return;
      }

      $addresses = Addresses::whereNull('lat')->orWhereNull('lon')->get();
      $all = count($addresses);
      $i = 0;
      foreach ($addresses as $address) {
         $i++;
         $this->info('(' . $i . ' of ' . $all . ') | Processing address: ' . $address->full);
         $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
            'address' => $address->full,
            'key' => $apiKey,
         ]);
         if ($response->ok() && isset($response['results'][0]['geometry']['location'])) {
            $location = $response['results'][0]['geometry']['location'];
            $address->update([
               'lat' => $location['lat'],
               'lon' => $location['lng'],
            ]);

            $this->info('Updated address: ' . $address->full);
         } else
            $this->error('Failed to update address: ' . $address->full);
      }

      $this->info('Address lat and lon updated successfully');

   }
}
