# Wordpress JWT Auth

![travis-badge](https://travis-ci.org/dderevjanik/wordpress-jwt-auth.svg?branch=master)

JS Wrapper for [wp-api-jwt-auth](https://github.com/Tmeister/wp-api-jwt-auth)

## Installation

Please, make sure that you have:

- installed [wp-api-jwt-auth](https://github.com/Tmeister/wp-api-jwt-auth) and enabled on your wp site
- enabled [HTTP Authorization Header](https://github.com/Tmeister/wp-api-jwt-auth#eable-php-http-authorization-header)
- configurated [Secret Key](https://github.com/Tmeister/wp-api-jwt-auth#configurate-the-secret-key) and [CORs Support](https://github.com/Tmeister/wp-api-jwt-auth#configurate-cors-support)

install this package:

```bash
npm install wordpress-jwt-auth
```

## Example

### `connectToJwt(host)`

Authenticate using JWT

```javascript
import { connectToJwt } from 'wordpress-jwt-auth';

// Promise
connectToJwt('https://www.myhosting.com/wordpress').then((jwtConnection) => {
    jwtConnection.generateToken('admin', 'password').then(userConnection) => {
        console.log(userConnection.token);
        // generated token

        jwtConnection.validate().then(validated => {
            console.log(validate);
            // true
        });
    });
});

// Await/Async
const jwtConnection = await connectToJwt('https://www.myhosting.com/wordpress');
const { token } = await jwtConnection.generateToken('admin', 'password');
console.log(jwtConnection.validate(token));
// true
```

### `generateToken(username, password)`

You can import `generateToken` directly from library

```javascript
import { generateToken } from 'wordpress-jwt-auth';

const { token } = generateToken('admin', 'root');
```

### Real use

Deleting a post with id `32` from wordpress using [REST API](https://developer.wordpress.org/rest-api/)

```javascript
import axios from 'axios';
import { connectToJwt } from 'wordpress-jwt-auth';

const WP_URL = 'https://www.mywordpress.com';
const POST_ID_TO_DELETE = 32;

const { generateToken } = await connectToJwt(WP_URL);
const { token } = await generateToken('superadmin', '2489cs12mklz');
const authHeader = { headers: { Authorization: `bearer ${token}` } };

axios.delete(`${WP_URL}/wp-json/wp/v2/posts/${POST_ID_TO_DELETE}`, {}, authHeader);
```