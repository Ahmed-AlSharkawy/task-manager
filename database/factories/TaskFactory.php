<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $expired  = fake()->boolean(50);
        $expire_date = $expired ? Carbon::now()->subDays(rand(1, 30)) : Carbon::now()->addDays(rand(1, 30));
        $createdAt = $expired ? $expire_date->copy()->subDays(rand(1, 10)) : Carbon::now()->subDays(rand(1, 100));

        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'title' => fake()->sentence(),
            'description' => fake()->paragraphs(3, true),
            'is_done' => fake()->boolean(50),
            'expire_date' => $expire_date,
            'created_at' => $createdAt,
        ];
    }
}
