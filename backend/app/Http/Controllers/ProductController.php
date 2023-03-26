<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Image;

class ProductController extends Controller
{
    public function index()
    {
        $products_with_images = array();
        $all_products = Product::where('active', 1)->get();
        foreach($all_products as $product) 
        {
            array_push($products_with_images, [
                'id' => $product->id,
                'user_id' => $product->user_id,
                'name' => $product->name,
                'price' => $product->price,
                'description' => $product->description,
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at,
                'images' => $product->images
            ]);
        }
        return response()->json($products_with_images);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'max:50'],
            'price' => ['required'],
            'description' => ['max:150']
        ]);

        $product = Product::create([
            'user_id' => auth()->user()->id,
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description
        ]);

        foreach($request->images as $image)
        {
            Image::create([
                'image' => $image,
                'product_id' => $product->id
            ]);
        }

        return response()->json([
            'data' => $product,
            'message' => 'Product created'
        ]);
    }
}
