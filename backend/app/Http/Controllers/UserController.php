<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\User;
use App\Models\Language;
use App\Models\Address;
use App\Models\Image;
use App\Models\Product;

class UserController extends Controller
{
    public function getLanguage(string $id)
    {
        return response()->json(User::findOrFail($id)->language);
    }

    public function updateLanguage(Request $request)
    {
        $request->validate([
            'langCode' => ['required', Rule::exists('languages', 'code'), 'max:2']
        ]);

        $language = Language::where('code', $request->langCode)->first();
        $user = User::find(auth()->user()->id);
        $user->update([
            'language_id' => $language->id
        ]);

        return response()->json([
            'data' => $user
        ]);
    }

    public function updateUserProfile(Request $request) 
    {
        $request->validate([
            
        ]);

        $user = User::find(auth()->user()->id);
        $address = Address::where('id', $user->address_id)->first();
        $user->update([
            'name' => $request->userProfile['name'],
            'phone' => $request->userProfile['phone']
        ]);

        $address->update([
            'country' => $request->userProfile['country'],
            'postal_code' => $request->userProfile['postal_code'],
            'city' => $request->userProfile['city'],
            'address_line_one' => $request->userProfile['address_line_one'],
            'address_line_two' => $request->userProfile['address_line_two']
        ]);

        return response()->json([
            'data' => $request->userProfile
        ]);
    }

    public function getUserProfile() 
    {
        $user = User::find(auth()->user()->id);

        $userProfile = [
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'country' => $user->address->country,
            'postal_code' => $user->address->postal_code,
            'city' => $user->address->city,
            'address_line_one' => $user->address->address_line_one,
            'address_line_two' => $user->address->address_line_two
        ];

        return response()->json([
            'data' => $userProfile
        ]);
    }

    public function relationshipTestEndpoint()
    {
        return response()->json([
            //['user-lang:' => User::findOrFail(1)->language],
            //['lang-user:' => Language::findOrFail(2)->users],
            //['user-address:' => User::findOrFail(1)->address],
            //['address-user:' => Address::findOrFail(1)->users],
            //['user-product:' => User::findOrFail(1)->products],
            //['product-user:' => Product::findOrFail(1)->user],
            //['product-image:' => Product::findOrFail(1)->images]
            //['image-product:' => Image::findOrFail(1)->product]
        ]);
    }
}
