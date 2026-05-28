<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'manage-users',
            'manage-roles',
            'manage-permissions',
            'view-reports',
            'manage-settings',
            // Granular user permissions
            'users.index',
            'users.create',
            'users.edit',
            'users.delete',
            // Granular role permissions
            'roles.index',
            'roles.create',
            'roles.edit',
            'roles.delete',
        ];

        foreach ($permissions as $name) {
            Permission::firstOrCreate(['name' => $name]);
        }
    }
}
