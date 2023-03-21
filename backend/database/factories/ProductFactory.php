<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'price' => fake()->randomNumber(6),
            'description' => fake()->paragraphs(1, true),
            'created_at' => now(),
            'updated_at' => now(),
            'user_id' => 1
        ];
    }
}
