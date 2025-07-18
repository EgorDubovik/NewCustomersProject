<?php
use App\Http\Controllers\Api\CallController;
use App\Http\Controllers\Api\CallWebhookController;
use App\Http\Controllers\Api\MapsController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\BookAppointmentOnlineController;
use App\Http\Controllers\Api\CustomersController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\Company\CompanyServicesController;
use App\Http\Controllers\Api\Company\CompanyTechController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Company\BookAppointmentController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\Job\JobNotesController;
use App\Http\Controllers\Api\Job\ExpenseController;
use App\Http\Controllers\Api\Job\JobImagesController;
use App\Http\Controllers\Api\Job\JobServicesController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ReviewFeedbackController;
use App\Http\Controllers\Api\StorageItemsController;
use App\Http\Controllers\Api\Company\CompanyTagController;
use App\Http\Controllers\Api\Company\CompanySettingsController;
use App\Http\Controllers\Api\Job\JobController;
use App\Http\Controllers\Landing\LandingController;
use App\Http\Controllers\EndPointsWebHookController;
use App\Http\Controllers\Api\Company\EndPointTokenController;
use App\Http\Controllers\Api\UserSettingsController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::prefix('v1')->group(function () {
   Route::get('/healthcheck', function () {
      return response()->json([
         'status' => 'success',
         'message' => 'Server is running'
      ]);
   });
   Route::post('/signin', [AuthController::class, 'login']);
   Route::post('/signup', [AuthController::class, 'register']);

   Route::group(['middleware' => ['auth:sanctum']], function () {

      // Profile
      Route::get('user', [ProfileController::class, 'show']);
      Route::put('user', [ProfileController::class, 'update']);
      Route::post('user/update-password', [ProfileController::class, 'updatePassword']);
      Route::post('user-settings', [UserSettingsController::class, 'update']);

      //Dashboard
      Route::get('dashboard', [DashboardController::class, 'dashboard']);

      // Customers
      Route::prefix('customers')->group(function () {
         Route::get("/", [CustomersController::class, 'index']);
         Route::get('/{id}', [CustomersController::class, 'show'])->where('id', '[0-9]+');
         Route::post("/", [CustomersController::class, 'store']);
         Route::put('/{id}', [CustomersController::class, 'update']);
         Route::put('/{customer_id}/address/{address_id}', [CustomersController::class, 'updateAddress']);
         Route::post('/{customer_id}/address', [CustomersController::class, 'storeAddress']);
         Route::delete('/{customer_id}/address/{address_id}', [CustomersController::class, 'deleteAddress']);
      });


      // Company settings
      Route::prefix('company/settings')->group(function () {
         Route::get('/', [CompanySettingsController::class, 'index']);
         Route::put('/', [CompanySettingsController::class, 'update']);
         Route::put('/update-info', [CompanySettingsController::class, 'updateCompanyInfo']);
         Route::post('/logo', [CompanySettingsController::class, 'uploadLogo']);

         //Services
         Route::prefix('services')->group(function () {
            Route::get('/', [CompanyServicesController::class, 'index']);
            Route::post('/', [CompanyServicesController::class, 'store']);
            Route::delete('/{id}', [CompanyServicesController::class, 'delete']);
            Route::put('/{id}', [CompanyServicesController::class, 'update']);
         });

         // Book Appointment online
         Route::prefix('book-appointment')->group(function () {
            Route::get('/', [BookAppointmentController::class, 'index']);
            Route::post('/working-time', [BookAppointmentController::class, 'workingTime']);
            Route::post('/update', [BookAppointmentController::class, 'update']);
            Route::post('/update-services', [BookAppointmentController::class, 'updateServices']);
            Route::post('/tags', [BookAppointmentController::class, 'updateTags']);
         });
         Route::prefix('tags')->group(function () {
            Route::get('/', [CompanyTagController::class, 'index']);
            Route::post('/', [CompanyTagController::class, 'store']);
            Route::delete('/{id}', [CompanyTagController::class, 'delete']);
            Route::put('/{id}', [CompanyTagController::class, 'update']);
         });

         // End points and access token
         Route::get('access-token', [EndPointTokenController::class, 'show']);
         Route::post('access-token', [EndPointTokenController::class, 'store']);
         Route::delete('access-token', [EndPointTokenController::class, 'delete']);

      });

      // Comopany Techs
      Route::prefix('company/techs')->group(function () {
         Route::get('/', [CompanyTechController::class, 'index']);
      });

      // Jobs
      Route::prefix('job')->group(function () {
         Route::delete('/{job_id}', [JobController::class, 'delete']);
         // Job notes
         Route::post('notes/{jobId}', [JobNotesController::class, 'store']);
         Route::delete('notes/{noteId}', [JobNotesController::class, 'delete']);
         // Job tags
         Route::post('tags/{job_id}', [JobController::class, 'assignTags']);
      });

      Route::prefix('appointment')->group(function () {

         // All appointments for calendar
         Route::get('/', [AppointmentController::class, 'index']);
         // get all Active appointments
         Route::get('/active', [AppointmentController::class, 'active']);
         // Base appointment API
         Route::get('/{id}', [AppointmentController::class, 'view']);
         Route::post('/', [AppointmentController::class, 'store']);
         Route::delete('/{id}', [AppointmentController::class, 'delete']);
         Route::put('/{id}', [AppointmentController::class, 'update']);

         // Update Appointment Status
         Route::put('/{id}/status', [AppointmentController::class, 'updateStatus']);
         //Appointment Techs
         Route::delete('tech/{appointment_id}/{tech_id}', [AppointmentController::class, 'removeTech']);
         Route::post('tech/{appointment_id}', [AppointmentController::class, 'addTech']);

         // job services
         Route::post('service/{job_id}', [JobServicesController::class, 'store']);
         Route::delete('service/{job_id}/{service_id}', [JobServicesController::class, 'destroy']);
         Route::put('service/{job_id}/{service_id}', [JobServicesController::class, 'update']);

         // job payments
         Route::post('payment/{job_id}', [PaymentController::class, 'store']);
         Route::post('payment/refund/{job_id}', [PaymentController::class, 'refund']);

         // Appointment invoice
         Route::get('invoice/{appointment_id}', [InvoiceController::class, 'create']);
         Route::post('{appointment_id}/invoice-send', [InvoiceController::class, 'send']);

         // Job images
         Route::post('images/{appointment_id}', [JobImagesController::class, 'store']);
         Route::get('images/{appointment_id}', [JobImagesController::class, 'index']);
         Route::delete('images/{appointment_id}/{image_id}', [JobImagesController::class, 'destroy']);

         // Job expances
         Route::post('expense/{job_id}', [ExpenseController::class, 'store']);
         Route::delete('expense/{expense_id}', [ExpenseController::class, 'delete']);

         Route::post('/copy/{appointment_id}', [AppointmentController::class, 'copy']);


      });

      // Invoices
      Route::prefix('invoice')->group(function () {
         Route::get('/', [InvoiceController::class, 'index']);
         Route::get('/{id}', [InvoiceController::class, 'show']);
         Route::get('/download/{appointment_id}', [InvoiceController::class, 'download']);
      });

      // Employees
      Route::prefix('employees')->group(function () {
         Route::get('/', [EmployeeController::class, 'index']);
         Route::post('/', [EmployeeController::class, 'store']);
         Route::put('/{id}', [EmployeeController::class, 'update']);
      });

      // Payments
      Route::prefix('payments')->group(function () {
         Route::get('/', [PaymentController::class, 'index']);
         Route::delete('/{id}', [PaymentController::class, 'delete']);
      });

      // Storage
      Route::prefix('storage')->group(function () {
         Route::get('/', [StorageItemsController::class, 'index']);
         Route::post('/', [StorageItemsController::class, 'store']);
         Route::put('/{id}', [StorageItemsController::class, 'update']);
         Route::delete('/{id}', [StorageItemsController::class, 'destroy']);
      });

      Route::prefix('maps')->group(function () {
         Route::get('/todays', [MapsController::class, 'todays']);
         Route::get('/all', [MapsController::class, 'all']);
      });


      Route::prefix('calls')->group(function () {
         Route::get('/', [CallController::class, 'index']);
         Route::get('/settings', [CallController::class, 'getCallSettings']);
         Route::post('/settings', [CallController::class, 'createCallWebhook']);
         Route::delete('/settings', [CallController::class, 'deleteCallWebhook']);
      });

   });

   Route::prefix('appointment/book')->group(function () {
      Route::get('/{key}', [BookAppointmentOnlineController::class, 'index']);
      Route::post('/{key}', [BookAppointmentOnlineController::class, 'store']);
      Route::get('/view/{providerkey}', [BookAppointmentOnlineController::class, 'view']);
      Route::get('/remove/{providerkey}', [BookAppointmentOnlineController::class, 'remove']);
   });

   Route::prefix('review-feedback')->group(function () {
      Route::get('/{key}', [ReviewFeedbackController::class, 'view']);
      Route::post('/{key}', [ReviewFeedbackController::class, 'store']);
   });

   // Landing page store stat
   Route::post('landing', [LandingController::class, 'store']);

   // End points for geting some information from AI
   Route::post('/get-appointment-info', [EndPointsWebHookController::class, 'getAppointmentInfo']);

   // Calls Webhooks
   Route::post('/calls/webhook/{key}', [CallWebhookController::class, 'store']);

});


