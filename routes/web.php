<?php

use App\Http\Controllers\SpaController;
use App\Http\Controllers\UpsellRockController;
use App\Jobs\AfterAuthenticateJob;
use App\Models\Currency;
use App\Models\ShopifyCurrency;
use App\Models\UpsellRockSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Osiset\ShopifyApp\Services\ChargeHelper;
use App\Models\User;

// App routes
Route::get('/', function () {
    $user = Auth::user();
    AfterAuthenticateJob::dispatch($user);
    return view('spa');
})->middleware(['verify.shopify'])->name('home');

Route::get('/spa/user', [SpaController::class, "user"])->middleware(['verify.shopify']);
Route::get('/spa/shop', [SpaController::class, "shop"])->middleware(['verify.shopify']);
Route::get('/spa/currencies', [SpaController::class, "currencies"])->middleware(['verify.shopify']);
Route::get('/spa/upsells', [SpaController::class, "upsells"])->middleware(['verify.shopify']);
Route::get('/spa/products', [SpaController::class, "products"])->middleware(['verify.shopify']);
Route::get('/spa/local_products', [SpaController::class, "local_products"])->middleware(['verify.shopify']);
Route::get('/spa/product/{shopify_id}', [SpaController::class, "product"])->middleware(['verify.shopify']);
Route::get('/spa/custom_collections', [SpaController::class, "custom_collections"])->middleware(['verify.shopify']);
Route::get('/spa/smart_collections', [SpaController::class, "smart_collections"])->middleware(['verify.shopify']);
Route::get('/spa/local_collections', [SpaController::class, "local_collections"])->middleware(['verify.shopify']);
Route::get('/spa/update_smart_collection', [SpaController::class, "update_smart_collection"])->middleware(['verify.shopify']);
Route::get('/spa/smart_auto_upsell', [SpaController::class, "smart_auto_upsell"])->middleware(['verify.shopify']);
Route::get('/spa/create_upsell', [SpaController::class, "create_upsell"])->middleware(['verify.shopify']);
Route::put('/spa/disable_upsell', [SpaController::class, "disable_upsell"])->middleware(['verify.shopify']);
Route::put('/spa/enable_upsell', [SpaController::class, "enable_upsell"])->middleware(['verify.shopify']);
Route::get('/spa/upsell/{id}', [SpaController::class, "upsell"])->middleware(['verify.shopify']);
Route::put('/spa/upsell/{id}', [SpaController::class, "updateUpsell"])->middleware(['verify.shopify']);

Route::get('/spa/setting', [SpaController::class, "setting"])->middleware(['verify.shopify']);
Route::put('/spa/setting', [SpaController::class, "updateSetting"])->middleware(['verify.shopify']);


Route::get('/spa/views', [SpaController::class, "views"])->middleware(['verify.shopify']);
Route::get('/spa/sessions', [SpaController::class, "sessions"])->middleware(['verify.shopify']);
Route::get('/spa/statistics', [SpaController::class, "statistics"])->middleware(['verify.shopify']);
Route::get('/spa/upsell_with_tracks', [SpaController::class, "upsellWithTracks"])->middleware(['verify.shopify']);


// storefront routes
Route::get('/script/{name}', function (Request $request, $name) {
    $shop = $request->shop;
    $user = User::where('name', $shop)->first();

    if (!$user) {
        return '';
    }
    $script = file_get_contents(env('APP_URL') . "/js/" . $name);

    $upsellRockBaseUrl = env('APP_URL');

    $setting = UpsellRockSetting::where('user_id', $user->id)->first();

    $currencies = Currency::all();

    $shopifyCurrency = ShopifyCurrency::latest()->first()->body;

    $shopCurrency = $user->currency;

    $shopId = $user->shop_id;

    return $shopifyCurrency . "\r\nvar currencies=" . $currencies . ";\r\n" .
        "var shopCurrency='" . $shopCurrency . "';\r\n" .
        "var shopId='" . $shopId . "';\r\n" .
        "var upsellRockSetting=" . $setting . ";\r\n" . "var upsellRockShopDomain='" . $shop . "';\r\n" .
        "var upsellRockBaseUrl='" . $upsellRockBaseUrl . "';\r\n" . $script;
});

Route::get('/upsells', [UpsellRockController::class, 'upsells']);
Route::post('/track', [UpsellRockController::class, 'track']);
