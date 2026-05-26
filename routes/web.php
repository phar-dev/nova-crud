<?php

use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('roles', RoleController::class);
});

require __DIR__.'/settings.php';
