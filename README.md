# Huellitas — Aplicación de Adopción de Mascotas (React + Vite)

Aplicación web frontend desarrollada con **React** y **Vite**, lista para ejecutarse localmente con `npm` y desplegarse en **AWS Amplify** (`npm ci && npm run build` -> `dist`).

## Requisitos previos
- Node.js (v18 o superior recomendado) y `npm`.

## Cómo levantar el proyecto en local
1. Descomprime el archivo `.zip` y entra a la carpeta del proyecto:
   ```bash
   cd adopcion-mascotas-react-vite
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Genera el build de producción (carpeta `dist/`):
   ```bash
   npm run build
   ```

## Despliegue en AWS Amplify
- **Build command:** `npm ci && npm run build`
- **Output directory:** `dist`
