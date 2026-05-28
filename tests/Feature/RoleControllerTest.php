<?php

use App\Models\Role;
use App\Models\User;

test('role index page can be rendered', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('roles.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('admin/roles/index'));
});

test('role create page can be rendered', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('roles.create'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('admin/roles/create'));
});

test('role can be created', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('roles.store'), [
        'name' => 'Admin',
    ]);

    $response->assertRedirect(route('roles.index'));

    $this->assertDatabaseHas('roles', [
        'name' => 'Admin',
    ]);
});

test('role creation requires valid data', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('roles.store'), [
        'name' => '',
    ]);

    $response->assertSessionHasErrors(['name']);
});

test('role edit page can be rendered', function () {
    $admin = User::factory()->create();
    $target = Role::factory()->create();

    $response = $this->actingAs($admin)->get(route('roles.edit', $target));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/roles/[id]/edit')
        ->has('role')
    );
});

test('role can be updated', function () {
    $admin = User::factory()->create();
    $target = Role::factory()->create();

    $response = $this->actingAs($admin)->put(route('roles.update', $target), [
        'name' => 'Updated Role',
    ]);

    $response->assertRedirect(route('roles.index'));

    $this->assertDatabaseHas('roles', [
        'id' => $target->id,
        'name' => 'Updated Role',
    ]);
});

test('role can be deleted', function () {
    $admin = User::factory()->create();
    $target = Role::factory()->create();

    $response = $this->actingAs($admin)->delete(route('roles.destroy', $target));

    $response->assertRedirect(route('roles.index'));

    $this->assertDatabaseMissing('roles', ['id' => $target->id]);
});

test('guests are redirected to login', function () {
    $this->get(route('roles.index'))->assertRedirect(route('login'));
    $this->get(route('roles.create'))->assertRedirect(route('login'));
    $this->post(route('roles.store'), [])->assertRedirect(route('login'));
    $this->get(route('roles.edit', 1))->assertRedirect(route('login'));
    $this->put(route('roles.update', 1), [])->assertRedirect(route('login'));
    $this->delete(route('roles.destroy', 1))->assertRedirect(route('login'));
});
