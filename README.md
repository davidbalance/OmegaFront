# Omega Sistema de Reporteria Medica

## Introduccion

Aplicacion enfocada en el frontend del sistema. Permite la gestion de los datos de manera visual y simplificada para el usuario final.

## Tecnologias usadas

- Next.js
- React
- TypeScript
- MantineUi
- TipTap
- Joi
- Dayjs
- Docker

## Guia de instalacion

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

### Production

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

_Nota_: El presente codigo posee un workflow que automatiza el despliegue de la aplicacion haciendo uso de un docker-compose presente en el servidor.

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

## Environment Variables

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

## Documentacion de API

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

### `POST` /api/auth/logout

Permite al usuario eliminar datos de registro del servidor

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

### `DELETE` /api/users/_{id}_

Elimina a un usuario

#### URL Parameters

- `id`: Identificador unico del usuario - **Type**: _String_

#### Response

##### Response Body

```typescript

```

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

### `DELETE` /api/diseases/_{id}_

Elimina una morbilidad

#### URL Parameters

- `id`: Identificador unico de la morbilidad - **Type**: _String_

#### Response

##### Response Body

```typescript

```

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

### `DELETE` /api/diseases/groups/_{id}_

Elimina un grupo de morbilidades si este no tiene ninguna morbilidad asignada

#### URL Parameters

- `id`: Identificador unico del grupo de morbilidades
  - **Type**: _String_

#### Response

##### Response Body

```typescript

```

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

### `DELETE` /api/medical/client/email/_{id}_

Elimina un correo seleccionado

#### URL Parameters

- `id`: Identificador unico del correo electronico
  - **Type**: _String_

#### Response

##### Response Body

```typescript

```

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

### `GET` /api/medical/reports/recreate/pdf

Recrea todos los reportes existentes en la base de datos

#### Response

##### Response Body

```typescript

```

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

### `PATCH` /api/medical/results/_{id}_

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

### `GET` /api/medical/results/file/downloader/_{type}_/_{id}_

Obtiene un archivo en base al tipo y al identificador unico especificado

#### URL Parameters

- `type`: Tipo del archivo `result` o `report`
  - **Type**: _String_
- `id`: Identificador unico
  - **Type**: _String_

#### Response

##### Response Body

Retorna un archivo en formato pdf

### `POST` /api/medical/results/file/downloader/multiple

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

### `DELETE` /api/web/resources/_{id}_

Elimina un recurso web usando el identificador unico del recurso

#### URL Parameters

- `id`: Identificador unico de un recurso web
  - **Type**: _String_

#### Response

##### Response Body

```typescript

```

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

## Documentacion de Componentes

## Styling
