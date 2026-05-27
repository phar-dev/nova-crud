<?php

namespace App\Contracts\Services;

use App\Models\Role;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface RoleServiceInterface
{
    /** @return LengthAwarePaginator<int, Role> */
    public function list(array $filters = []): LengthAwarePaginator;

    public function findById(int $id): Role;

    public function create(array $data): Role;

    public function update(Role $role, array $data): Role;

    public function delete(Role $role): bool;
}
