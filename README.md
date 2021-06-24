# Genesis Test Task by Bohdan Arkhypchuk

## *Start of the API*

To work with this API you have to open a file called server.js and then send some requests (using Postman or any other comfortable way) to see the end points outcome.

## *End points*

This API contains __3__ main end points:

### __/user/create__

POST: The first end point is required to continue any further work. In the body of the request you have to send a json formated parameters:

{<br>
&nbsp;&nbsp;&nbsp;&nbsp;"email": "email example"<br>
&nbsp;&nbsp;&nbsp;&nbsp;"password": "password example"<br>
}<br>

Notice: email can be only of a standart format (example@example.example)

### __/user/login__

POST: If you created an account, then you can login using the same creditentials you used. They need to be attached to the body of the request in the same fortmat as in /user/create. In case of a successful authentification, you will recieve a token, which you can use to access the last end point.

### __/btcRate__

GET: The last end point that allows to find out the bitcoin rate to UAH. In order to do so, you have to add a token, which you recieved from the /user/login, to the Authorithazion header.

## *Logic of the API*

### User Info Storage

All of the new users are stored in users.json file. Their passwords are encrypted with the bcrypt to secure information about accounts.

### Creating and Authentication of the user

When a /user/create is requested with some creditentials in body, server checks whether the user with this email has been created already. If so, then the 409 status code and a message 'The user with this email already exists!' are returned. Otherwise, the status code 200 and a message 'User was successfully created :)' will be in response. If the format of the email will be incorrect, then the status code 500 and message 'Incorrect format of email' are sent therefore.

When a /user/login is requested server checks whether there is a user with an email like in a body of the request. If it finds one, then it will compare the passwords, using bcrypt.verify, since our passwords in the file encrypted. In case of a successful authetication the status code 200 and a message 'Auth successful' will be returned. Also there will be a token in a response body, which is used in /btcRate. If the user failed to enter correct email or password, the response body will have a 401 status code and a message 'Auth failed'

### Recieving BitCoin rate

To recieve the BitCoin rate, you need to use /btcRate. In the headers, you are required to enter authorization token, which is recieved erlier in the /user/login. If the token, which is valid for 1 hour, is correct, then the response body will contain BitCoin rate. Otherwise, the status code 401 and a message 'Auth failed' will be recieved.

### BitCoin Rate

The BitCoin rate itself is recieved from ope API https://docs.kuna.io/docs/getting-started. 
The following link: https://api.kuna.io/v3/exchange-rates/btc is used to fetch data with rate of 1 bitcoin to the UAH.

## *How to test*

In git repository I included collection from PostMan with 3 main request where you can try all of the end points by yourself.


