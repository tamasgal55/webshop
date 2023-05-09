<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Address;
use App\Models\Image;
use App\Models\User;
use App\Models\Category;


class CompanyController extends Controller
{
    public function show(string $id)
    {
        return response()->json(['data' => Company::findOrFail($id)]);
    }

    public function index()
    {
        $companies_with_data = array();
        $all_companies = Company::all();
        foreach($all_companies as $company) 
        {
            array_push($companies_with_data, [
                'id' => $company->id,
                'name' => $company->name,
                'contact_email' => $company->contact_email,
                'contact_phone' => $company->contact_phone,
                'created_at' => $company->created_at,
                'updated_at' => $company->updated_at,
                'image' => $company->image->image,
                'headquaters_country' => $company->address->country,
                'headquaters_postal_code' => $company->address->postal_code,
                'headquaters_city' => $company->address->city,
                'headquaters_address_line_one' => $company->address->address_line_one,
                'headquaters_address_line_two' => $company->address->address_line_two,

            ]);
        }
        return response()->json($companies_with_data);
    }

    public function store(Request $request)
    {
        $address = Address::create([
            'country' => $request->headquaters_country,
            'postal_code' => $request->headquaters_postal_code,
            'city' => $request->headquaters_city,
            'address_line_one' => $request->headquaters_address_line_one,
            'address_line_two' => $request->headquaters_address_line_two
        ]);

        $image = Image::create([
            'image' => $request->image
        ]);

        $company = Company::create([
            'name' => $request->name,
            'contact_phone' => $request->contact_phone,
            'contact_email' => $request->contact_email,
            'address_id' => $address->id,
            'image_id' => $image->id
        ]);

        $user = User::find(auth()->user()->id);
        $user->update([
            'company_id' => $company->id
        ]);

        return response()->json([
            'data' => $company,
            'message' => 'Company created'
        ]);
    }

    public function saveCategories(Request $request) {
        $company = User::find(auth()->user()->id)->company;

        $company->categories()->detach();
        $company->categories()->attach($request->categories);

        return response()->json([
            'data' => $company,
            'message' => 'Categories saved'
        ]);
    }

    public function getCategories()
    {
        return response()->json([
            'data' => User::find(auth()->user()->id)->company->categories
        ]);
    }
}
