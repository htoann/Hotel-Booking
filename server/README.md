# Booking Hotel Server

MongoDB, Express, Node

## Usage

### Prepare JWT secret

run the script at the first level: (You need to add a JWT_SECRET in .env to connect to MongoDB)

```terminal
$ echo "JWT_SECRET=YOUR_JWT_SECRET" >> src/.env
```

### API
[Booking.postman.json](https://github.com/htoann/BookingHotel/blob/main/server/Booking.postman_collection.json)

Variable
```
{{API_ENDPOINT}} : https://bookingapihotel.herokuapp.com/api
```
Example get all hotels : https://bookingapihotel.herokuapp.com/api/hotels

### Start

```terminal
$ cd server   // go to server folder
$ npm        // npm install packages
$ npm run dev    // run it locally
// http://localhost:8000 be available
$ npm run build  // this will build the server code to es5 js codes and generate a dist file
```

## BUGs or comments

[Create new Issues](https://github.com/amazingandyyy/mern/issues)

## Author

[Tran Toan](https://github.com/htoann)

### License

MIT License
Copyright (C) 2022 Tran Huu Toan <huutrantoan@gmail.com>
