# El otro lado del BLOG :memo:

Bienvenido al repositorio del backend de nuestra aplicación de Blog.
____________________________

## Requisitos Previos: :computer:

```
- Node.js y npm instalados en tu ordenador.
```
____________________________

## Configuración: :triangular_ruler:

1. Clona este repositorio en tu ordenador: :repeat_one: 

   git clone [https://github.com/cartrugs/blog-back-agosto.git](https://github.com/cartrugs/blog-back-agosto.git)
____________________________


## Instala las dependencias: :gear::arrow_heading_down:

```javascript
npm i
```
- express  
- dotenv
- mongoose
- express-validator
- bcrypt
- jsdoc
- jsonwebtoken
- cors 
- cookie-parser 

____________________________

## Poner en marcha la aplicación: :rocket:
```
npm start
```
____________________________


## Arranca el proyecto en modo desarrollo: :electric_plug: 
```javascript
npm run dev 
``` 
____________________________

## Recuerda: :thinking:
No olvides que para poder usar la API debes crear tu propio archivo .env en el que debes incluir: 

- PORT = Escoge_un_puerto
- URI_DB= Tu_URI_de_Base_de_Datos
- JWT_SECRET = Tu_Clave_Secreta

____________________________

## Endpoints: :arrow_right:
- Recoger todos los artículos
  - Método: GET
  - URL: http://localhost:3000/api/v1/blog
- Crear un nuevo artículo
  - Método: POST
  - URL: http://localhost:3000/api/v1/blog
- Editar un artículo existente
  - Método: PUT
  - URL: http://localhost:3000/api/v1/blog/AÑADIR_UN_ID
- Eliminar un artículo
  - Método: DELETE
  - URL: http://localhost:3000/api/v1/blog/AÑADIR_UN_ID
- Crear un nuevo usuario
  - Método: POST
  - URL: http://localhost:3000/api/v1/auth/register
- Iniciar sesión de usuario
  - Método: POST
  - URL: http://localhost:3000/api/v1/auth/login