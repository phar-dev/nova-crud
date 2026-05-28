<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('roles', RoleController::class)
        ->middlewareFor('index', 'permission:roles.index')
        ->middlewareFor(['create', 'store'], 'permission:roles.create')
        ->middlewareFor(['edit', 'update'], 'permission:roles.edit')
        ->middlewareFor('destroy', 'permission:roles.delete');

    Route::resource('users', UserController::class)
        ->middlewareFor('index', 'permission:users.index')
        ->middlewareFor(['create', 'store'], 'permission:users.create')
        ->middlewareFor(['edit', 'update'], 'permission:users.edit')
        ->middlewareFor('destroy', 'permission:users.delete');
});

require __DIR__.'/settings.php';
