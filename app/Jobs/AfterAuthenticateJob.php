<?php

namespace App\Jobs;

use App\Models\UpsellRockSetting;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AfterAuthenticateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $shop;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $shop)
    {
        $this->shop = $shop;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        info('鉴权成功：' . $this->shop->name);
        // create settings
        $setting = UpsellRockSetting::where('user_id', $this->shop->id)->first();
        if (!$setting) {
            UpsellRockSetting::create([
                'user_id' => $this->shop->id,
                'title' => 'Get extras for your product',
                'add_to_cart' => 'Add',
                'added_to_cart' => 'Added',
                'upgrade' => "Upgrade",
                "upgraded" => "Upgraded",
                "proceed_to_cart" => "Continue",
                "back" => "Back",
                "cart_discount_note" => "",
                "primary_color" => "#333333",
                "continue_action" => "",
                "close_action" => "",
                'max_popup_session_views' => 0
            ]);
        }
        FetchProductFromShopify::dispatch($this->shop);
        FetchOrderFromShopify::dispatch($this->shop);
        FetchCheckoutFromShopify::dispatch($this->shop);
    }
}
