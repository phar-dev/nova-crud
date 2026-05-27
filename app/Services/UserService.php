<?php

namespace App\Services;

use App\Contracts\Services\UserServiceInterface;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserService implements UserServiceInterface
{
    /** @return LengthAwarePaginator<int, User> */
    public function list(array $filters = []): LengthAwarePaginator
    {
        return User::query()
            ->when(
                $filters['search'] ?? null,
                fn ($q, $search) => $q->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                }),
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

    public function findById(int $id): User
    {
        return User::findOrFail($id);
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(User $user, array $data): User
    {
        if (empty($data['password'])) {
            unset($data['password']);
        }

        $user->fill($data)->save();

        return $user;
    }

    public function delete(User $user): bool
    {
        return (bool) $user->delete();
    }
}
