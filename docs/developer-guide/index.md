# Developer Guide

Guía para inicializar y ejecutar el proyecto en entorno local.

## Prerrequisitos

- PHP ^8.3
- Composer
- Node.js ^22
- Docker + Docker Compose (para Laravel Sail)
- MySQL 8+ (si no usás Sail)

## Instalación

### 1. Clonar el repositorio

```bash
git clone git@github.com:phar-dev/nova-crud.git
cd nova-crud
```

### 2. Instalar dependencias PHP

```bash
composer install
```

### 3. Configurar entorno

```bash
cp .env.example .env
php artisan key:generate
```

Editar `.env` según tu entorno (base de datos, mail, etc.).

### 4. Levantar contenedores (Sail)

```bash
# Iniciar Sail en background
./vendor/bin/sail up -d

# Alternativa: alias para usar sail sin prefijo
alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'
```

Sail levanta los servicios necesarios (app, mysql, etc.).

> Si no usás Sail, configurá manualmente tu servidor web y base de datos.

### 5. Migrar y seedar la base de datos

```bash
./vendor/bin/sail php artisan migrate --seed
```

Esto crea las tablas y población inicial:
- Permisos granulares (users.*, roles.*)
- Rol **Admin** con todos los permisos
- Usuario de prueba: `test@example.com`

### 6. Instalar dependencias frontend

```bash
./vendor/bin/sail pnpm install
```

### 7. Compilar assets

```bash
./vendor/bin/sail pnpm run build
```

## Desarrollo

### Iniciar servidor de desarrollo

```bash
# Backend + frontend + queue + logs
./vendor/bin/sail php artisan dev
```

Esto ejecuta en paralelo:
- `php artisan serve` — servidor HTTP (localhost:80)
- `php artisan queue:listen` — worker de colas
- `php artisan pail` — logs en tiempo real
- `vite` — HMR para el frontend

O componentes por separado:

```bash
# Solo backend
./vendor/bin/sail php artisan serve

# Solo frontend (HMR)
./vendor/bin/sail pnpm run dev
```

### Regenerar tipos de rutas (Wayfinder)

```bash
./vendor/bin/sail php artisan wayfinder:generate --with-form
```

Necesario si se agregan/modifican rutas. El flag `--with-form` es obligatorio para que el helper `.form()` esté disponible.

### Formatear código

```bash
# PHP
./vendor/bin/sail php vendor/bin/pint

# TypeScript / React
./vendor/bin/sail pnpm run format
./vendor/bin/sail pnpm run lint
```

### TypeScript

```bash
./vendor/bin/sail pnpm run types:check
```

## Testing

### Ejecutar todos los tests

```bash
./vendor/bin/sail php artisan test --compact
```

### Filtrar por test

```bash
./vendor/bin/sail php artisan test --compact --filter=UserControllerTest
./vendor/bin/sail php artisan test --compact --filter=RoleControllerTest
```

### Resetear base de datos de testing

Si los tests fallan con errores de migración (tablas duplicadas, etc.), refrescar:

```bash
./vendor/bin/sail php artisan migrate:fresh --env=testing --seed
```

## Comandos útiles

```bash
# Listar rutas
./vendor/bin/sail php artisan route:list

# Tinker (REPL)
./vendor/bin/sail php artisan tinker

# Logs en tiempo real
./vendor/bin/sail php artisan pail

# Detener Sail
./vendor/bin/sail down
```

## Troubleshooting

### Vite manifest error

```
Illuminate\Foundation\ViteException: Unable to locate file in Vite manifest
```

Ejecutar:

```bash
./vendor/bin/sail pnpm run build
```

### Base de datos de testing corrupta

Si los tests fallan con `SQLSTATE[42S01]: Base table or view already exists`:

```bash
./vendor/bin/sail php artisan migrate:fresh --env=testing --seed
```
