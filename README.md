### LUKY

Luky tiene el objetivo de ofrecer servicios de confianza, formalidad y calidad, en donde luky entra como 
una alternativa para encontrar servicios de calidad en base a las experiencias de los mismos clientes.


### Instalacion

# Instalación del Proyecto Node.js

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu sistema:

1. **Node.js**: Versión 20.15 LTS. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
2. **Base de Datos MySQL**: Asegúrate de tener una instancia de MySQL en funcionamiento. Puedes descargarlo desde [mysql.com](https://www.mysql.com/).

## Instalación

Sigue estos pasos para instalar y configurar el proyecto:

1. **Clona el repositorio del proyecto**:
    ```sh
    git clone <URL_del_repositorio>
    cd <nombre_del_proyecto>
    ```

2. **Instala las dependencias**:
    En la raíz del proyecto, ejecuta el siguiente comando:
    ```sh
    npm install
    ```

3. **Configura el archivo de entorno**:
    Copia el archivo de ejemplo `.env.example` a un nuevo archivo `.env`:
    ```sh
    copy .env.example .env   # En Windows
    cp .env.example .env     # En Unix/Linux/MacOS
    ```

4. **Edita el archivo `.env`**:
    Abre el archivo `.env` y configura las variables de entorno según tu configuración local. Especialmente, asegúrate de configurar las variables relacionadas con la base de datos MySQL:
    ```env
    DB_HOST=localhost
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_de_tu_base_de_datos
    ```

5. **Inicia la aplicación**:
    En la raíz del proyecto, ejecuta el siguiente comando para iniciar la aplicación:
    ```sh
    node app.js
    ```

## Notas adicionales

- Asegúrate de que el servidor MySQL esté en funcionamiento antes de iniciar la aplicación.
- Puedes revisar y actualizar cualquier otra configuración necesaria en el archivo `.env`.


### Autores

- **Parra Santizo Juan david** - Desarrollo principal del funcionamiento del proyecto e implementación de la Base de Datos.
- **Salinas Antonio Axel Leonardo** - Diseño y desarrollo de interfaz.
- **Palafox Mendez Dilan Esau** - Colaboración en el diseño de la arquitectura, pruebas y documentación.


### Reconocimientos

- **Premio al Mejor Proyecto en la feria de proyectos - LUKY 2023**
- **Agradecimientos a la Universidad Tecnologica de Puebla por su apoyo financiero**