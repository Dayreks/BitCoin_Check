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
