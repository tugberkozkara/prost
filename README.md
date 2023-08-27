
<p align="center">
  <img src="./README-media/header.png" />
</p>

<h3 align="center">
  <a href="https://prost.rocks/">prost.rocks</a>
  </br>
  <a href="https://api.prost.rocks/">api.prost.rocks</a>
</h3>
</br>

## **Definition:**
A places-to-go app to share pubs, cafés etc.

## **Usage:**
Prost! aims to store good quality cafés and pubs. Apart from cafés and pubs, sharing any good quality place/activity is more than welcome.

Users can create their accounts and share places with name, category, location, tags and menu URL information. Tags and locations can be used for filtering.

## **Stack:**
**Backend:** Node.js, Express, MongoDB, AWS Lambda
</br>
**Frontend:** React, AWS S3
</br>
</br>
</br>
## Backend/API Usage:

### Register |  POST - `/auth/register`
`https://api.prost.rocks/auth/register`

Example request body:
```
{
    "email": "eleanor@example.com",
    "username": "eleanorrigby",
    "password": "picks up the rice"
}
```
Example success response: 201 Created
```
{
    "message": "Register Successful!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsZWFub3JyaWdieSIsImlhdCI6MTY3NTIwMTk1MSwiZXhwIjoxNjc1MjA5MTUxfQ.TJAP4Zi8zI7XcPjXIiw6yCK4mpwlh5752GVIje5UpQI"
}
```
Example fail response: 400 Bad Request
```
{
    "message": "User already exists!"
}
```

### Login |  POST - `/auth/login`
`https://api.prost.rocks/auth/login`

Example request body:
```
{
    "username": "eleanorrigby",
    "password": "picks up the rice"
}
```
Example success response: 200 OK
```
{
    "message": "Login Successful!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsZWFub3JyaWdieSIsInBhc3N3b3JkIjoiJDJiJDEwJDMwLmJ1Rk9nLzRtOUdhZjExdkNZcS5UQkthaGN1bDJBWllKRi45Ny9aanNMVmhHVUZCdWVtIiwiaWF0IjoxNjc1MjAyMjkwLCJleHAiOjE2NzUyMDk0OTB9.lHp4buGoAXkTD9shyi1ICQ6hApFFsVyxNLq-136qulY"
}
```
Example fail response: 401 Unauthorized
```
{
    "message": "Username or password is incorrect!"
}
```

### All Users |  GET - `/auth/users`
`https://api.prost.rocks/auth/register`

