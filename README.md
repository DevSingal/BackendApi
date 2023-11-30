# BackendApi
This is backend api which performs crud operations which is connected to mongodb cluster online and is depolyed on render (though frontend is not made properly so for testing and checking use postman or any software to make api)

i have mainly used nodejs, expressjs, mongoose for db connection, bcrypt for password hashing, jwt for tokens etc.

use " https://backendapi-gumu.onrender.com/api/v1/user " as link to call the api

/register : to register new user, body requires name, email, password.

/login : to login existing user, body requires name, email, password.

/logout : to log user out and clear the cookie/token.

/profile : to get user proflie.

