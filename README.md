<h1 align="center">
✈ Hotel Booking 🏨
</h1>
<p align="center">
Find your next stay
</p>

<p align="center">
   <a href="https://github.com/htoann/Booking-Hotel/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
   <a href="https://github.com/htoann/Booking-Hotel">
      <img src="https://circleci.com/gh/amazingandyyy/mern.svg?style=svg" />
   </a>
</p>

> Search deals on hotels, homes, and much more...

## Clone or download
```terminal
$ git clone https://github.com/htoann/Booking-Hotel.git
$ yarn # or npm i
```

## Project structure
```terminal
LICENSE
package.json
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage

Notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client side usage (PORT: 3000)
```terminal
$ cd client
$ yarn # or npm i
$ npm run dev
// deployment for client app
$ npm run build
$ npm run start
```

## Server side usage (PORT: 8000)

### Prepare your secret
(You need to add a JWT_SECRET in .env to connect to MongoDB)

### Start

```terminal
$ cd server
$ npm i
$ npm run dev
$ npm run build
```

### Deploy Server to [Railway](https://railway.app/)

### Environment variables

```
# Client .env.local file
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=

# Server .env file
JWT_SECRET = 
MONGODB_URI = 
CLOUD_NAME = 
CLOUD_API_KEY = 
CLOUD_API_SECRET = 
```

## Standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## BUGs or comments

[Create new Issues](https://github.com/htoann/bookinghotel/issues) (preferred)

## Author
[Le Cong Ly](https://github.com/lecongly)

[Tran Huu Toan](https://github.com/htoann)