Example request header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsZWFub3JyaWdieSIsInBhc3N3b3JkIjoiJDJiJDEwJDMwLmJ1Rk9nLzRtOUdhZjExdkNZcS5UQkthaGN1bDJBWllKRi45Ny9aanNMVmhHVUZCdWVtIiwiaWF0IjoxNjc1MjAyMjkwLCJleHAiOjE2NzUyMDk0OTB9.lHp4buGoAXkTD9shyi1ICQ6hApFFsVyxNLq-136qulY
```
Example success response: 200 OK
```
[
    {
        "_id": "63d98d9f8ba1be4b0dd7abc5",
        "email": "eleanor@example.com",
        "username": "eleanorrigby",
        "password": "$2b$10$30.buFOg/4m9Gaf11vCYq.TBKahcul2AZYJF.97/ZjsLVhGUFBuem",
        "lastLoginDate": "2023-01-31T21:59:41.846Z",
        "__v": 0
    },
    ...
```
Example fail response: 401 Unauthorized
```
{
    "message": "Auth failed"
}
```

### All Places |  GET - `/places`
`https://api.prost.rocks/places`

Example success response: 200 OK
```
[
    {
        "_id": "63d1a04181f71a232f954887",
        "name": "Bomonti Bira Bahçesi",
        "category": "Beer Garden",
        "location": "Atakent",
        "price": "$$$$$",
        "menu": "http://bomontibirabahcesi.com/menu/",
        "tags": [
            {
                "_id": "63d15f497311cc0948d92b54",
                "name": "food"
            },
            {
                "_id": "63d1a01d81f71a232f954877",
                "name": "alcohol"
            },
            {
                "_id": "63d1a01d81f71a232f954875",
                "name": "outdoor"
            }
        ],
        "createdBy": {
            "_id": "63a1b900e3958cecefc7e3f1",
            "username": "to"
        },
        "createdAt": "2023-01-25T21:33:53.967Z",
        "updatedAt": "2023-01-25T21:33:53.967Z",
        "__v": 0
    },
    ...
  
```
Example fail response: 404 Not Found
```
{
    "message": "No places found!"
}
```

### Places by a user |  GET - `/places?user={username}`
`https://api.prost.rocks/places?user=paulmccartney`

Example success response: 200 OK
```
[
    {
        "_id": "63fcb62c8293f11bdbb71505",
        "name": "Hangout Bahçe",
        "category": "Beer Garden",
        "location": [
            {
                "_id": "63fcb62b8293f11bdbb714fb",
                "name": "Bornova"
            }
        ],
        "price": "$$$",
        "menu": "https://www.hangout.com.tr/sayfa/22/menu",
        "tags": [
            {
                "_id": "63fcb62c8293f11bdbb714fe",
                "name": "burger"
            },
            {
                "_id": "63fcb62c8293f11bdbb71500",
                "name": "hotdog"
            },
            {
                "_id": "63d691e7767f40c04a2c1135",
                "name": "pizza"
            },
            {
                "_id": "63d1a01d81f71a232f954877",
                "name": "alcohol"
            },
            {
                "_id": "63fcb62c8293f11bdbb71502",
                "name": "coffee"
            },
            {
                "_id": "63d1a01d81f71a232f954875",
                "name": "outdoor"
            }
        ],
        "createdBy": {
            "_id": "63fcb5c68293f11bdbb714e5",
            "username": "paulmccartney"
        },
        "createdAt": "2023-02-27T13:54:52.981Z",
        "updatedAt": "2023-02-27T13:54:52.981Z",
        "__v": 0
    },
    ...
  
```
Example fail response: 404 Not Found
```
{
    "message": "No places found!"
}
```

### Places with tags |  GET - `/places?tag={[name]}`
`https://api.prost.rocks/places?tag=taco,burrito`

Example success response: 200 OK
```
[
    {
        "_id": "63fcc5d48293f11bdbb7163b",
        "name": "Zemin",
        "category": "Restaurant",
        "location": [
            {
                "_id": "63fcc5d48293f11bdbb71633",
                "name": "Bostanlı"
            }
        ],
        "price": "$$$$",
        "menu": "https://menu.zeminizmir.com/",
        "tags": [
            {
                "_id": "63fcc5d48293f11bdbb71636",
                "name": "taco"
            },
            {
                "_id": "63fcc5d48293f11bdbb71638",
                "name": "burrito"
            },
            {
                "_id": "63fca68ed9df11bd8987b245",
                "name": "indoor"
            },
            {
                "_id": "63d1a01d81f71a232f954875",
                "name": "outdoor"
            }
        ],
        "createdBy": {
            "_id": "63fcb5c68293f11bdbb714e5",
            "username": "paulmccartney"
        },
        "createdAt": "2023-02-27T15:01:40.993Z",
        "updatedAt": "2023-02-27T15:01:40.993Z",
        "__v": 0
    },
    ...
  
```
Example fail response: 404 Not Found
```
{
    "message": "No places found!"
}
```

### Create Place |  POST - `/places`
`https://api.prost.rocks/places`

Example request header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsZWFub3JyaWdieSIsInBhc3N3b3JkIjoiJDJiJDEwJDMwLmJ1Rk9nLzRtOUdhZjExdkNZcS5UQkthaGN1bDJBWllKRi45Ny9aanNMVmhHVUZCdWVtIiwiaWF0IjoxNjc1MjAyMjkwLCJleHAiOjE2NzUyMDk0OTB9.lHp4buGoAXkTD9shyi1ICQ6hApFFsVyxNLq-136qulY
```
Example request body:
```
{
    "name": "Sifon Gastro Pub",
    "category": "Gastro Pub",
    "location": "Bayraklı",
    "menu": "http://buzukimeyhane.com/sifon/",
    "price": "$$",
    "tags": "food, burger, pizza, alcohol, coffee, outdoor, indoor"
}
```
Example success response: 201 Created
```
{
    "message": "Created successfully!"
}
```
Example fail response: 400 Bad Request
```
{
    "message": "Place already exists!"
}
```
Example fail response: 401 Unauthorized
```
{
    "message": "Auth failed"
}
```

### Place By Id |  GET - `/places/{place_id}`
`https://api.prost.rocks/places/63d1a04181f71a232f954887`

Example request:
```
/places/63d1a04181f71a232f954887
```
Example success response: 200 OK
```
{
    "_id": "63d1a04181f71a232f954887",
    "name": "Bomonti Bira Bahçesi",
    "category": "Beer Garden",
    "location": "Atakent",
    "price": "$$$$$",
    "menu": "http://bomontibirabahcesi.com/menu/",
    "tags": [
        "63d15f497311cc0948d92b54",
        "63d1a01d81f71a232f954877",
        "63d1a04181f71a232f954882",
        "63d1a01d81f71a232f954875",
        "63d1a04181f71a232f954884"
    ],
    "createdBy": "63a1b900e3958cecefc7e3f1",
    "createdAt": "2023-01-25T21:33:53.967Z",
    "updatedAt": "2023-01-25T21:33:53.967Z",
    "__v": 0
}  
```
Example fail response: 404 Not Found
```
{
    "message": "Not found!"
}
```

### Place By Id |  DELETE - `/places/{place_id}`
`https://api.prost.rocks/places/63d1a04181f71a232f954887`

Example request:
```
/places/63d1a04181f71a232f954887
```
Example request header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsZWFub3JyaWdieSIsInBhc3N3b3JkIjoiJDJiJDEwJDMwLmJ1Rk9nLzRtOUdhZjExdkNZcS5UQkthaGN1bDJBWllKRi45Ny9aanNMVmhHVUZCdWVtIiwiaWF0IjoxNjc1MjAyMjkwLCJleHAiOjE2NzUyMDk0OTB9.lHp4buGoAXkTD9shyi1ICQ6hApFFsVyxNLq-136qulY
```
Example success response: 200 OK
```
{
    "message": "Deleted successfully!"
}
```
Example fail response: 401 Unauthorized
```
{
    "message": "Unauthorized!"
}
```

### All Tags |  GET - `/tags`
`https://api.prost.rocks/tags`

Example success response: 200 OK
```
[
    {
        "_id": "63d1a01d81f71a232f954875",
        "name": "outdoor",
        "__v": 0
    },
    {
        "_id": "63d1a01d81f71a232f954877",
        "name": "alcohol",
        "__v": 0
    },
    {
        "_id": "63d691e7767f40c04a2c1135",
        "name": "pizza",
        "__v": 0
    },
    ...
  
```
Example fail response: 404 Not Found
```
{
    "message": "No tags found!"
}
```

### All Locations |  GET - `/locations`
`https://api.prost.rocks/locations`

Example success response: 200 OK
```
[
    {
        "_id": "63fcb62b8293f11bdbb714fb",
        "name": "Bornova",
        "__v": 0
    },
    {
        "_id": "63fcb6768293f11bdbb71515",
        "name": "İnciraltı",
        "__v": 0
    },
    {
        "_id": "63fcb6f98293f11bdbb71525",
        "name": "Evka 3",
        "__v": 0
    },
    ...
  
```
Example fail response: 404 Not Found
```
{
    "message": "No locations found!"
}
```
