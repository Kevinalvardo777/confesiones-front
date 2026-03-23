# Confessions Front

Frontend React + Vite para la plataforma de confesiones, preparado para trabajar contra el backend NestJS en `../confessions-back`.

## Ambientes

El proyecto soporta estos modos:

- `local`
- `dev`
- `cert`
- `prod`

Copia el archivo de ambiente que necesites:

- `.env.local.example` a `.env.local`
- `.env.dev.example` a `.env.dev`
- `.env.cert.example` a `.env.cert`
- `.env.prod.example` a `.env.prod`

## Variables principales

- `VITE_APP_NAME`: nombre visible de la app
- `VITE_API_BASE_URL`: base URL de la API
- `VITE_USE_MOCKS`: activa o desactiva los mocks
- `VITE_MOCK_DELAY_MS`: demora artificial de mocks

## Desarrollo

Instala dependencias:

```bash
npm install
```

Inicia el frontend en el ambiente que necesites:

```bash
npm run dev:local
npm run dev:dev
npm run dev:cert
```

Nota: en Vite `local` no puede usarse como nombre de `mode`, asi que `dev:local` y `build:local` usan la carga normal de `.env.local`.

Si quieres usar la configuracion por defecto de Vite, tambien puedes correr:

```bash
npm run dev
```

## Build

```bash
npm run build:local
npm run build:dev
npm run build:cert
npm run build:prod
```

## Prueba real contra el backend

Para guardar datos reales desde el frontend:

1. Levanta `postgres` y `redis` en `confessions-back`.
2. Levanta el backend con el ambiente correspondiente.
3. Configura en este frontend `VITE_USE_MOCKS=false`.
4. Asegura que `VITE_API_BASE_URL` apunte al backend correcto.

Ejemplo local:

```env
VITE_USE_MOCKS=false
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## CI

El repositorio incluye un workflow de GitHub Actions en `.github/workflows/ci.yml` que valida frontend y backend en cada `push` y `pull request`.

## Deploy

El repositorio incluye un workflow de despliegue en `.github/workflows/deploy.yml`.
La guÃ­a de configuraciÃ³n de secretos, ramas y servicios estÃ¡ en `docs/deploy.md`.
