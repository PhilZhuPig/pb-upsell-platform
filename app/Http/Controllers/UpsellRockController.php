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
        $ids = UpsellRockDisplayCondition::select('upsell_rock_id')->where('user_id', $user->id)->where('product_id', $product_id)
            ->where('product_variant_id', $variant_id)->orWhere('type', 'all-products')
            ->get()->pluck('upsell_rock_id')->toArray();
        return UpsellRockResouce::collection(UpsellRock::find($ids));
    }

    public function track(Request $request)
    {
        $shop = $request->shop;
        $cart_token = $request->cart_token;
        $event_type = $request->event_type;
        $upsell_rocks = $request->upsell_rocks;
        $data = $request->data;
        $user = User::where('name', $shop)->first();
        $track = UpsellRockTrack::create([
            'user_id' => $user->id,
            'cart_token' => $cart_token,
            'event_type' => $event_type,
            'upsell_rocks' => json_encode($upsell_rocks),
            'data' => json_encode($data)
        ]);
        return $track;
    }
}
