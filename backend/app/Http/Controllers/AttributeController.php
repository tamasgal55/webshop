<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attribute;
use App\Models\Category;

class AttributeController extends Controller
{
    public function index()
    {
        return response()->json(["data" => Attribute::all()]);
    }

    public function store(Request $request) 
    {
        $attribute = Attribute::create([
            'name_hu' => $request->name_hu,
            'name_en' => $request->name_en,
            'type' => $request->type,
            'unit' => $request->unit
        ]);

        return response()->json([
            'data' => $attribute,
            'message' => 'Attribute added'
        ]);
    }

    public function destroy(string $id)
    {
        $attribute = Attribute::findOrFail($id);
        foreach($attribute->categories as $category)
        {
            Category::where('name_hu', $category->name_hu)->first()->attributes()->detach($attribute);
        }

        Attribute::destroy($id);
        return response()->json([
            'message' => 'Attribute deleted'
        ]);
    }

    public function update(string $id, Request $request)
    {
        $attribute = Attribute::findOrFail($id);
        $attribute->update([
            'name_hu' => $request->name_hu,
            'name_en' => $request->name_en,
            'type' => $request->type,
            'unit' => $request->unit
        ]);

        return response()->json([
            'data' => $attribute,
            'message' => 'Attribute updated'
        ]);
    }
}
