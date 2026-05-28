<?php

namespace Database\Seeders;

use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
        ]);

        $adminRole = Role::where('name', 'Admin')->first();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ])->roles()->sync([$adminRole->id]);
    }
}
