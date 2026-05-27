<?php

use App\Models\User;

test('user index page can be rendered', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('users.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('admin/users/index'));
});

test('user create page can be rendered', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('users.create'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('admin/users/create'));
});

test('user can be created', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('users.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertRedirect(route('users.index'));

    $this->assertDatabaseHas('users', [
        'name' => 'Test User',
        'email' => 'test@example.com',
    ]);
});

test('user creation requires valid data', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('users.store'), [
        'name' => '',
        'email' => 'not-an-email',
        'password' => 'short',
        'password_confirmation' => 'not-matching',
    ]);

    $response->assertSessionHasErrors(['name', 'email', 'password']);
});

test('user edit page can be rendered', function () {
    $admin = User::factory()->create();
    $target = User::factory()->create();

    $response = $this->actingAs($admin)->get(route('users.edit', $target));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/users/[id]/edit')
        ->has('user')
    );
});

test('user can be updated', function () {
    $admin = User::factory()->create();
    $target = User::factory()->create();

    $response = $this->actingAs($admin)->put(route('users.update', $target), [
        'name' => 'Updated Name',
        'email' => 'updated@example.com',
        'password' => '',
        'password_confirmation' => '',
    ]);

    $response->assertRedirect(route('users.index'));

    $this->assertDatabaseHas('users', [
        'id' => $target->id,
        'name' => 'Updated Name',
        'email' => 'updated@example.com',
    ]);
});

test('user update ignores empty password', function () {
    $admin = User::factory()->create();
    $target = User::factory()->create();
    $originalPassword = $target->password;

    $response = $this->actingAs($admin)->put(route('users.update', $target), [
        'name' => $target->name,
        'email' => $target->email,
        'password' => '',
        'password_confirmation' => '',
    ]);

    $response->assertRedirect(route('users.index'));

    $target->refresh();
    expect($target->password)->toBe($originalPassword);
});

test('user can be deleted', function () {
    $admin = User::factory()->create();
    $target = User::factory()->create();

    $response = $this->actingAs($admin)->delete(route('users.destroy', $target));

    $response->assertRedirect(route('users.index'));

    $this->assertDatabaseMissing('users', ['id' => $target->id]);
});

test('guests are redirected to login', function () {
    $this->get(route('users.index'))->assertRedirect(route('login'));
    $this->get(route('users.create'))->assertRedirect(route('login'));
    $this->post(route('users.store'), [])->assertRedirect(route('login'));
    $this->get(route('users.edit', 1))->assertRedirect(route('login'));
    $this->put(route('users.update', 1), [])->assertRedirect(route('login'));
    $this->delete(route('users.destroy', 1))->assertRedirect(route('login'));
});
