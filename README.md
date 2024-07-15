# Omega Sistema de Reporteria Medica

## Tabla de Contenidos

1. [Introducción](#introduction)
2. [Autenticación](#used-technologies)
3. [Guia de Instalacion](#installation-guide)
   1. [Desarrollo](#installation-guide-dev)
   2. [Produccion](#installation-guide-prod)
4. [Estructura de directorios](#directory-structure)
5. [Scripts](#scripts)
6. [Variables de Entorno](#environment-variables)
7. [Documentacion de API](#endpoints)
   1. [`POST` /api/auth/login](#enpoint-1)
   2. [`POST` /api/auth/logout](#enpoint-2)
   3. [`POST` /api/credentials](#enpoint-3)
   4. [`PATCH` /api/credentials](#enpoint-4)
   5. [`GET` /api/key](#enpoint-5)
   6. [`POST` /api/key](#enpoint-6)
   7. [`PATCH` /api/key/_{id}_](#enpoint-7)
   8. [`GET` /api/corporative/groups](#enpoint-8)
   9. [`POST` /api/logs](#enpoint-9)
   10. [`GET` /api/logs/level](#enpoint-10)
   11. [`GET` /api/doctors](#enpoint-11)
   12. [`POST` /api/doctors/signature/_{id}_](#enpoint-12)
   13. [`GET` /api/patients](#enpoint-13)
   14. [`GET` /api/patients/look/company](#enpoint-14)
   15. [`GET` /api/users](#enpoint-15)
   16. [`POST` /api/users](#enpoint-16)
   17. [`PATCH` /api/users/_{id}_](#enpoint-17)
   18. [`DELETE` /api/users/_{id}_](#enpoint-18)
   19. [`GET` /api/users/attribute/doctor/of/_{id}_](#enpoint-19)
   20. [`PATCH` /api/users/attribute/doctor/of/_{id}_](#enpoint-20)
   21. [`GET` /api/users/attribute/employee/_{id}_](#enpoint-21)
   22. [`PATCH` /api/users/attribute/employee/_{id}_](#enpoint-22)
   23. [`GET` /api/users/attribute/look/for/comapany/_{id}_](#enpoint-23)
   24. [`PATCH` /api/users/attribute/look/for/comapany/_{id}_](#enpoint-24)
   25. [`POST` /api/diseases](#enpoint-25)
   26. [`PATCH` /api/diseases/_{id}_](#enpoint-26)
   27. [`DELETE` /api/diseases/_{id}_](#enpoint-27)
   28. [`GET` /api/diseases/groups](#enpoint-28)
   29. [`POST` /api/diseases/groups](#enpoint-29)
   30. [`PATCH` /api/diseases/groups/_{id}_](#enpoint-30)
   31. [`DELETE` /api/diseases/groups/_{id}_](#enpoint-31)
   32. [`GET` /api/medical/client/_{dni}_/email](#enpoint-32)
   33. [`POST` /api/medical/client/_{dni}_/email](#enpoint-33)
   34. [`PATCH` /api/medical/client/_{dni}_/email/_{id}_](#enpoint-34)
   35. [`DELETE` /api/medical/client/email/_{id}_](#enpoint-35)
   36. [`GET` /api/medical/orders/files/_{id}_](#enpoint-36)
   37. [`GET` /api/medical/orders/mail/_{order}_/_{mail}_](#enpoint-37)
   38. [`GET` /api/medical/orders/patient/_{dni}_](#enpoint-38)
   39. [`GET` /api/medical/reports/recreate/pdf](#enpoint-39)
   40. [`POST` /api/medical/reports/recreate/pdf](#enpoint-40)
   41. [`PATCH` /api/medical/results/diseases/_{id}_](#enpoint-41)
   42. [`GET` /api/medical/results/doctor](#enpoint-42)
   43. [`POST` /api/medical/results/file/_{id}_](#enpoint-43)
   44. [`GET` /api/medical/file/_{type}_/_{id}_](#enpoint-44)
   45. [`POST` /api/medical/file/multiple](#enpoint-45)
   46. [`PATCH` /api/medical/results/report](#enpoint-46)
   47. [`GET` /api/selector/disease/group](#enpoint-47)
   48. [`GET` /api/selector/disease/_{group}_](#enpoint-48)
   49. [`GET` /api/selector/exam](#enpoint-49)
   50. [`GET` /api/selector/location/branches/_{company}_](#enpoint-50)
   51. [`GET` /api/selector/location/cities](#enpoint-51)
   52. [`GET` /api/selector/location/companies/_{group}_](#enpoint-52)
   53. [`GET` /api/selector/location/corporative/groups](#enpoint-53)
   54. [`PATCH` /api/web/clients/logos/_{user}_](#enpoint-54)
   55. [`GET` /api/web/clients/resources/_{user}_](#enpoint-55)
   56. [`PATCH` /api/web/clients/resources/_{user}_](#enpoint-56)
   57. [`GET` /api/web/resources](#enpoint-57)
   58. [`POST` /api/web/resources](#enpoint-58)
   59. [`PATCH` /api/web/resources/_{id}_](#enpoint-59)
   60. [`DELETE` /api/web/resources/_{id}_](#enpoint-60)
   61. [`GET` /api/web/resources/all](#enpoint-61)
   62. [`GET` /api/management](#enpoint-62)
   63. [`POST` /api/management](#enpoint-63)
   64. [`PATCH` /api/management/_{id}_](#enpoint-64)
   65. [`DELETE` /api/management/_{id}_](#enpoint-65)
   66. [`GET` /api/area](#enpoint-66)
   67. [`POST` /api/area](#enpoint-67)
   68. [`PATCH` /api/area/_{id}_](#enpoint-68)
   69. [`DELETE` /api/area/_{id}_](#enpoint-69)
   70. [`POST` /api/medical/orders/company](#enpoint-70)
   71. [`PATCH` /api/medical/orders/order/_{id}_/status/validate](#enpoint-71)
   72. [`GET` /api/medical/client/_{dni}_/management/area](#enpoint-72)
   73. [`POST` /api/medical/client/_{dni}_/management/area](#enpoint-73)
   74. [`DELETE` /api/medical/client/_{dni}_/management/area](#enpoint-74)
8. [Documentacion de Componentes](#components)
   1. [ApiKeyFormCreateProps](#component-1)
   2. [AuthenticationFormPassword](#component-2)
   3. [ButtonResponsive](#component-3)
   4. [CommandsMedicalReportGenerateAllPdf](#component-4)
   5. [CommandsMedicalReportGeneratePdfByDni](#component-5)
   6. [DeveloperCommands](#component-6)
   7. [DeveloperLog](#component-7)
   8. [DeveloperLogs](#component-8)
   9. [DevloperLogButtons](#component-9)
   10. [DeveloperPagesActionMenu](#component-10)
   11. [DeveloperPageForm](#component-11)
   12. [DeveloperPageFormCreate](#component-12)
   13. [DeveloperPageFormCreate](#component-13)
   14. [DeveloperPages](#component-14)
   15. [DiseaseActionMenu](#component-15)
   16. [DiseaseForm](#component-16)
   17. [DiseaseFormCreate](#component-17)
   18. [DiseaseFormUpdate](#component-18)
   19. [DiseaseFormGroup](#component-19)
   20. [DiseaseFormUpdateGroup](#component-21)
   21. [DiseseGroupForm](#component-22)
   22. [DiseaseGroupFormCreate](#component-23)
   23. [DiseaseGroupFormUpdate](#component-24)
   24. [DoctorActionMenu](#component-25)
   25. [DoctorFormCreateCredential](#component-26)
   26. [DoctorFormUploadSignature](#component-27)
   27. [DownloadActionButton](#component-28)
   28. [OmegaDropzone](#component-29)
   29. [Footer](#component-30)
   30. [Header](#component-31)
   31. [InputSearch](#component-32)
   32. [ListHeaderButton](#component-33)
   33. [ListLayout](#component-34)
   34. [ListRowElement](#component-35)
   35. [MultipleTierLayout](#component-36)
   36. [LayoutSubFormTitle](#component-37)
   37. [TableLayout](#component-38)
   38. [MedicalClientActionDefault](#component-39)
   39. [MedicalClientActionDelete](#component-40)
   40. [MedicalClientForm](#component-41)
   41. [MedicalClientLayoutEmail](#component-42)
   42. [MedicalClientModalEmailSelection](#component-43)
   43. [MedicalOrderActionMenu](#component-44)
   44. [MedicalReportForm](#component-45)
   45. [MedicalResultActionMenu](#component-46)
   46. [MedicalResultButtonMenuItem](#component-47)
   47. [MedicalResultFormDisease](#component-48)
   48. [MedicalResultFormUploadFile](#component-49)
   49. [MenuItemSendMail](#component-50)
   50. [ModalConfirmation](#component-51)
   51. [ModularBox](#component-52)
   52. [ModularLayout](#component-53)
   53. [NavLink](#component-54)
   54. [NavLogo](#component-55)
   55. [Topbar](#component-56)
   56. [TopbarMenu](#component-57)
   57. [Navbar](#component-58)
   58. [NavIcon](#component-59)
   59. [PatientActionButton](#component-60)
   60. [OmegaTable](#component-61)
   61. [OmegaTd](#component-62)
   62. [OmegaTh](#component-63)
   63. [SortTh](#component-64)
   64. [UserActionButton](#component-65)
   65. [UserForm](#component-66)
   66. [UserFormAssignCompany](#component-67)
   67. [UserFormAssignCompanyAttribute](#component-68)
   68. [UserFormChangePassword](#component-69)
   69. [UserFormCreate](#component-70)
   70. [UserFormLogo](#component-71)
   71. [UserFormUpdate](#component-72)
   72. [UserFormWebResource](#component-73)
   73. [WebResourceFormAssign](#component-74)
9. [Documentacion de Hooks](#hooks)

   1. [useAuth](#hook-1)
   2. [useChunk](#hook-2)
   3. [useFetch](#hook-3)
   4. [useFilter](#hook-4)
   5. [useList](#hook-5)
   6. [useLocalStorage](#hook-6)
   7. [useMail](#hook-7)
   8. [useSort](#hook-8)

10. [Documentacion de Contextos](#context)
    1. [ConfirmationContext](#context-1)

<div id='introduction'/>

## Introduccion

Aplicacion enfocada en el frontend del sistema. Permite la gestion de los datos de manera visual y simplificada para el usuario final.

<div id='used-technologies'/>

## Tecnologias usadas

- Next.js
- React
- TypeScript
- MantineUi
- TipTap
- Joi
- Dayjs
- Docker

<div id='installation-guide'/>

## Guia de instalacion

<div id='installation-guide-dev'/>

### Development

1. Clona el repositorio:

```bash
git clone https://github.com/davidbalance/OmegaFront.git
```

2. Ingresa al directorio del proyecto:

```bash
cd OmegaFront
```

3. Instala las dependencias:

```bash
npm install
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

<div id='installation-guide-prod'/>

### Produccion

Para el despliegue en produccion existen dos alternativas, ambas con docker. La primera es generar la imagen de forma manual haciendo uso del `Dockerfile` presente en el repositorio

#### Metodo 1

Despliegue en produccion mediante la creacion manual de la imagen e inicializacion del mismo

1. Clona el repositorio:

```bash
git clone https://github.com/davidbalance/OmegaFront.git
```

2. Ingresa al directorio del proyecto:

```bash
cd OmegaFront
```

3. Crea una imagen de docker usando `Dockerfile`

```bash
docker build -t OmegaFront:latest .
```

4. Ejecuta la imagen creada

```bash
docker run OmegaFront:latest
```

#### Metodo 2

Despliegue en produccion usando github workflow.

Se requiere de un archivo llamado `next.yml`, este archivo posee todo los pasos y conexiones de entre github y el servidor. El archivo puede ser encontrado en la siguiente ubicacion

```bash
/.github/workflows
```

El workflow se encarga de crear una imagen de docker publicarla, entrar al servidor, y actualizar la imagen de la aplicacion con la nueva creada para ello hace uso de un `docker-compose.yml`

Para ejecutar el yml requiere de los sigueintes secretos, estos pueden ser colocados/modificados/eliminados dentro de github en

```bash
settings > Security > Secrets and variables > Actions
```

##### Secretos de Github

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

##### Trabajos del workflow

- `build_and_push_docker_image`: Crea la imagen de docker de la aplicacion y la publica en dockerhub
- `deploy`: Se conecta al servidor, ingresa a la direccion donde se encuentra alojado el archivo `docker-compose.yml`, baja los contendores, descarga una nueva version de las imagenes indicadas por docker-compose y vuelve a construir la aplicacion

##### Ejecucion del workflow

1. Crear una nueva rama:

```bash
git checkout -b new-branch
```

2. Realizar cambios y modificaciones al codigo

3. Subir cambios al repositorio:

```bash
git add .
git commit -am "Your commit ..."
git push
```

4. Realizar un pull request y aceptar todos los cambios

5. Realizar un merge con la rama `main`

Cuando se sube un cambio a la rama `main` se ejecuta el workflow, creando una nueva imagen de la aplicacion.

Si gusta ver si se ha desplegado de forma correcta la aplicacion en el servidor entre al apartado de `Actions` de github ahi vera una lista de todos los workflows que se han ejecutado, si algo ha salido mal puede abrir el workflow, ahi encontrara los logs de la aplicacion donde podremos observar cual ha sido el error. Muchas veces el error puede ser algun tema relacionado con el ESLint de NextJS por lo que debe asegurarse que las depedencias de los hooks sean las correctas o que toda funcionalidad dentro de un componente cumpla con el ciclo de vida de React

<div id='directory-structure'/>

## Estructura de directorios

```bash
src
├───app
│   ├───api
│   │   ├───(authentication)
│   │   │   ├───auth
│   │   │   │   ├───login
│   │   │   │   └───logout
│   │   │   ├───credentials
│   │   │   └───key
│   │   │       └───[id]
│   │   ├───(location)
│   │   │   └───corporative
│   │   │       └───groups
│   │   ├───(logger)
│   │   │   └───logs
│   │   │       └───level
│   │   ├───(user)
│   │   │   ├───doctors
│   │   │   │   └───signature
│   │   │   │       └───[id]
│   │   │   ├───patients
│   │   │   │   └───look
│   │   │   │       └───company
│   │   │   └───users
│   │   │       ├───attribute
│   │   │       │   ├───doctor
│   │   │       │   │   └───of
│   │   │       │   │       └───[id]
│   │   │       │   ├───employee
│   │   │       │   │   └───[id]
│   │   │       │   └───look
│   │   │       │       └───for
│   │   │       │           └───company
│   │   │       │               └───[id]
│   │   │       └───[id]
│   │   ├───diseases
│   │   │   ├───groups
│   │   │   │   └───[id]
│   │   │   └───[id]
│   │   ├───medical
│   │   │   ├───client
│   │   │   │   ├───email
│   │   │   │   │   └───[id]
│   │   │   │   └───[dni]
│   │   │   │       └───email
│   │   │   │           └───[id]
│   │   │   ├───orders
│   │   │   │   ├───files
│   │   │   │   │   └───[id]
│   │   │   │   ├───mail
│   │   │   │   │   └───[order]
│   │   │   │   │       └───[mail]
│   │   │   │   └───patient
│   │   │   │       └───[dni]
│   │   │   ├───reports
│   │   │   │   └───recreate
│   │   │   │       └───pdf
│   │   │   └───results
│   │   │       ├───doctor
│   │   │       ├───file
│   │   │       │   ├───downloader
│   │   │       │   │   ├───multiple
│   │   │       │   │   └───[type]
│   │   │       │   │       └───[id]
│   │   │       │   └───[id]
│   │   │       ├───report
│   │   │       │   └───[id]
│   │   │       └───[id]
│   │   ├───selector
│   │   │   ├───disease
│   │   │   │   ├───group
│   │   │   │   └───[group]
│   │   │   ├───exam
│   │   │   └───location
│   │   │       ├───branches
│   │   │       │   └───[company]
│   │   │       ├───cities
│   │   │       ├───companies
│   │   │       │   └───[group]
│   │   │       └───corporative
│   │   │           └───groups
│   │   └───web
│   │       ├───clients
│   │       │   ├───logos
│   │       │   │   └───[user]
│   │       │   └───resources
│   │       │       └───[user]
│   │       └───resources
│   │           ├───all
│   │           └───[id]
│   ├───login
│   ├───omega
│   │   ├───(diseases)
│   │   │   └───disease
│   │   ├───(users)
│   │   │   └───patient
│   │   ├───admin
│   │   │   ├───doctor
│   │   │   ├───patient
│   │   │   └───user
│   │   ├───api-key
│   │   ├───developer
│   │   ├───locations
│   │   └───report
│   └───order
│       └───[id]
├───components
│   ├───api-key
│   │   └───form
│   ├───authentication
│   │   └───form
│   ├───button
│   │   └───responsive
│   ├───commands
│   │   └───medical
│   │       └───report
│   ├───developer
│   │   ├───commands
│   │   ├───logs
│   │   └───pages
│   │       ├───action
│   │       └───form
│   ├───disease
│   │   ├───action
│   │   ├───form
│   │   └───group
│   │       ├───action
│   │       └───form
│   ├───doctor
│   │   ├───action
│   │   └───form
│   ├───download
│   │   └───action
│   ├───dropzone
│   │   └───omega-dropzone
│   ├───footer
│   ├───header
│   ├───input
│   │   └───search
│   ├───layout
│   │   ├───list-layout
│   │   ├───multiple-tier-layout
│   │   ├───sub
│   │   │   └───form
│   │   └───table-layout
│   ├───medical
│   │   ├───client
│   │   │   ├───action
│   │   │   ├───form
│   │   │   ├───layout
│   │   │   └───modal
│   │   ├───order
│   │   │   └───action
│   │   ├───report
│   │   │   └───form
│   │   └───result
│   │       ├───action
│   │       ├───button
│   │       └───form
│   ├───menu
│   │   └───item
│   ├───modal
│   │   └───confirmation
│   ├───modular
│   │   ├───box
│   │   └───layout
│   ├───navbar
│   │   ├───nav
│   │   │   ├───link
│   │   │   └───logo
│   │   │       └───logos
│   │   └───topbar
│   ├───patient
│   │   └───action
│   ├───table
│   │   ├───omega-table
│   │   ├───omega-td
│   │   ├───omega-th
│   │   └───sort-th
│   ├───user
│   │   ├───action
│   │   ├───email
│   │   └───form
│   └───web
│       └───resource
│           └───form
├───config
├───contexts
│   └───confirmation
├───hooks
│   ├───useAuth
│   ├───useChunk
│   ├───useFetch
│   ├───useFilter
│   ├───useList
│   ├───useLocalStorage
│   ├───useMail
│   └───useSort
└───lib
    ├───constants
    ├───dtos
    │   ├───auth
    │   │   ├───api
    │   │   │   └───key
    │   │   └───credential
    │   ├───disease
    │   │   └───group
    │   ├───health
    │   ├───location
    │   │   └───corporative
    │   ├───logs
    │   ├───medical
    │   │   ├───client
    │   │   ├───file
    │   │   ├───order
    │   │   └───result
    │   ├───selector
    │   ├───user
    │   └───web
    ├───endpoints
    │   └───v1
    │       ├───authentication
    │       │   └───api
    │       │       └───key
    │       ├───disease
    │       │   └───group
    │       ├───health
    │       ├───location
    │       │   └───corporative
    │       │       └───group
    │       ├───log
    │       ├───medical
    │       ├───selector
    │       │   ├───corporative
    │       │   └───disease
    │       │       └───group
    │       ├───user
    │       └───web
    ├───errors
    ├───fetcher
    ├───theme
    ├───types
    └───utils
```

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

<div id='environment-variables'/>

## Variables de entorno

Crea un archivo `.env.local` en la raiz del proyecto y añade las variables de entorno necesarias:

```bash
NEXT_PUBLIC_ROOT_API=http://localhost:3001
NEXT_PUBLIC_AUTH_TOKEN_KEY=your_auth_token_key
NEXT_PUBLIC_REFRESH_TOKEN_KEY=your_refresh_token_key

NEXT_PUBLIC_CONFIGURATION_KEY=your_configuration_key
NEXT_PUBLIC_LOGO_KEY=your_logo_key
NEXT_PUBLIC_RESOURCES_KEY=your_resource_key
NEXT_PUBLIC_USER_KEY=your_user_key
```

<div id='endpoints'/>

## Documentacion de API

<div id='enpoint-1'/>

### `POST` /api/auth/login

Permite al usuario el acceso del usuario al sistema

#### Request Body

- **username**: Correo del usuario
- **password**: Contraseña del usuario

```typescript
{
  username: string,
  password: string
}
```

#### Response

##### Response Body

```typescript
{
  id: number,
  dni: string,
  email: string,
  name: string,
  lastname: string
}
```

<div id='enpoint-2'/>

### `POST` /api/auth/logout

Permite al usuario eliminar datos de registro del servidor

<div id='enpoint-3'/>

### `POST` /api/credentials

Crea credenciales para un usuario previamente registrado en el sistema

#### Request Body

- **email**: Correo del usuario
- **password**: Contraseña del usuario
- **user**: Identificador unico de un usuario previamente registrado

```typescript
{
  username: string,
  password: string
}
```

#### Response

##### Response Body

```typescript

```

<div id='enpoint-4'/>

### `PATCH` /api/credentials

Permite el cambio de contraseña de un usuario

#### Request Body

- **email**: Correo del usuario
- **password**: Contraseña del usuario

```typescript
{
  username: string,
  password: string
}
```

#### Response

##### Response Body

```typescript

```

<div id='enpoint-5'/>

### `GET` /api/key

Obtiene los API-KEY de un usuario que previamente haya ingresado al sistema

#### Response

##### Response Body

```typescript
{
    apiKeys: {
        id: number,
        name: string
    }[];
}
```

<div id='enpoint-6'/>

### `POST` /api/key

Crea un API-KEY y lo asocia al presente usuario

#### Request Body

- **name**: Correo del usuario

```typescript
{
  name: string;
}
```

#### Response

##### Response Body

```typescript
{
  id: number,
  name: string,
  apikey: string
}
```

<div id='enpoint-7'/>

### `PATCH` /api/key/_{id}_

Actualiza el nombre de un API-KEY

#### URL Parameters

- `id`: Identificador unico del API-KEY - **Type**: _String_

#### Request Body

- **name**: Correo del usuario

```typescript
{
  name: string;
}
```

#### Response

##### Response Body

```typescript
{
  id: number,
  name: string
}
```

<div id='enpoint-8'/>

### `GET` /api/corporative/groups

Obtiene todos los grupos corporativos registrados en el sistema

#### Response

##### Response Body

```typescript
{
    groups: {
        id: number,
        name: string,
        companies: {
            id: number,
            ruc: string,
            nmae: string,
            address: string,
            phone: string,
            branches: {
                id: number,
                name: string,
                city: {
                  id: number,
                  name: string
                }
              }[]
          }[]
    }[]
}
```

<div id='enpoint-9'/>

### `POST` /api/logs

Look for log information by the given values

#### Request Body

- **level**: Nivel de severidad `OPCIONAL`
- **from**: Rango de fecha inicial `OPCIONAL`
- **to**: Rango de fecha final `OPCIONAL`

```typescript
{
  level?: string,
  from?: Date,
  to?: Date
}
```

#### Response

##### Response Body

```typescript
{
  logs: [
    {
      level: string,
      message: string,
      timestamp: Date,
    },
  ];
}
```

<div id='enpoint-10'/>

### `GET` /api/logs/level

Obtiene los niveles de severidad de los logs existentes en el sistema

#### Response

##### Response Body

```typescript
{
  levels: {
    level: string;
  }
  [];
}
```

<div id='enpoint-11'/>

### `GET` /api/doctors

Obtiene todos los doctores registrados en el sistema

#### Response

##### Response Body

```typescript
{
    doctors: {
        id: number,
        user: {
            id: number,
            dni: string,
            email: string,
            name: string,
            lastname: string,
            hasCredential: boolean
        }
    }[]
}
```

<div id='enpoint-12'/>

### `POST` /api/doctors/signature/_{id}_

Carga una imagen al servidor y lo asocia a un medico

#### URL Parameters

- `id`: Identificador unico del medico - **Type**: _String_

#### Request Body

- **Singture**: Imagen en formato png

| Subject   | Type            | Mandatory |
| --------- | --------------- | --------- |
| signature | string($binary) | false     |

#### Response

##### Response Body

```typescript

```

<div id='enpoint-13'/>

### `GET` /api/patients

Obtiene todos los pacientes registrados en el sistema

#### Response

##### Response Body

```typescript
{
    patients: {
        id: number,
        user: {
            id: number,
            dni: string,
            name: string,
            lastname: string
        }
    }[]
}
```

<div id='enpoint-14'/>

### `GET` /api/patients/look/company

Obtiene todos los pacientes registrados en el sistema que coincidan con la empresa del usuario que ha ingresado

#### Response

##### Response Body

```typescript
{
    patients: {
        id: number,
        user: {
            id: number,
            dni: string,
            name: string,
            lastname: string
        }
    }[]
}
```

<div id='enpoint-15'/>

### `GET` /api/users

Obtiene todos los usuarios registrados en el sistema

#### Response

##### Response Body

```typescript
{
    users: {
        id: number,
        dni: string,
        name: string,
        email: string,
        lastname: string
    }[]
}
```

<div id='enpoint-16'/>

### `POST` /api/users

Registra un usuario haciendo uso de los datos proporcionados por el usuario

#### Request Body

- **name**: Nombre del usuario
- **lastname**: Apellido del usuario
- **email**: Correo electronico
- **dni**: DNI, este debe ser unico
- **email**: Correo electronico, este debe ser unico
- **password**: Contraseña
- **resources**: Arreglo de identificadores unicos pertenecientes a los recursos del sistema
- **logo**: Indetificador unico del logo

```typescript
{
    name: string,
    lastname: string,
    email: string,
    dni: string,
    email: string,
    password: string,
    resources: number[],
    logo: number
}
```

#### Response

##### Response Body

```typescript
{
    id: number,
    dni: string,
    email: string,
    name: string,
    lastname: string
}
```

<div id='enpoint-17'/>

### `PATCH` /api/users/_{id}_

Actualiza la informacion del usuario

#### URL Parameters

- `id`: Identificador unico del usuario - **Type**: _String_

#### Request Body

- **name**: Nombre del usuario
- **lastname**: Apellido del usuario
- **email**: Correo electronico

```typescript
{
    name: string,
    lastname: string,
    email: string
}
```

#### Response

##### Response Body

```typescript
{
    id: number,
    dni: string,
    email: string,
    name: string,
    lastname: string
}
```

<div id='enpoint-18'/>

### `DELETE` /api/users/_{id}_

Elimina a un usuario

#### URL Parameters

- `id`: Identificador unico del usuario - **Type**: _String_

#### Response

##### Response Body

```typescript

```

<div id='enpoint-19'/>

### `GET` /api/users/attribute/doctor/of/_{id}_

Obtiene el atributo `doctor_of` del usuario

#### URL Parameters

- `id`: Identificador unico del usuario - **Type**: _String_

#### Response

##### Response Body

```typescript
{
    id: number,
    name: string,
    value: string
}
```

<div id='enpoint-20'/>

### `PATCH` /api/users/attribute/doctor/of/_{id}_

Actualiza el atributo `doctor_of` del usuario

#### URL Parameters

- `id`: Identificador unico del usuario - **Type**: _String_

#### Request Body

- **value**: Valor del atributo `doctor_of`

```typescript
{
  value: string;
}
```

#### Response

##### Response Body

```typescript

```

<div id='enpoint-21'/>

### `GET` /api/users/attribute/employee/_{id}_

Obtiene el atributo `employee_of` del usuario

#### URL Parameters

- `id`: Identificador unico del usuario - **Type**: _String_

#### Response

##### Response Body

```typescript
{
    id: number,
    name: string,
    value: string
}
```

<div id='enpoint-22'/>

### `PATCH` /api/users/attribute/employee/_{id}_

Actualiza el atributo `employee_of` del usuario

#### URL Parameters

- `id`: Identificador unico del usuario - **Type**: _String_

#### Request Body

- **value**: Valor del atributo `employee_of`

```typescript
{
  value: string;
}
```

#### Response

##### Response Body

```typescript

```

<div id='enpoint-23'/>

### `GET` /api/users/attribute/look/for/comapany/_{id}_

Obtiene el atributo `look_for_company` del usuario

#### URL Parameters

- `id`: Identificador unico del usuario - **Type**: _String_

#### Response

##### Response Body

```typescript
{
    id: number,
    name: string,
    value: string
}
```

<div id='enpoint-24'/>

### `PATCH` /api/users/attribute/look/for/comapany/_{id}_

Actualiza el atributo `look_for_company` del usuario

#### URL Parameters

- `id`: Identificador unico del usuario - **Type**: _String_

#### Request Body

- **value**: Valor del atributo `look_for_company`

```typescript
{
  value: string;
}
```

#### Response

##### Response Body

```typescript

```

<div id='enpoint-25'/>

### `POST` /api/diseases

Permite la creacion de morbilidades

#### Request Body

- **name**: Nombre de la morbilidad
- **group**: Identificador unico del grupo de morbilidad

```typescript
{
    name: string,
    group: number
}
```

#### Response

##### Response Body

```typescript
{
    id: number,
    name: string
}
```

<div id='enpoint-26'/>

### `PATCH` /api/diseases/_{id}_

Actualiza una morbilidad

#### URL Parameters

- `id`: Identificador unico de la morbilidad - **Type**: _String_

#### Request Body

- **value**: Valor del atributo `look_for_company`

```typescript
{
    name: string,
    group: number
}
```

#### Response

##### Response Body

```typescript
{
    id: number,
    name: string
}
```

<div id='enpoint-27'/>

### `DELETE` /api/diseases/_{id}_

Elimina una morbilidad

#### URL Parameters

- `id`: Identificador unico de la morbilidad - **Type**: _String_

#### Response

##### Response Body

```typescript

```

<div id='enpoint-28'/>

### `GET` /api/diseases/groups

Obtiene los grupos de morbilidades registrados en el sistema

#### Response

##### Response Body

```typescript
{
    id: number,
    name: string,
    diseases: {
        id: number,
        name: string
    }[]
}
```

<div id='enpoint-29'/>

### `POST` /api/diseases/groups

Crea un grupo de morbilidades

#### Request Body

- **name**: Nombre del grupo de morbilidades

```typescript
{
  name: string;
}
```

#### Response

##### Response Body

```typescript
{
    id: number,
    name: string,
    diseases: {
        id: number,
        name: string
    }[]
}
```

<div id='enpoint-30'/>

### `PATCH` /api/diseases/groups/_{id}_

Actualiza un grupo de morbilidades

#### URL Parameters

- `id`: Identificador unico del grupo de morbilidades
  - **Type**: _String_

#### Request Body

- **name**: Nombre del grupo de morbilidades

```typescript
{
  name: string;
}
```

#### Response

##### Response Body

```typescript

```

<div id='enpoint-31'/>

### `DELETE` /api/diseases/groups/_{id}_

Elimina un grupo de morbilidades si este no tiene ninguna morbilidad asignada

#### URL Parameters

- `id`: Identificador unico del grupo de morbilidades
  - **Type**: _String_

#### Response

##### Response Body

```typescript

```

<div id='enpoint-32'/>

### `GET` /api/medical/client/_{dni}_/email

Obtiene todos los correos asociados a un cliente sando su `dni`

#### URL Parameters

- `dni`: Dni del paciente
  - **Type**: _String_

#### Response

##### Response Body

```typescript
{
    email: {
        id: number,
        email: string,
        default: boolean
    }[]
}
```

<div id='enpoint-33'/>

### `POST` /api/medical/client/_{dni}_/email

Crea y asocia un correo a un cliente medico

#### URL Parameters

- `dni`: Dni del paciente
  - **Type**: _String_

#### Request Body

- **email**: Correo electronico del paciente

```typescript
{
  email: string;
}
```

#### Response

##### Response Body

```typescript
{
    email: {
        id: number,
        email: string,
        default: boolean
    }[]
}
```

<div id='enpoint-34'/>

### `PATCH` /api/medical/client/_{dni}_/email/_{id}_

Coloca por defecto a un correo seleccionado

#### URL Parameters

- `dni`: Dni del paciente
  - **Type**: _String_
- `id`: Identificador unico del correo electronico
  - **Type**: _String_

#### Response

##### Response Body

```typescript
{
    email:{
        id: number,
        email: string,
        default: boolean
    } []
}
```

<div id='enpoint-35'/>

### `DELETE` /api/medical/client/email/_{id}_

Elimina un correo seleccionado

#### URL Parameters

- `id`: Identificador unico del correo electronico
  - **Type**: _String_

#### Response

##### Response Body

```typescript

```

<div id='enpoint-36'/>

### `GET` /api/medical/orders/files/_{id}_

Elimina un correo seleccionado

#### URL Parameters

- `id`: Identificador unico de la orden medica
  - **Type**: _Number_

#### Response

##### Response Body

```typescript
{
    dni: string,
    fullname: string,
    email: string,
    fileResults: {
        id: number,
        examName: string,
        type: string
    }[],
    fileReports: {
        id: number,
        examName: string,
        type: string
    }[]
}
```

<div id='enpoint-37'/>

### `GET` /api/medical/orders/mail/_{order}_/_{mail}_

Envia un correo electronico a la direccion email seleccionada

#### URL Parameters

- `order`: Identificador unico de la orden medica
  - **Type**: _Number_
- `mail`: Identificador unico del correo electronico
  - **Type**: _Number_

#### Response

##### Response Body

```typescript

```

<div id='enpoint-38'/>

### `GET` /api/medical/orders/patient/_{dni}_

Obtiene todas las ordenes asociadas a un paciente usando su `dni`

#### URL Parameters

- `dni`: Dni perteneciente a un paciente
  - **Type**: _String_

#### Response

##### Response Body

```typescript
{
    orders: {
        id: number,
        process: string,
        createAt: Date,
        mailStatus: boolean,
        orderStatus: "created" | "verified",
        results: {
            id: number,
            examName: string,
            diseaseId: number,
            diseaseName: string,
            diseaseGroupId: number,
            diseaseGroupName: string,
            hasFile: boolean,
            report: {
                id: number,
                content: string
            } | null
        }[],
        client: {
            dni: string,
            fullname: string,
            email: {
                id: number,
                email: string,
                default: boolean;
            }[]
        }
    }[]
}
```

<div id='enpoint-39'/>

### `GET` /api/medical/reports/recreate/pdf

Recrea todos los reportes existentes en la base de datos

#### Response

##### Response Body

```typescript

```

<div id='enpoint-40'/>

### `POST` /api/medical/reports/recreate/pdf

Recrea todos los reportes existentes asociados a un paciente

#### Request Body

- **dni**: Dni perteneciente a un paciente

```typescript
{
  dni: string;
}
```

#### Response

##### Response Body

```typescript

```

<div id='enpoint-41'/>

### `PATCH` /api/medical/results/diseases/_{id}_

Agrega mrbilidades al resultado

#### URL Parameters

- `id`: Identificador unico del resultado
  - **Type**: _String_

#### Request Body

- **diseaseId**: Identificador unico de la morbilidad
- **diseaseName**: Nombre de la morbilidad
- **diseaseGroupId**: Identificador unico del grupo de morbilidades
- **diseaseGroupName**: Nombre del grupo de la morbilidad

```typescript
{
    diseaseId: number,
    diseaseName: string,
    diseaseGroupId: number,
    diseaseGroupName: string
}
```

#### Response

##### Response Body

```typescript

```

<div id='enpoint-42'/>

### `GET` /api/medical/results/doctor

Obtiene los resultados asociados al medico que se encuentre usando el sistema

#### Response

##### Response Body

```typescript
{
    results: {
        id: number,
        examName: string,
        diseaseId: number,
        diseaseName: string,
        diseaseGroupId: number,
        diseaseGroupName: string,
        hasFile: boolean,
        report: {
            id: number,
            content: string
        } | null
    }[]
}
```

<div id='enpoint-43'/>

### `POST` /api/medical/results/file/_{id}_

Carga un archivo y lo asocia al resultado medico

#### URL Parameters

- `id`: Identificador unico del resultado medico
  - **Type**: _String_

#### Request Body

Archivo en formato pdf

#### Response

##### Response Body

```typescript

```

<div id='enpoint-44'/>

### `GET` /api/medical/file/_{type}_/_{id}_

Obtiene un archivo en base al tipo y al identificador unico especificado

#### URL Parameters

- `type`: Tipo del archivo `result` o `report`
  - **Type**: _String_
- `id`: Identificador unico
  - **Type**: _String_

#### Response

##### Response Body

Retorna un archivo en formato pdf

<div id='enpoint-45'/>

### `POST` /api/medical/file/multiple

Obtiene varios archivo en base al tipo y al identificador unico especificado, retornando un archivo zip

#### Request Body

- **files**:
  - **id**: Identificador unico del archivo
  - **type**: Tipo del archivo `result` o `report`

```typescript
{
  files: [
    {
      id: number,
      type: "report" | "result",
    },
  ];
}
```

#### Response

##### Response Body

Retorna un archivo en formato zip

<div id='enpoint-46'/>

### `PATCH` /api/medical/results/report

Crea un reporte medico y lo asocia a un resultado

#### URL Parameters

- `id`: Identificador unico del resultado
  - **Type**: _String_

#### Request Body

- **content**: Contenido del resporte medico en formato HTML

```typescript
{
  content: string;
}
```

#### Response

##### Response Body

```typescript
{
    id: number,
    examName: string,
    diseaseId: number,
    diseaseName: string,
    diseaseGroupId: number,
    diseaseGroupName: string,
    hasFile: boolean,
    report?: {
        id: number,
        content: string
    }
}
```

<div id='enpoint-47'/>

### `GET` /api/selector/disease/group

Obtiene los grupos de morbilidades a modo de valores para selectores

#### Response

##### Response Body

```typescript
{
    options: {
        key: number,
        label: string
    }[]
}
```

<div id='enpoint-48'/>

### `GET` /api/selector/disease/_{group}_

Obtiene las morbilidades de un grupo de morbilidades a modo de valores para selectores

#### URL Parameters

- `group`: Identificador unico del grupo de morbilidades
  - **Type**: _String_

#### Response

##### Response Body

```typescript
{
    options: {
        key: number,
        label: string
    }[]
}
```

<div id='enpoint-49'/>

### `GET` /api/selector/exam

Obtiene los examenes medicos a modo de valores para selectores

#### Response

##### Response Body

```typescript
{
    options: {
        key: number,
        label: string
    }[]
}
```

<div id='enpoint-50'/>

### `GET` /api/selector/location/branches/_{company}_

Obtiene las sucursales en base a la compania a modo de valores para selectores

#### URL Parameters

- `company`: Identificador unico de la compania
  - **Type**: _String_

#### Response

##### Response Body

```typescript
{
    options: {
        key: number,
        label: string
    }[]
}
```

<div id='enpoint-51'/>

### `GET` /api/selector/location/cities

Obtiene ciudades a modo de valores para selectores

#### Response

##### Response Body

```typescript
{
    options: {
        key: number,
        label: string
    }[]
}
```

<div id='enpoint-52'/>

### `GET` /api/selector/location/companies/_{group}_

Obtiene las empresas en base al group corporativo a modo de valores para selectores

#### URL Parameters

- `group`: Identificador unico del grupo corporativo
  - **Type**: _String_

#### Response

##### Response Body

```typescript
{
    options: {
        key: number,
        label: string
    }[]
}
```

<div id='enpoint-53'/>

### `GET` /api/selector/location/corporative/groups

Obtiene los grupos corporativos a modo de valores para selectores

#### Response

##### Response Body

```typescript
{
    options: {
        key: number,
        label: string
    }[]
}
```

<div id='enpoint-54'/>

### `PATCH` /api/web/clients/logos/_{user}_

Asocia un logo a un cliente web

#### URL Parameters

- `user`: Identificador unico de un usuario
  - **Type**: _String_

#### Request Body

- **logo**: Identificador unico del logo

```typescript
{
  logo: number;
}
```

#### Response

##### Response Body

```typescript

```

<div id='enpoint-55'/>

### `GET` /api/web/clients/resources/_{user}_

Obtiene todos los recursos asociados a un cliente web

#### URL Parameters

- `user`: Identificador unico de un usuario
  - **Type**: _String_

#### Response

##### Response Body

```typescript
{
  resources: {
    id: number,
    label: string
  }[]
}
```

<div id='enpoint-56'/>

### `PATCH` /api/web/clients/resources/_{user}_

Asocia varios recursos a un cliente web

#### URL Parameters

- `user`: Identificador unico de un usuario
  - **Type**: _String_

#### Request Body

- **resources**: Arreglo de identficadores unicos de recursos web

```typescript
{
  resources: number[]
}
```

#### Response

##### Response Body

```typescript

```

<div id='enpoint-57'/>

### `GET` /api/web/resources

Obtiene todos los recursos registrados en el sistema

#### Response

##### Response Body

```typescript
{
  resources: {
    id: number,
    label: string
  }[]
}
```

<div id='enpoint-58'/>

### `POST` /api/web/resources

Crea recursos web

#### Request Body

- **name**: Nombre del recurso web `UNICO`
- **label**: Etiqueta del recurso web
- **address**: Direccion del recurso web
- **icon**: Icono del registro web

```typescript
{
    name: string,
    label: string,
    address: string,
    icon: string
}
```

#### Response

##### Response Body

```typescript
{
    id: number,
    name: string,
    label: string,
    address: string,
    icon: string,
    status: boolean,
}

```

<div id='enpoint-59'/>

### `PATCH` /api/web/resources/_{id}_

Actualiza un recurso web usando el identificador unico del recurso web

#### URL Parameters

- `id`: Identificador unico de un recurso web
  - **Type**: _String_

#### Request Body

- **name**: Nombre del recurso web `UNICO`
- **label**: Etiqueta del recurso web
- **address**: Direccion del recurso web
- **icon**: Icono del registro web

```typescript
{
    name: string,
    label: string,
    address: string,
    icon: string
}
```

#### Response

##### Response Body

```typescript
{
    id: number,
    name: string,
    label: string,
    address: string,
    icon: string,
    status: boolean
}
```

<div id='enpoint-60'/>

### `DELETE` /api/web/resources/_{id}_

Elimina un recurso web usando el identificador unico del recurso

#### URL Parameters

- `id`: Identificador unico de un recurso web
  - **Type**: _String_

#### Response

##### Response Body

```typescript

```

<div id='enpoint-61'/>

### `GET` /api/web/resources/all

Obtiene todos los recursos web registrados en el sistema

#### Response

##### Response Body

```typescript
{
    resources: {
        id: number,
        name: string,
        label: string,
        address: string,
        icon: string,
        status: boolean
    }[]
}
```

<div id='enpoint-62'/>

### `GET` /api/management

Obtiene todos las gerencias registradas en el sistema

#### Response

##### Response Body

```typescript
{
  managements: {
    id: number;
    name: string;
    areas: {
      id: number;
      name: string;
    }
    [];
  }
  [];
}
```

<div id="enpoint-63" />

### `POST` /api/management

Crea una gerencia

#### Request Body

- **name**: Nombre de la gerencia

```typescript
{
  name: string;
}
```

#### Response

##### Response Body

```typescript
{
  id: number;
  name: string;
}
```

<div id="enpoint-64" />

### `PATCH` /api/management/_{id}_

Modifica una gerencia dado un identificador unico

#### URL Parameters

- `id`: Identificador unico de una gerencia
  - **Type**: _String_

#### Request Body

- **name**: Nombre de la gerencia

```typescript
{
  name: string;
}
```

#### Response

##### Response Body

```typescript
{
  id: number;
  name: string;
}
```

<div id="enpoint-65" />

### `DELETE` /api/management/_{id}_

Elimina una gerencia usando el identificador unico

#### URL Parameters

- `id`: Identificador unico de una gerencia
  - **Type**: _String_

#### Response

##### Response Body

```typescript

```

<div id="enpoint-66" />

### `GET` /api/area

Obtiene todos las areas registradas en el sistema

#### Response

##### Response Body

```typescript
{
  areas: {
    id: number;
    name: string;
  }
  [];
}
```

<div id="enpoint-67" />

### `POST` /api/area

Crea un area

#### Request Body

- **name**: Nombre del area

```typescript
{
  name: string;
}
```

#### Response

##### Response Body

```typescript
{
  id: number;
  name: string;
}
```

<div id="enpoint-68" />

### `PATCH` /api/area/_{id}_

Modifica un area dado un identificador unico

#### URL Parameters

- `id`: Identificador unico de un area
  - **Type**: _String_

#### Request Body

- **name**: Nombre de la area

```typescript
{
  name: string;
}
```

#### Response

##### Response Body

```typescript
{
  id: number;
  name: string;
}
```

<div id="enpoint-69" />

### `DELETE` /api/area/_{id}_

Elimina un area usando el identificador unico

#### URL Parameters

- `id`: Identificador unico de un area
  - **Type**: _String_

#### Response

##### Response Body

```typescript

```

<div id="enpoint-70" />

### `POST` /api/medical/orders/company

Obtiene las empresas que se asocian con un ruc dado

#### Request Body

- **ruc**: Ruc de la empresa

```typescript
{
  ruc: string;
}
```

#### Response

##### Response Body

```typescript
{
    orders: {
        id: number,
        process: string,
        createAt: Date,
        mailStatus: boolean,
        orderStatus: "created" | "verified",
        results: {
            id: number,
            examName: string,
            diseaseId: number,
            diseaseName: string,
            diseaseGroupId: number,
            diseaseGroupName: string,
            hasFile: boolean,
            report: {
                id: number,
                content: string
            } | null
        }[],
        client: {
            dni: string,
            fullname: string,
            email: {
                id: number,
                email: string,
                default: boolean;
            }[]
        }
    }[]
}
```

<div id='enpoint-71'/>

### `PATCH` /api/medical/orders/order/_{id}_/status/validate

Cambia el estado de la orden a validado

#### URL Parameters

- `id`: Identificador unico de una orden medica
  - **Type**: _String_

#### Response

##### Response Body

```typescript
{
    orders: {
        id: number,
        process: string,
        createAt: Date,
        mailStatus: boolean,
        orderStatus: "created" | "verified",
        results: {
            id: number,
            examName: string,
            diseaseId: number,
            diseaseName: string,
            diseaseGroupId: number,
            diseaseGroupName: string,
            hasFile: boolean,
            report: {
                id: number,
                content: string
            } | null
        }[],
        client: {
            dni: string,
            fullname: string,
            email: {
                id: number,
                email: string,
                default: boolean;
            }[]
        }
    }[]
}
```

<div id="enpoint-72" />

### `GET` /api/medical/client/_{dni}_/management/area

Obtiene todos las areas registradas en el sistema

#### URL Parameters

- `dni`: DNI del paciente
  - **Type**: _String_

#### Response

##### Response Body

```typescript
{
  managementId: number;
  managementName: string;
  areaId: number;
  areaName: string;
}
```

<div id="enpoint-73" />

### `POST` /api/medical/client/_{dni}_/management/area

Obtiene todos las areas registradas en el sistema

#### URL Parameters

- `dni`: DNI del paciente
  - **Type**: _String_

#### Request Body

- **managementId**: Identificador unico de la gerencia
- **areaId**: Identificador unico del area

```typescript
{
  managementId: number;
  managementName: string;
  areaId: number;
  areaName: string;
}
```

#### Response

##### Response Body

```typescript
{
  managementId: number;
  managementName: string;
  areaId: number;
  areaName: string;
}
```

<div id="enpoint-74" />

### `DELETE` /api/medical/client/_{dni}_/management/area

Obtiene todos las areas registradas en el sistema

#### URL Parameters

- `dni`: DNI del paciente
  - **Type**: _String_

#### Response

##### Response Body

```typescript

```

<div id='components'/>

## Documentacion de Componentes

<div id='component-1' />

### ApiKeyFormCreateProps

**Description:** Un formulario reusable para la creacion de API-KEY.

**Props:**

- `onFormSubmittion`: Funcion que es llamada cuando el formulario se envia.

<div id='component-2' />

### AuthenticationFormPassword

**Description:** Provee un formulario para las credenciales del usuario.

**Props:**

- `onSubmit`: Funcion que es llamada cuando el formulario se envia.
- `data`: Datos usados para llenar el formulario cuando es montado `OPTIONAL`

<div id='component-3' />

### ButtonResponsive

**Description:** Boton con la capacidad de cambiar en base al tamaño de la pantalla

**Props:**

- `label`: Etiqueta para el boton.
- `onClick`: Funcion que es llamada cuando se hace un click.
- `icon`: Icono para el boton `OPTIONAL`
- `iconProps`: Props para el icono `OPTIONAL`

<div id='component-4' />

### CommandsMedicalReportGenerateAllPdf

**Description:** Componente que funge de un comando para generar todos los reportes medicos

<div id='component-5' />

### CommandsMedicalReportGeneratePdfByDni

**Description:** Componente que funge de un comando para generar todos los reportes medicos dado un dni

<div id='component-6' />

### DeveloperCommands

**Description:** Listado de paginas que encapsula elementos de tipo Comando

<div id='component-7' />

### DeveloperLog

**Description:** Componente que construye un log de forma visual

**Props:**

- `log`: Log del sistema.

<div id='component-8' />

### DeveloperLogs

**Description:** Componente obtiene y renderiza todos los lods del sistema

<div id='component-9' />

### DevloperLogButtons

**Description:** Componente renderiza botones para la seleccion de diferentes niveles de severidad del log

**Props:**

- `onClick`: Funcion que es llamada cuando se realiza un click.

<div id='component-10' />

### DeveloperPagesActionMenu

**Description:** Componente menu que efectua ciertos eventos para la gestion de las diferentes paginas del sistema

**Props:**

- `resource`: Identificador unico del recurso web.
- `onModification`: Funcion que es llamada cuando se realiza un click a la opcion de modificacion.
- `onDelete`: Funcion que es llamada cuando se realiza un click a la opcion de eliminacion.

<div id='component-11' />

### DeveloperPageForm

**Description:** Formulario reusable para la creacion o modificacion de un recurso web

**Props:**

- `data`: Datos para ser precargados cuando el componente es montado.
- `onFormSubmittion`: Funcion que es llamada cuando se envia el formulario.

<div id='component-12' />

### DeveloperPageFormCreate

**Description:** Formulario reusable para la creacion de un recurso web, implementa `DeveloperPageForm`

**Props:**

- `onClose`: Funcion que es llamada cuando se llama al cierre del fomulario.
- `onFormSubmittion`: Funcion que es llamada cuando se envia el formulario.

<div id='component-13' />

### DeveloperPageFormCreate

**Description:** Formulario reusable para la actualizacion de un recurso web, implementa `DeveloperPageForm`

**Props:**

- `resource`: Es el recurso web que debera ser modificado.
- `onClose`: Funcion que es llamada cuando se llama al cierre del fomulario.
- `onFormSubmittion`: Funcion que es llamada cuando se envia el formulario.

<div id='component-14' />

### DeveloperPages

**Description:** Componente que encapsula todas las paginas/modulos/secciones enfocadas unicamente al desarrollador

<div id='component-15' />

### DiseaseActionMenu

**Description:** Boton que abre un menu contextual el cual provee de metodos para la gestion de las morbilidades

**Props:**

- `onGroupModification`: Funcion que es llamada cuando se solicita el cambio de grupo de la morbilidad.
- `onModification`: Funcion que es llamada cuando se solicita la modificacion de la morbilidad.
- `onDelete`: Funcion que es llamada cuando se solicita la eliminacion de una morbilidad.

<div id='component-16' />

### DiseaseForm

**Description:** Formulario reusable para la creacion o modificacion de morbilidades

**Props:**

- `formData`: Valores para la iniciacion por defecto del formulario.
- `onFormSubmittion`: Funcion que es llamada cuando se envia el formulario.

<div id='component-17' />

### DiseaseFormCreate

**Description:** Formulario reusable para la creacion de morbilidades, implementa `DiseaseForm`

**Props:**

- `group`: Identificador unico de un grupo de morbilidades
- `onClose`: Funcion que es llamada cuando se llama al cierre del fomulario.
- `onFormSubmitted`: Funcion que es llamada cuando se envia el formulario.

<div id='component-18' />

### DiseaseFormUpdate

**Description:** Formulario reusable para la actualizacion de morbilidades, implementa `DiseaseForm`

**Props:**

- `disease`: Valores por defecto de la morbilidad a actualizar
- `group`: Identificador unico de un grupo de morbilidades
- `onClose`: Funcion que es llamada cuando se llama al cierre del fomulario.
- `onFormSubmitted`: Funcion que es llamada cuando se envia el formulario.

<div id='component-19' />

### DiseaseFormGroup

**Description:** Formulario reusable para la asignacion de de grupos de morbilidades a morbilidades

**Props:**

- `formData`: Valores para la iniciacion por defecto del formulario.
- `onFormSubmittion`: Funcion que es llamada cuando se envia el formulario.
- `options`: Valores que inicializan el selector del formulario.

<div id='component-21' />

### DiseaseFormUpdateGroup

**Description:** Formulario reusable para la re-asignacion de de grupos de morbilidades a morbilidades, implementa `DiseaseFormGroup`

**Props:**

- `disease`: Valores para la iniciacion por defecto del formulario.
- `group`: Grupo al que pertenece la morbilidad.
- `groups`: Grupos de morbilidades.
- `onFormSubmitted`: Funcion que es llamada cuando se envia el formulario.
- `onClose`: Funcion que es llamada cuando se llama al cierre del fomulario.

<div id='component-22' />

### DiseseGroupForm

**Description:** Formulario para la creacion o modificacion de un grupo de morbilidades

**Props:**

- `formData`: Valores para la iniciacion por defecto del formulario.
- `onFormSubmittion`: Funcion que es llamada cuando se envia el formulario.

<div id='component-23' />

### DiseaseGroupFormCreate

**Description:** Formulario para la creacion de un grupo de morbilidades, implementa `DiseseGroupForm`

**Props:**

- `onClose`: Funcion que es llamada cuando se llama al cierre del fomulario.
- `onFormSubmitted`: Funcion que es llamada cuando se envia el formulario.

<div id='component-24' />

### DiseaseGroupFormUpdate

**Description:** Formulario para la actualizacion de un grupo de morbilidades, implementa `DiseseGroupForm`

**Props:**

- `diseaseGroup`: Grupo de morbilidad para inicializar el formulario.
- `onClose`: Funcion que es llamada cuando se llama al cierre del fomulario.
- `onFormSubmitted`: Funcion que es llamada cuando se envia el formulario.

<div id='component-25' />

### DoctorActionMenu

**Description:** Menu que permite la gestion de medicos registrados del sistema

**Props:**

- `createCredential`: Variable que habilita la opcion de asignacion de credenciales.
- `onUploadSignature`: Funcion que es llamada cuando se llama al evento de carga de firma.
- `onAssignCompany`: Funcion que es llamada cuando se llama al evento de asignacion de empresa.
- `onCreateCredential`: Funcion que es llamada cuando se llama al evento de creacion de credenciales.

<div id='component-26' />

### DoctorFormCreateCredential

**Description:** Formuario reusable para la crecion de credenciales.

**Props:**

- `user`: Datos del usuario usados como base para a asignacion de credenciales.
- `onClose`: Funcion que es invocada cuando se llama al evento de cierre.
- `onFormSubmittion`: Funcion que es invocada cuando se envia el formulario.

<div id='component-27' />

### DoctorFormUploadSignature

**Description:** Formuario reusable para la carga de firmas.

**Props:**

- `doctor`: Identificador unico del medico.
- `onClose`: Funcion que es invocada cuando se llama al evento de cierre.
- `onFormSubmittion`: Funcion que es invocada cuando se envia el formulario.

<div id='component-28' />

### DownloadActionButton

**Description:** Boton que se encarga de descargar archivos en base al url especificado.

**Props:**

- `url`: Direccion URL donde se encuentra alojado el archivo.
- `filename`: Nombre que el archivo tendra al ser descargado.
- `onClick`: Funcion que es invocada cuando se realiza un click.

<div id='component-29' />

### OmegaDropzone

**Description:** Componente dropzone, simplifica el uso del dropzone de MantineUI.

**Props:**

- `labels`: Objeto que permite modificar las etiquetas del dropzone.

<div id='component-30' />

### Footer

**Description:** Componente que coloca en el pie de pagina una marca de agua

<div id='component-31' />

### Header

**Description:** Componente que coloca un encabezado.

**Props:**

- `text`: Texto que sera colocado en el encabezado.
- `children`: Componentes de React que pueden ser colocados al mismo nivel que el encabezado.

<div id='component-32' />

### InputSearch

**Description:** Cuadro de texto que implementa iconos y estilos.

<div id='component-33' />

### ListHeaderButton

**Description:** Boton que se situa al inicio del una lista permite la realizacion de ordenamiento.

**Props:**

- `label`: Texto de la etiqueta.
- `sort`: Variable que determina el evento de ordenamiento y el estado del mismo.

<div id='component-34' />

### ListLayout

**Description:** Layout que conforma el cuerpo de la lista.

**Props:**

- `data`: Arreglo de datos para ser renderizados.
- `loading`: Estado de carga.
- `columns`: Columnas que seran visualizadas en el encabezado.
- `height`: Altura del contenido.
- `size`: Numero de items que seran renderizados en cada pagina.
- `dock`: Elementos adicionales, se posicionaran a un lado del area de busqueda.
- `rows`: Funcion que es invocada al momento de renderizar cada fila, debe retornar un elemento react.

<div id='component-35' />

### ListRowElement

**Description:** Fila necesaria para renderizar la lista.

**Props:**

- `children`: Contenido interno de la fila.
- `active`: Estado de la fila.
- `leftSection`: Seccion izquierda que requiere un componente de react.
- `rightSection`: Seccion derecha que requiere un componente de react.
- `hover`: Estado que activa o desactiva el evento hover.
- `onClick`: Funcion que es invocada cuando se hace un click a la fila.

<div id='component-36' />

### MultipleTierLayout

**Description:** Componente que permite renderizar varias paginas.

**Props:**

- `elements`: Elementos que seran renderizados en cada subpagina.
- `tier`: Pagina actual activa.
- `onClose`: Funcion que es invocada cuando se llama al cierre de cada pagina.

<div id='component-37' />

### LayoutSubFormTitle

**Description:** Componente encabezado que se requiere para un formulario.

**Props:**

- `title`: Titulo del formulario.
- `onClose`: Funcion que es invocada cuando se llama al evento de cierre.

<div id='component-38' />

### TableLayout

**Description:** Componente que permite renderizar una tabla.

**Props:**

- `title`: Titulo de la tabla.
- `columns`: Columnas que seran renderizadas.
- `data`: Arreglo de datos para ser renderizados.
- `isLoading`: Estado de carga de la tabla.
- `action`: Elemento react de la columna de accion.
- `dock`: Elementos que se situan a un lado del buscador, solo se aceptan componentes de react.
- `size`: Tamaño de elementos que seran redenrizados por pagina.

<div id='component-39' />

### MedicalClientActionDefault

**Description:** Boton que define a un correo electronico como correo por defecto.

**Props:**

- `id`: Identificador unico del correo electronico.
- `dni`: DNI del cliente medico.
- `state`: Estado que identifica si el correo se encuentra por defecto o no.
- `onClick`: Funcion que es invocada cuando se realiza un click.
- `onComplete`: Funcion que es invocada cuando se completa la actualizacion del correo.

<div id='component-40' />

### MedicalClientActionDelete

**Description:** Boton que se encarga de la eliminacion de un correo.

**Props:**

- `id`: Identificador unico del correo electronico.
- `onClick`: Funcion que es invocada cuando se realiza un click.
- `onComplete`: Funcion que es invocada cuando se completa la actualizacion del correo.

<div id='component-41' />

### MedicalClientForm

**Description:** Formulario base para la creacion o modificacion de uno correo electronico.

**Props:**

- `dni`: DNI del cliente medico.
- `onValidate`: Funcion que es invocada antes de enviar el fomulario.
- `onFormSubmittion`: Funcion que es invocada cuando se completa el envio del formmulario.

<div id='component-42' />

### MedicalClientLayoutEmail

**Description:** Componente que carga una lista de correos electronicos.

**Props:**

- `patient`: Objeto que encapsula los datos del paciente.
- `onClose`: Funcion que es invocada se cierra el formulario.

<div id='component-43' />

### MedicalClientModalEmailSelection

**Description:** Componente de seleccion para enviar un correo electronico.

**Props:**

- `email`: Arreglo de correos electronicos.
- `onClose`: Funcion que es invocada se cierra el formulario.

<div id='component-44' />

### MedicalOrderActionMenu

**Description:** Menu para la gestion de ordenes medicas.

**Props:**

- `order`: Identificador unico de la orden medica.
- `email`: Arreglo de correos electronicos.
- `onMailSend`: Funcion que es invocada se envia el correo.

<div id='component-45' />

### MedicalReportForm

**Description:** Formulario para la creacion o modificacion de reportes medicos.

**Props:**

- `result`: Valores del reporte medico usados en la inicializacion del componente.
- `onClose`: Funcion que es invocada cuando se cierra el formulario.
- `onFormSubmittion`: Funcion que es invocada cuando se completa el envio del formulario.

<div id='component-46' />

### MedicalResultActionMenu

**Description:** Menu de gestion de resultados medicos.

**Props:**

- `data`: Valores del resultado medico usados en la inicializacion del componente.
- `downloadReport`: Estado que habilita la descarga de un reporte medico.
- `downloadResult`: Estado que habilita la descarga de un resultado medico.
- `onClick`: Funcion que es invocada cuando se realiza un click.
- `onDiseaseModification`: Funcion que es invocada cuando se llama al evento de asignacion de morbilidades.
- `onUploadResult`: Funcion que es invocada cuando se llama al evento de carga de resultado medico.
- `onCreateReport`: Funcion que es invocada cuando se llama al evento de creacion de reporte medico.

<div id='component-47' />

### MedicalResultButtonMenuItem

**Description:** Item de menu enfocado en la descarga de resultados.

**Props:**

- `type`: Tipo del elemento que sera descargado.
- `file`: Identificador unico del archivo.
- `label`: Etiqueta del boton de descarga.
- `fileName`: Nombre del archivo a descargar.
- `icon`: Icono que sera colocado en el elemento del menu.
- `onStartDownload`: Funcion que es invocada cuando comienza la descarga del archivo.
- `onEndDownload`: Funcion que es invocada cuando finaliza la descarga del archivo.

<div id='component-48' />

### MedicalResultFormDisease

**Description:** Formulario para la asginacion de morbilidades al resultado medico.

**Props:**

- `medicalOrderExam`: Objeto de resultado medico que inicializa el formulario.
- `onFormSubmitted`: Funcion que es invocada cuando el formulario es enviado.

<div id='component-49' />

### MedicalResultFormUploadFile

**Description:** Formulario para la carga de resultados medicos.

**Props:**

- `medicalResult`: Identificador unico del resultado medico.
- `onClose`: Funcion que es invocada cuando se cierra el formulario.
- `onFormSubmittion`: Funcion que es invocada cuando el formulario es enviado.

<div id='component-50' />

### MenuItemSendMail

**Description:** Item del menu enfocado en el envio de correo electronico.

**Props:**

- `order`: Identificador unico de la orden medica.
- `email`: Correos disponibles del paciente
- `defaultMail`: Correo por defecto del paciente.
- `onSend`: Funcion que es invocada cuando se envia un correo electronico.
- `onError`: Funcion que es invocada cuando ocurre un error.
- `onComplete`: Funcion que es invocada cuando se completa el envio del correo electronico.

<div id='component-51' />

### ModalConfirmation

**Description:** Modal usada para hacer una confirmacion por parte del usuario.

**Props:**

- `title`: Titulo de la confirmacion.
- `message`: Mensaje de la confirmacion.
- `onConfirm`: Funcion que es invocada cuando se llama al evento de confirmacion.

<div id='component-52' />

### ModularBox

**Description:** Componente usado para encapsular otros componentes react.

<div id='component-53' />

### ModularLayout

**Description:** Componente usado para encapsular `ModularBox`.

<div id='component-54' />

### NavLink

**Description:** Link para de la barra de navagacion.

**Props:**

- `opened`: Estado que indica que el boton debe encontrarse abierta.
- `link`: Direccion a la que se tiene que mover.
- `active`: Estado que indica si el boton esta habilitado o no.

<div id='component-55' />

### NavLogo

**Description:** Logo de la barra de navegacion.

<div id='component-56' />

### Topbar

**Description:** Barra ubicada en la parte superior de la aplicacion.

**Props:**

- `burger`: Boton que permite abrir o cerrar el panel de navegacion.

<div id='component-57' />

### TopbarMenu

**Description:** Menu enfocado en la rapido gestion de la aplicacion.

<div id='component-58' />

### Navbar

**Description:** Panel de navegacion (sidebar).

**Props:**

- `opened`: Estado que indica que el panel debe encontrarse abierto o cerrado.
- `loading`: Estado que indica si se esta cargando el panel.
- `onClose`: Funcion que es invocada cuando se realiza un click en cualquier enlace del panel.

<div id='component-59' />

### NavIcon

**Description:** Iconos disponibles para usar en el panel de navegacion.

<div id='component-60' />

### PatientActionButton

**Description:** Menu enfocado en la gestion de pacientes medicos.

**Props:**

- `onAssignCompany`: Funcion que es invocada cuando se llama al evento de asignacion de empresas.
- `onEmail`: Funcion que es invocada cuando se llama al evento de asignacion de correos electronicos.

<div id='component-61' />

### OmegaTable

**Description:** Homologacion de los componentes de `Table` de MantineUI.

**Props:**

- `header`: Componentes de react que forman el encabezado de la tabla.
- `rows`: Arreglo de componentes de react que forman el cuerpo de la tabla.
- `total`: Total de items.
- `page`: Pagina actual.
- `loading`: Estado de carga.
- `onPageChange`: Funcion que es invocada cuando se llama al evento de cambio de pagina.

<div id='component-62' />

### OmegaTd

**Description:** Componente de filas que debe ser usado con `OmegaTable`.

<div id='component-63' />

### OmegaTh

**Description:** Componente de encabezado que debe ser usado con `OmegaTable`.

**Props:**

- `children`: Elementos internos del componente.
- `sort`: Objeto enfocado en el ordenamiento de las presentes filas.

<div id='component-64' />

### SortTh

**Description:** Componente de encabezado implementa `OmegaTh`, se enfoca en el ordenamiento de los datos.

**Props:**

- `children`: Elementos internos del componente.
- `reversed`: Indica la direccion del ordenamiento.
- `sorted`: Indica si la columna fue o no ordenada.
- `onSort`: Funcion que es invocada cuando se realiza un click a la columna.

<div id='component-65' />

### UserActionButton

**Description:** Menu para la gestion del usuario.

**Props:**

- `onChangePassword`: Funcion que es invocada cuando se llama al evento de cambio de contraseña.
- `onResourceChange`: Funcion que es invocada cuando se llama al evento de modificacion de recursos.
- `onLookForCompany`: Funcion que es invocada cuando se llama al evento de de asignacion de empresa.
- `onModification`: Funcion que es invocada cuando se llama al evento de modificacion de usuario.
- `onDelete`: Funcion que es invocada cuando se llama al evento de eliminacion de usuario.

<div id='component-66' />

### UserForm

**Description:** Formulario de creacion o modificacion de usuario.

**Props:**

- `data`: Objeto que inicializa el formulario.
- `disabledDni`: Estado que habilita el campo de ingreso del DNI.
- `disabledEmail`: Estado que habilita el campo de ingreso del correo electronico.
- `onSubmit`: Funcion que es invocada cuando es enviado el formulario.

<div id='component-67' />

### UserFormAssignCompany

**Description:** Formulario de asignacion de empresa.

**Props:**

- `value`: Valor que es usado para inicializar el formulario.
- `onFormSubmittion`: Funcion que es invocada cuando es enviado el formulario.

<div id='component-68' />

### UserFormAssignCompanyAttribute

**Description:** Formulario de asignacion de atributo variable.

**Props:**

- `url`: URL que se conecta al endpoint de asignacion de atributos.
- `onClose`: Funcion que es invocada cuando llama al evento de cierre del formulario.

<div id='component-69' />

### UserFormChangePassword

**Description:** Formulario de cambio de contraseña.

**Props:**

- `email`: Correo electronico necesario para la inicializacion del formulario.
- `onClose`: Funcion que es invocada cuando llama al evento de cierre del formulario.

<div id='component-70' />

### UserFormCreate

**Description:** Formulario de creacion de usuario, implementa `UserForm`

**Props:**

- `onClose`: Funcion que es invocada cuando llama al evento de cierre del formulario.
- `onFormSubmit`: Funcion que es invocada cuando se envia el formulario.

<div id='component-71' />

### UserFormLogo

**Description:** Formulario de asignacion de logo

**Props:**

- `onSubmit`: Funcion que es invocada cuando se envia el formulario.

<div id='component-72' />

### UserFormUpdate

**Description:** Formulario de creacion de usuario, implementa `UserForm`

**Props:**

- `user`: Objeto que inicializa el formulario de actualizacion del usuario.
- `onClose`: Funcion que es invocada cuando llama al evento de cierre del formulario.
- `onFormSubmit`: Funcion que es invocada cuando se envia el formulario.

<div id='component-73' />

### UserFormWebResource

**Description:** Formulario de asignacion de recursos web.

**Props:**

- `user`: Objeto que inicializa el formulario de actualizacion del usuario.
- `onClose`: Funcion que es invocada cuando llama al evento de cierre del formulario.

<div id='component-74' />

### WebResourceFormAssign

**Description:** Formulario base de asingacion de recursos web.

**Props:**

- `data`: Objeto que inicializa el formulario.
- `resources`: Arreglo de recursos web necesarios para la inicializacion del formulario.
- `onSubmit`: Funcion que es invocada cuando se envia el formulario.

<div id='hooks'/>

## Documentacion de Hooks

<div id="hook-1" />

### useAuth

**Description:** Hook usado en la administracion de inicio y cierre de sesion.

**Retorna:**

- `login`: Funcion que permite valida las credenciales y permite el acceso al sistema.
- `logout`: Funcion que se encarga de sacar del sistema al usuario.

<div id="hook-2" />

### useChunk

**Description:** Se encarga de la paginar un array.

**Parametros:**

- `initialValues`: Arreglo con el que inicializar el hook.
- `initialSize`: Numero de datos por pagina.

**Retorna:**

- `data`: Matriz de datos.
- `handlers`: Funciones para gestionar estados del hook.
- `values`: Estados del hook.

<div id="hook-3" />

### useFetch

**Description:** Se encarga de efectuar consultas y envio de peticiones atraves de estados.

**Parametros:**

- `url`: Direccion de la peticion.
- `method`: Metodo de la peticion.
- `options`: Informacion adicional para efectuar la peticion.

**Retorna:**

- `status`: Valor numerico del estado al realizarse la peticion.
- `body`: Cuerpo de la peticion.
- `request`: Coloca el cuerpo a la peticion.
- `reload`: Reenvia la peticion.
- `reset`: Restaura todos los estados del hook a sus valores iniciales.

<div id="hook-4" />

### useFilter

**Description:** Filtra los elementos de un arreglo dado.

**Parametros:**

- `initialValues`: Arreglo con los valores iniciales a filtrar.
- `filterKeys`: Attributos del objeto que sean filtrados.

**Retorna:**

- `data`: Matriz de datos.
- `handlers`: Funciones para gestionar estados del hook.
- `values`: Estados del hook.

<div id="hook-5" />

### useList

**Description:** Lista los elementos de un arreglo dado y proveer metodos para su correcta manipulacion.

**Parametros:**

- `initialValues`: Arreglo con los valores iniciales.

**Retorna:**

- `data`: Vector de datos.
- `handlers`: Funciones para gestionar estados del hook.

<div id="hook-6" />

### useLocalStorage

**Description:** Conecta a la aplicacion con el almacenamiento del navegador.

**Parametros:**

- `key`: Llave unica con la que encontrar los valores dentro del navegador.
- `defaultValue`: Valor inicial, no hay datos en el almacenmiento usa un valor por defecto.

**Retorna:**

- `data`: Valor almacenado.
- `handlers`: Funciones para gestionar estados del hook.

<div id="hook-7" />

### useMail

**Description:** Realiza el envio de correos electronicos en base a la conexion con un URL.

**Parametros:**

- `initialUrl`: Url a la que se debe realizar la peticion para enviar el correo.

**Retorna:**

- `url`: Url actual
- `setUrl`: Actualiza la Url
- `send`: Realiza el envio del correo

<div id="hook-8" />

### useSort

**Description:** Se encarga de ordenar los datos de un arreglo dado.

**Parametros:**

- `initialUrl`: Arreglo inicial con el que trabajar.

**Retorna:**

- `data`: Matriz de datos.
- `handlers`: Funciones para gestionar estados del hook.
- `values`: Estados del hook.

<div id='context'/>

## Documentacion de Contextos

<div id='context-1'/>

### ConfirmationContext

**Description:** Abre un modal que solicita aceptar o rechazar determinada accion. Al cerrarse devuelve un valor true si se ha seleccionado 'Aceptar' o false si se ha rechazado.

**Contexto:**

- `show`: Funcion que habilita el modal de confimacion, retorna una promesa que al resolverse entrega un bool basado en la decision del usuario

**Hook:**

- `useConfirmation`: Entrega una funcion para abrir el formulario de confirmacion dentro de un modal.
