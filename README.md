# Omega Sistema de Reporteria Medica

## Tabla de Contenidos

1. [Introducción](#introduction)
2. [Tecnologias usadas](#used-technologies)
3. [Variables de Entorno](#environment-variables)
4. [Guia de Instalacion](#installation-guide)
   1. [Desarrollo](#installation-guide-dev)
   2. [Produccion](#installation-guide-prod)
5. [Estructura de directorios](#directory-structure)
6. [Scripts](#scripts)
7. [Autenticacion](#authentication)
7. [Endpoints](#endpoints)
7. [Server actions](#server-actions)
7. [Api client](#api-client)
7. [Components](#components)

<div id='introduction'/>

## Introduccion

Aplicacion enfocada en el frontend del sistema. Permite la gestion de los datos de manera visual y simplificada para el usuario final.

<div id='used-technologies'/>

## Tecnologias usadas

|            |        |          |
| ---------- | ------ | -------- |
| Next.js    | TipTap | Tabler   |
| React      | Joi    | NextAuth |
| TypeScript | Dayjs  |          |
| MantineUi  | Docker |          |

<div id='environment-variables'/>

## Variables de entorno

Crear un archivo `.env.prod`, `.env.dev` o `.env.local` en la raiz del proyecto y añade las siguientes variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_next_auth_secret

NEXT_PUBLIC_API_KEY=your_api_key
NEXT_PUBLIC_ROOT_API=http://api.com
```

<div id='installation-guide'/>

## Guia de instalacion

<div id='installation-guide-dev'/>

### Development

1. Clonar el repositorio:

```bash
git clone https://github.com/davidbalance/OmegaFront.git
```

2. Ingresar al directorio del proyecto:

```bash
cd OmegaFront
```

3. Instalar las dependencias:

```bash
npm install
```

4. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

<div id='installation-guide-prod'/>

### Produccion

Para el despliegue en produccion existen dos alternativas, ambas con docker.

<details>
  <summary><b>Metodo 1</b>: <i>Dockerfile</i></summary></br>

En el repositorio existe un archivo `Dockerfile`, este contiene toda la logica necesaria para crear una imagen de docker, generar un build de produccion e insertar un comando que inicia la aplicacion en cuando el contendor se enciende.

1. Clonar el repositorio:

```bash
git clone https://github.com/davidbalance/OmegaFront.git
```

2. Ingresar al directorio del proyecto:

```bash
cd OmegaFront
```

3. Crear una imagen de docker usando `Dockerfile`

```bash
docker build -t OmegaFront:latest .
```

4. Ejecutar la imagen creada

```bash
docker run OmegaFront:latest
```

</details>

<details>
  <summary><b>Metodo 2</b>: <i>Workflow</i></summary></br>

En el directorio `.github/workflow` encontrara el workflow del despliegue de la aplicacion, nombrado como `next.yml`. Este archivo ejecuta una serie de pasos para asegurarse que el sistema funcione sin problemas al mismo tiempo que crea una imagen de docker y la despliega en el servidor.

Los trabajos que corre este workflow son:

1. **build_and_push_docker_image**: Crea una imagen de docker usando el dockerfile presente en el repositorio y lo sube a dockerhub.
2. **deploy**: Entra al servidor, accede al directorio indicado, apaga el contenedor de la aplicacion, lo elimina, descarga la nueva imagen, y corre el nuevo contendor.

Al observar el workflow se podra identificara que usa variables de entorno, estas pueden ser encontradas en github en `settings > Security > Secrets and variables > Actions`

#### Secretos de Github

- `NEXT_PUBLIC_ROOT_API`: Root del API general, es la aplicacion del backend.
- `NEXT_PUBLIC_AUTH_TOKEN_KEY`: Nombre de la llave que sera colocada en las cookies del navegador.
- `NEXT_PUBLIC_REFRESH_TOKEN_KEY`: Nombre de la llave que sea colocada en las cookies del navegador.
- `NEXT_PUBLIC_CONFIGURATION_KEY`: Nombre de la llave que sea colocada en el almacenamiento del navegador.
- `NEXT_PUBLIC_LOGO_KEY`: Nombre de la llave que sea colocada en el almacenamiento del navegador.
- `NEXT_PUBLIC_RESOURCES_KEY`: Nombre de la llave que sea colocada en el almacenamiento del navegador.
- `NEXT_PUBLIC_USER_KEY`: Nombre de la llave que sea colocada en el almacenamiento del navegador.
- `DOCKER_IMAGE`: Nombre de la imagen
- `DOCKERHUB_USERNAME`: Usuario de dockerhub
- `DOCKERHUB_TOKEN`: Token que provee docker hub
- `SERVER_HOST`: Servidor donde se aloja la aplicacion
- `SERVER_USERNAME`: Usuario del servidor
- `SERVER_PASSWORD`: Contraseña del servidor
- `DOCKER_COMPOSE_DIRECTORY`: Directorio donde se aloja el archivo docker-compose.yml detro del servidor

##### Ejecucion del workflow

El workflow de despliegue se ejecutara automaticamente una vez se haga un cambio en la rama `main`

</details>

<div id='directory-structure'/>

## Estructura de directorios

Al usar Next.js como base de la aplicacion, hace uso del sistema del sistema de carpetas y estandares que este proporciona. Esta puede ser revisada en [Next.js Project Structure](https://nextjs.org/docs/getting-started/project-structure)

<div id='scripts'/>

## Scripts

- `dev`: Ejecuta la aplicacion en modo de desarrollo

```bash
npm run dev
```

- `build`: Construye la aplicacion para produccion

```bash
npm run build
```

- `start`: Ejecuta la aplicacion en modo de produccion

```bash
npm run start
```

- `lint`: Ejecuta ESLint para encontrar errores de formato de codigo

```bash
npm run lint
```

<div id='authentication'/>

## Autenticacion

Para este proyecto se opto por usar NextAuth para la autenticacion y refrescamiento de tokens. Segun la documentacion, puede encontrar el codigo referente en la ruta `src/app/api/auth/[...nextauth]`.

<div id='endpoints'/>

## Endpoints

### `POST` /api/medical/disease/report

Permite la descarga de archivos excel que el backend proporciona.

<details>
  <summary><b>Request</b></summary></br>

- **group**: Identificador del grupo corporativo
- **company**: Identificador de la empresa
- **year**: Año del que se quiere obtener el reporte

```typescript
{
  group?: number,
  company?: number,
  year?: number
}
```

  <details>
    <summary>Ejemplo: <i>Peticion base</i></summary></br>

```typescript
fetch("/api/medical/disease/report", {
  method: "POST",
  body: {
    group: 1,
    company: 1,
    year: 2024,
  },
});
```

  </details>
  
  <details>
    <summary>Ejemplo: <i>Sin año</i></summary></br>

```typescript
fetch("/api/medical/disease/report", {
  method: "POST",
  body: {
    group: 1,
    company: 1,
  },
});
```

  </details>

  <details>
    <summary>Ejemplo: <i>Sin grupo y empresa</i></summary></br>

```typescript
fetch("/api/medical/disease/report", {
  method: "POST",
  body: {
    year: 2024,
  },
});
```

  </details>

</details>

<details>
<summary><b>Response</b></summary></br>

El api retorna un blob que representa un archivo excel

</details>

### `GET` /api/medical/file/**{type}**/**{id}**

Permite la descarga de un archivo pdf de un resultado asociado.

<details>
  <summary><b>Request</b></summary></br>

```typescript
const type = "result"; // ESTE VALOR PUEDE UNICAMENTE SER 'result' o 'report';
const id = 1; // ESTE ES EL IDENTIFICADOR DE UN Resultado O REPORTE
fetch("/api/medical/file/report", {
  method: "GET",
});
```

</details>

<details>
<summary><b>Response</b></summary></br>

El api retorna un blob que representa un archivo pdf

</details>

### `GET` /api/medical/file/multiple

Permite la descarga de un archivo pdf de un resultado asociado.

<details>
  <summary><b>Request</b></summary></br>

- **files**: Arreglo de datos
  - **id**: Identificador del resultado o reporte
  - **type**: Tipo del archivo a descargar (result o report)

```typescript
{
  files: [
    {
      id: number,
      type: "result" | "report",
    },
  ];
}
```

<details>
  <summary>Ejemplo</summary></br>

```typescript
const type = "result"; // ESTE VALOR PUEDE UNICAMENTE SER 'result' o 'report';
const id = 1; // ESTE ES EL IDENTIFICADOR DE UN Resultado O REPORTE
fetch("/api/medical/file/multiple", {
  method: "POST",
  body: [
    {
      id: 1
      type: "result",
    }
  ]
});
```

</details>

</details>

<details>
<summary><b>Response</b></summary></br>

El api retorna un blob que representa un archivo zip

</details>

<div id='server-actions'/>

## Server actions

Debido al uso de NextJS 14, en lugar de usar endpoints locales, se opto por acciones de servidor para mutar datos cuando sean necesarios. Estas acciones pueden ser encontadas en `src/server`

<div id='api-client'/>

## Api client

Este es un cliente api, su objetivo es comunicarse con el backend externo, al mismo tiempo que provee de capas de abstracion para procesar y aumentar con facilidad la administracion de los endpoints. Como ejemplos, puede revisar los server actions puesto que estos hacen uso de este api client.

<div id='components'/>

## Componentes

El directorio `src/components` contiene los componentes que son usados alrededor de todo el sistema, sin embargo, hay casos donde podra encontrar `_components` los componentes dentro de este directorio son componentes cuyo unico fin es ser usados dentro de una pagina especifica.
