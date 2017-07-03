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

### `Authenticate(host, username, password)`

Authenticate using JWT

```javascript
import { authenticate } from 'wordpress-jwt-auth';

authenticate('https://www.myhosting.com/wordpress', 'admin', '123456').then((jwt) => {
    console.log(jwt.token);
    // generated token

    jwt.validate().then(validated => {
        console.log(validate);
        // true
    });
});
```

Deleting a post with id `32` from wordpress using [REST API](https://developer.wordpress.org/rest-api/)

```javascript
import axios from 'axios';
import { authenticate } from 'wordpress-jwt-auth';

const WP_URL = 'https://www.mywordpress.com';
const POST_ID_TO_DELETE = 32;

const { token } = await authenticate(WP_URL, 'superadmin', '2489cs12mklz');
const authHeader = { headers: { Authorization: `bearer ${token}` } };

axios.delete(`${WP_URL}/wp-json/wp/v2/posts/${POST_ID_TO_DELETE}`, {}, authHeader);
```
