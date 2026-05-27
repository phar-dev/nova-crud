<?php

namespace App\Http\Controllers\Admin;

use App\Contracts\Services\RoleServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\Roles\RoleFormRequest;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function __construct(
        private readonly RoleServiceInterface $roleService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $paginator = $this->roleService->list(
            $request->only(['search', 'sort', 'per_page', 'page']),
        );

        return inertia('admin/roles/index', [
            'data' => $paginator->items(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/roles/create', [
            'permissions' => Permission::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleFormRequest $request)
    {
        $this->roleService->create($request->validated());

        return redirect()->route('roles.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        return inertia('admin/roles/[id]/edit', [
            'role' => $role->load('permissions'),
            'permissions' => Permission::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleFormRequest $request, Role $role)
    {
        $this->roleService->update($role, $request->validated());

        return redirect()->route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $this->roleService->delete($role);

        return redirect()->route('roles.index');
    }
}
