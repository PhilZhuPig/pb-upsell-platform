<?php

namespace App\Http\Controllers;

use App\Models\UpsellRock;
use App\Models\UpsellRockDisplayCondition;
use App\Models\User;
use App\Http\Resources\UpsellRockResouce;
use App\Models\UpsellRockTrack;
use App\Models\UpsellRockVariant;
use Illuminate\Http\Request;

class UpsellRockController extends Controller
{
    public function upsells(Request $request)
    {
        $shop = $request->shop;
        $product_id = $request->product;
        $variant_id = $request->variant;
        if (empty($shop) || empty($product_id) || empty($variant_id)) return [];
        $user = User::where('name', $shop)->first();
        if (!$user) return [];
        $variant = UpsellRockVariant::where('variant_id', $variant_id)->first();
        if (!$variant) return [];
        $price = $variant->price;
        info('variant price=' . $price);
        $ids = UpsellRockDisplayCondition::select('upsell_rock_id')
            ->where('user_id', $user->id)
            ->where(function ($query) use ($product_id, $variant_id) {
                return $query->where('product_id', $product_id)
                    ->where('product_variant_id', $variant_id)
                    ->orWhere('type', 'all-products');
            })->get()->pluck('upsell_rock_id')->toArray();
        info('ids=' . implode(',', $ids));
        // ids 去重
        $ids = array_flip($ids);
        $ids = array_flip($ids);
        $ids = array_values($ids);
        $upsells = UpsellRock::find($ids);
        $filtered_ids = [];
        foreach ($upsells as $upsell) {
            $mini_hit = false;
            $max_hit = false;
            if ($upsell->price_type == 'range') {
                if (empty($upsell->minimum_price) || intval($upsell->minimum_price * 100) <= $price) {
                    $mini_hit = true;
                }
                if (empty($upsell->maximum_price) || intval($upsell->maximum_price * 100) >= $price) {
                    $max_hit = true;
                }
            } else {
                array_push($filtered_ids, $upsell->id);
            }
            if ($mini_hit && $max_hit) {
                array_push($filtered_ids, $upsell->id);
            }
        }
        return UpsellRockResouce::collection(UpsellRock::orderBy('order')->find($filtered_ids));
    }

    public function track(Request $request)
    {
        $shop = $request->shop;
        $cart_token = $request->cart_token;
        $event_type = $request->event_type;
        $upsell_rocks = $request->upsell_rocks;
        $data = $request->data;
        $stats_at = $request->stats_at;
        $user = User::where('name', $shop)->first();
        $track = UpsellRockTrack::create([
            'user_id' => $user->id,
            'cart_token' => $cart_token,
            'event_type' => $event_type,
            'ip' => $request->ip(),
            'upsell_rocks' => json_encode($upsell_rocks),
            'data' => json_encode($data),
            'stats_at' => $stats_at,
        ]);
        return $track;
    }
}
