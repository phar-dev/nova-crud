# Ejercicio: CRUD para Sistema de Login de Usuarios y Control de

# Permisos

## Objetivo

Desarrollar una aplicación web básica que permita realizar operaciones CRUD (Crear, Leer, Actualizar,
Eliminar) para usuarios y manejar el login de usuarios con control de permisos.

```
Utiliza Laravel para el backend (Obligatorio)
MySQL para la base de datos (Obligatorio)
React o Vue para el frontend (Opcional).
```
NOTA: Puedes usar alguna plantilla, solo es importante entender el uso de las tecnologías mencionadas.

## Instrucciones

1. **Backend (Laravel)** (Obligatorio)

```
a. Instalación y Configuración:
```
```
o Instala Laravel y configura la conexión a la base de datos MySQL.
```
```
b. Autenticación de Usuarios:
```
```
o Utiliza el sistema de autenticación de Laravel para manejar el registro y login de usuarios.
```
```
c. Modelo y Migraciones:
```
```
o Crea una migración para una tabla users con los campos: id, name, email, password, role, y
timestamps.
o Crea una migración para una tabla roles con los campos: id, name, y timestamps.
o Crea una migración para una tabla permissions con los campos: id, name, y timestamps.
o Crea una migración para una tabla roles_has_permission con los campos: id, id_role,
id_permission y timestamps.
o Crea una migración para una tabla user_has_roles con los campos: id, id_user, id_role y
timestamps.
o Define los modelos para cada tabla.
```
```
d. Controlador:
```
```
o Crea un controlador UserController para manejar las operaciones CRUD de los usuarios.
o Crea un controlador RolController para manejar las operaciones CRUD de los roles.
o Crea un controlador PermissionController para manejar las operaciones CRUD de los
permisos.
o Implementa las rutas necesarias en routes/web.php.
```
2. **Frontend (React o Vue) (OPCIONAL)**

```
a. Configuración del Proyecto:
```
```
o Implementa React o Vue dentro del proyecto.
```

```
b. Componentes:
```
```
o Crea componentes para el login, registro, y la gestión de usuarios.
o Utiliza la herramienta que desee para las solicitudes HTTP al backend.
```
```
c. Manejo de Sesión:
```
```
o Implementa el manejo de sesión para mantener a los usuarios logueados y controlar el acceso
según el rol del usuario.
```
3. **Control de Versiones con Git** (Obligatorio)

```
a. Configuración del Repositorio:
```
```
o Crea un nuevo repositorio en GitHub.
o Clona el repositorio a tu máquina local.
```
```
b. Manejo de Ramas:
```
```
o Crea las siguientes ramas: master, develop, feature/<nombre>, y reléase e impleméntelas de
manera correcta.
```
```
c. Flujo de Trabajo:
```
```
o Realiza el desarrollo inicial en la rama develop.
o Crea ramas feature/<nombre> para desarrollar nuevas características.
o Una vez completada una característica, mergea la rama feature/<nombre> en develop.
o Cuando la versión esté lista para ser liberada, crea una rama release desde develop.
o Después de realizar las pruebas finales, mergea release en master y develop.
```
4. **Entrega:**
    o Sube el código fuente a un repositorio de GitHub.
    o Asegúrate de incluir instrucciones claras sobre cómo configurar y ejecutar el proyecto.
    o Incluye un archivo README.md con la descripción del proyecto y el flujo de trabajo de Git
       utilizado.

## Criterios de Evaluación

1. **Correctitud:**
    o La aplicación debe permitir el registro, login, y gestión de usuarios correctamente.
2. **Seguridad:**
    o Las contraseñas deben ser encriptadas.
    o Implementa middleware para proteger las rutas que requieren autenticación y control de
       permisos según el rol del usuario.
3. **Código Limpio:**
    o Utiliza buenas prácticas de programación, organiza el código y comenta adecuadamente donde
       sea necesario.
4. **Funcionalidad:**
    o Los componentes de frontend deben interactuar correctamente con el backend.
    o La aplicación debe ser capaz de realizar operaciones CRUD completas para los usuarios.
5. **Manejo de Git:**
    o Utiliza ramas para el desarrollo y sigue el flujo de trabajo especificado.
    o El historial de commits debe reflejar el desarrollo del proyecto de manera clara y organizada.
