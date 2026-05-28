# Nova CRUD

Sistema de gestión de usuarios y roles con control de permisos basado en **RBAC** (Role-Based Access Control). Construido con Laravel + Inertia + React.

## Objetivo

Aplicación web que permite:

- **Autenticación** (registro, login, verificación email, 2FA, passkeys)
- **CRUD de usuarios** con asignación de roles
- **CRUD de roles** con asignación de permisos
- **Control de acceso granular** por permiso (middleware + frontend gates)

## Tech Stack

| Capa | Tecnología |
|---|---|
| Backend | Laravel 13 + PHP 8.5 |
| Frontend | React 19 + Inertia.js v3 |
| Estilos | Tailwind CSS v4 + shadcn/ui |
| Base de datos | MySQL |
| Contenedores | Laravel Sail (Docker) |
| Testing | Pest 4 |
| Tooling | TypeScript, Vite, ESLint, Prettier, Pint |

## Permisos

8 permisos granulares:

```
users.index   users.create   users.edit   users.delete
roles.index   roles.create   roles.edit   roles.delete
```

El rol **Admin** incluye todos los permisos automáticamente.

## Git Workflow

```
master ← release/v*.*.* ← develop ← feature/<name>
```

1. Las features se desarrollan en ramas `feature/*` desde `develop`
2. Se mergean vía **Pull Request** a `develop`
3. Cuando `develop` está lista, se crea `release/v*.*.*`
4. La release se mergea a `master` (y de vuelta a `develop`) vía PR
