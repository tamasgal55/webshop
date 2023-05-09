<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Attribute;

class CategoryController extends Controller
{
    public function show(string $id)
    {
        return response()->json(["data" => Category::findOrFail($id)]);
    }

    public function index()
    {
        return response()->json(["data" => Category::all()]);
    }

    public function getCategoryTree()
    {
        return response()->json(["data" => Category::where('parent_category_id', null)->get()]);
    }

    public function store(Request $request)
    {
        $category = Category::create([
            'name_hu' => $request->name_hu,
            'name_en' => $request->name_en,
            'parent_category_id' => $request->parent_category_id
        ]);

        $category->attributes()->detach();
        $category->attributes()->attach($request['attributes']);


        return response()->json([
            'data' => $category,
            'message' => 'Category created'
        ]);
    }

    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        foreach($category->child_categories as $child)
        {
            $child->update([
                'parent_category_id' => $category->parent_category_id
            ]);
        }

        $category->attributes()->detach();
        
        Category::destroy($id);
        return response()->json([
            'message' => 'Category deleted'
        ]);
    }

    public function update(string $id, Request $request)
    {
        $category = Category::findOrFail($id);

        $attributes_check = $category->parent_category_id != $request->parent_category_id;
        $category->update([
            'name_hu' => $request->name_hu,
            'name_en' => $request->name_en,
            'parent_category_id' => $request->parent_category_id
        ]);
        $allParentAttributes = $category->getAllParentAttributes();
        if($attributes_check) {
            $getChildAttributes = function($category) use (&$getChildAttributes) {
                $childCategories = $category->child_categories()->get();
    
                foreach ($childCategories as $childCategory) {
                    $allParentAttributes = $category->getAllParentAttributes();
                    foreach($childCategory->attributes()->get() as $attribute){
                        if($allParentAttributes->contains('id', $attribute->id)){
                            $childCategory->attributes()->detach($attribute);
                        }
                    }
                    $getChildAttributes($childCategory);
                }
            };
    
            $getChildAttributes($category);
        }

        $category->attributes()->detach();
        $category->attributes()->attach($request['attributes']);

        return response()->json([
            'data' => $category,
            'message' => 'Category updated'
        ]);
    }
}
