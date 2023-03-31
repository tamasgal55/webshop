<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{


    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('languages')->updateOrInsert(
            ['code' => 'hu']
        );

        DB::table('languages')->updateOrInsert(
            ['code' => 'en']
        );

        // \App\Models\User::factory(10)->create();

        DB::table('addresses')->updateOrInsert(
            [
                'country' => 'Magyarország',
                'postal_code' => 1113,
                'city' => 'Budapest',
                'address_line_one' => 'Utca',
                'address_line_two' => 'Házszám'
            ]
        );

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        DB::table('categories')->updateOrInsert([
            'name_hu' => 'Műszaki',
            'name_en' => 'IT'
        ]);

        DB::table('categories')->updateOrInsert([
            'name_hu' => 'Divat',
            'name_en' => 'Fashion'
        ]);

        DB::table('categories')->updateOrInsert([
            'name_hu' => 'Szórakozás',
            'name_en' => 'Entertainment'
        ]);

        DB::table('categories')->updateOrInsert([
            'name_hu' => 'Sport',
            'name_en' => 'Sport'
        ]);

        DB::table('categories')->updateOrInsert([
            'name_hu' => 'Autó-Motor',
            'name_en' => 'Vehicle'
        ]);

        DB::table('categories')->updateOrInsert([
            'name_hu' => 'Otthon',
            'name_en' => 'Home'
        ]);


        /*DB::table('products')->updateOrInsert(
            [
                'name' => 'Product',
                'price' => '1000',
                'description' => 'Description',
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => 1
            ]
        );

        Product::factory(30)->create();

        DB::table('images')->updateOrInsert(
            [
                'image' => 'base_64 image',
                'product_id' => 1
            ]
        );*/
    }
}
