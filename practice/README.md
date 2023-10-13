
### Supporting REST API for practice

The one we will use will be [sparrest.js](https://github.com/kasappeal/sparrest.js) (thanks to Alberto Casero for the great work), a project based on the json-server utility, which offers us a complete REST API to simulate a real backend and adapt to the needs of this practice.

To make it work, you just have to clone the [sparrest.js](https://github.com/kasappeal/sparrest.js) repository and, within the folder where the code is hosted. One (sparrest.js) is not installed inside another (practice), they are independent/paralel projects. 

When I have cloned I get into the sparrest.js folder and install the dependencies by executing the following command:

```sh
npm install
```

Once the dependencies are installed, to start the server we execute:

```sh
npm start
```

By default, it will boot the server on port 8000, so it can be accessed via http://127.0.0.1:8000/

**This REST API exposes the following endpoints:**

>**POST /auth/register**: allows you to register a user. Receives as parameters username and password and returns whether or not the user could be registered (it does not allow users with the same username in the system).
>
>**POST /auth/login**: authentication endpoint. It receives username and password as parameters and returns a JWT authentication token.
>
>**POST /upload**: which allows the upload of files through a file attribute. Files can only be uploaded using the multipart/form-data format.
>
>**In /api/**:
>* The endpoints offered by json-server are found, so recommends reading its documentation.
>* To use the POST, PUT, or DELETE methods on any subpath of /api/, Authentication via JWT token will be required.
>* This authentication is done by adding a header to HTTP requests Authorization: Bearer <token>, where <token> is the value of the token obtained at the login endpoint.





