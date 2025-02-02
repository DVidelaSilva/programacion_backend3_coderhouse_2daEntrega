# Primera Entrega - Backend3 - Coderhouse
### Diego Videla Silva

## Backend - Adopcion Mascotas

## Instructivo Levantar Proyecto

1. Clonar Proyecto desde repositorio
2. instalar dependencias
````
npm install
````
3. Llenar arcchivo **.env** en base a lo encontrado en **.env.template**
4. correr el proyecto con 
````
npm run dev
````


## Endpoint - Backend Adopcion Mascotas

### -> users

**POST**  -->  http://localhost:8080/users

endpoint que crea un usuario en BD 

- request: 
````
{
    "first_name": "Diego",
    "last_name": "Videla",
    "email": "diego2@mail.com",
    "password": "coder123"
}
````

- response:
````
{
    "status": "success",
    "message": "Usuario creado exitosamente",
    "data": {
        "first_name": "Diego",
        "last_name": "Videla",
        "email": "diego2@mail.com",
        "password": "$2b$10$CU4ZaRFrUZdRC66QcQEsNOHjdENWGZh0XNf1CUOxGOY4nSENBYDkO",
        "role": "user",
        "pets": [],
        "_id": "67689ef54941f8ce67445944",
        "__v": 0
    }
}
````


**GET**  -->  http://localhost:8080/users

endpoint que devuelve todos los usuarios en BD 

- response:
````
{
    "status": "success",
    "message": "Usuarios Encontrados exitosamente",
    "data": [
        {
            "_id": "67689ef54941f8ce67445944",
            "first_name": "Diego",
            "last_name": "Videla",
            "email": "diego2@mail.com",
            "password": "$2b$10$CU4ZaRFrUZdRC66QcQEsNOHjdENWGZh0XNf1CUOxGOY4nSENBYDkO",
            "role": "user",
            "pets": [],
            "__v": 0
        }
    ]
}
````



### -> pets 

**POST**  -->  http://localhost:8080/pets

endpoint que crea una mascota en BD 

- request: 
````
{
    "name": "antu",
    "type": "gato",
    "age_months": 3,
    "age_years": 0
}
````

- response:
````
{
    "status": "success",
    "message": "Pet creado exitosamente",
    "data": {
        "name": "antu",
        "type": "gato",
        "age_months": 3,
        "age_years": 0,
        "owner": false,
        "adopted": false,
        "_id": "67689f924941f8ce67445947",
        "__v": 0
    }
}
````


**GET**  -->  http://localhost:8080/pets

endpoint que devuelve todas las mascotas en BD 

- response:
````
{
    "status": "success",
    "message": "Pets Encontrados exitosamente",
    "data": [
        {
            "_id": "67689f924941f8ce67445947",
            "name": "antu",
            "type": "gato",
            "age_months": 3,
            "age_years": 0,
            "owner": false,
            "adopted": false,
            "__v": 0
        }
    ]
}
````



### -> mocking

**GET**  -->  http://localhost:8080/mockingusers

endpoint que crea 50 usuarios mock y los devuelve en el response

- response:
````
{
    "status": "success",
    "message": "Usuarios creados con Fake exitosamente",
    "data": [
        {
            "first_name": "Carlota",
            "last_name": "Treviño Almonte",
            "email": "Raquel.OrozcoBarragan@hotmail.com",
            "password": "MJSHLicHIQZDaEPPE2ZT25uroYXWbj7FItNgP5riqOzr5ql0ARtLZICcynyV",
            "role": "admin",
            "pets": [],
            "_id": "eb25b14a29b34a1f14bedecb",
            "__v": 0
        },
        {
            "first_name": "Ester",
            "last_name": "Quesada Osorio",
            "email": "Rosalia13@yahoo.com",
            "password": "HZp98CgcJMOLjqswk73FOepOsWX9VSyHLsHn1jnCLGesVICVE7Xo1BmF0pNp",
            "role": "user",
            "pets": [],
            "_id": "efc258b23b4bac249ebbaaaf",
            "__v": 0
        },
        .
        .
        .
        .
        .
        .
        {
            "first_name": "Tomás",
            "last_name": "Carrera Nazario",
            "email": "Norma.NegreteBarrera73@gmail.com",
            "password": "08Nt9JAHhYDMxo3iGDyGnhrJDf1ZKts8bbt09Ty8SlN6Ct8y3mWBY3bpWqiD",
            "role": "admin",
            "pets": [],
            "_id": "6e6c4ab70be2cc7adcf0d420",
            "__v": 0
        }
    ]
}
````

**GET**  -->  http://localhost:8080/mockingpets

endpoint que crea 50 mascotas mock y los devuelve en el response

- response:
````
{
    "status": "success",
    "message": "Pets creados con Fake exitosamente",
    "data": [
        {
            "name": "Stella",
            "type": "gato",
            "age_months": 2,
            "age_years": 10,
            "owner": "false",
            "adopted": "false",
            "_id": "a6bccda8ab2110fdac0bae18",
            "__v": 0
        },
        {
            "name": "Jax",
            "type": "gato",
            "age_months": 12,
            "age_years": 6,
            "owner": "false",
            "adopted": "false",
            "_id": "d7dfbcecb71dc83988e13ce8",
            "__v": 0
        },
        .
        .
        .
        .
        .
        .
        {
            "name": "Leo",
            "type": "gato",
            "age_months": 11,
            "age_years": 10,
            "owner": "false",
            "adopted": "false",
            "_id": "13fd0cde404d3a345db3b791",
            "__v": 0
        }
    ]
}
````


**POST**  -->  http://localhost:8080/generatedata

endpoint que crea usuarios y mascotas segun la cantidad especificada en request y persiste en BD

- request: 
````
{
    "users": 3,
    "pets": 2
}
````

- response:
````
{
    "status": "success",
    "message": "Data creada exitosamente"
}
````