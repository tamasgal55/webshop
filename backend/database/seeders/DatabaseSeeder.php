<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\Language;
use \App\Models\User;
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


        DB::table('addresses')->updateOrInsert(
            [
                'country' => 'Magyarország',
                'postal_code' => 1113,
                'city' => 'Budapest',
                'address_line_one' => 'Utca',
                'address_line_two' => 'Házszám'
            ]
        );

        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        DB::table('products')->updateOrInsert(
            [
                'name' => 'Product',
                'price' => '1000',
                'description' => 'Description',
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => 1
            ]
        );

        DB::table('images')->updateOrInsert(
            [
                'image' => 'base_64 image',
                'product_id' => 1
            ]
        );
    }
}
