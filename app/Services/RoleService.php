<?php

namespace App\Services;

use App\Contracts\Services\RoleServiceInterface;
use App\Models\Role;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class RoleService implements RoleServiceInterface
{
    /** @return LengthAwarePaginator<int, Role> */
    public function list(array $filters = []): LengthAwarePaginator
    {
        return Role::query()
            ->when(
                $filters['search'] ?? null,
                fn ($q, $search) => $q->where('name', 'like', "%{$search}%"),
            )
            ->when(
                $filters['sort'] ?? null,
                fn ($q, $sort) => $q->orderBy(
                    ltrim($sort, '-'),
                    str_starts_with($sort, '-') ? 'desc' : 'asc',
                ),
            )
            ->orderBy('created_at', 'desc')
            ->paginate(
                $filters['per_page'] ?? 15,
                ['*'],
                'page',
                $filters['page'] ?? 1,
            );
    }

    public function findById(int $id): Role
    {
        return Role::findOrFail($id);
    }

    public function create(array $data): Role
    {
        $permissions = $data['permissions'] ?? [];
        unset($data['permissions']);

        $role = Role::create($data);
        $role->permissions()->sync($permissions);

        return $role;
    }

    public function update(Role $role, array $data): Role
    {
        $role->fill($data)->save();

        if (array_key_exists('permissions', $data)) {
            $role->permissions()->sync($data['permissions']);
        }

        return $role;
    }

    public function delete(Role $role): bool
    {
        return (bool) $role->delete();
    }
}
