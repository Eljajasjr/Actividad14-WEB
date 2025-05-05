# Actividad14-WEB
Actividad 14 Diseño de aplicaciones web

# API de Notas Personales

API CRUD para gestionar notas personales con Node.js, Express y MySQL.

## Características
- Crear, leer, actualizar y eliminar notas
- Cada nota contiene:
  - Título
  - Autor
  - Fecha y hora
  - Cuerpo de la nota
  - Clasificación (personal, laboral, escolar, otros)

## Endpoints
- `POST /notas` - Crear nueva nota
- `GET /notas` - Obtener todas las notas
- `GET /notas/:id` - Obtener una nota por ID
- `PUT /notas/:id` - Actualizar una nota
- `DELETE /notas/:id` - Eliminar una nota

## Instalación
1. Clonar repositorio
2. Instalar dependencias: `npm install`
3. Configurar base de datos (ver database.sql)
4. Iniciar servidor: `npm run dev`