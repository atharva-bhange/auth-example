# Server Documentation

## Auth Routes
- **POST** `api/v1/users/register` : Register using email and password

    Request Body
    ```json
    {
        email : string,
        password : string
    }
    ```
    **200** : User Registered Successfully and session cookie is set
    
    Response Data

    ```
    {
        status: "success",
		data: {
			user: {
                email : string
            },
		},
    }
    ```

    **440** : email or password not submitted
    Response Data : See generic error message [here](#Generic-Error-Data)

    **400** : data passed did not pass validation
    Response Data : See generic error message [here](#Generic-Error-Data)

- **POST** `api/v1/users/login` : Login using email and password   

    Request Body
    ```json
    {
        email : string,
        password : string
    }
    ```
    **200** : User Logged In Successfully Session cookie set.
    
    Response Data

    ```
    {
        status: "success",
		data: {
			user: {
                email : string
            },
		},
    }
    ```

    **440** : email or password not submitted
    Response Data : See generic error message [here](#Generic-Error-Data)

    **400** : data passed did not pass validation
    Response Data : See generic error message [here](#Generic-Error-Data)

    **401** : incorrect email or password
    Response Data : See generic error message [here](#Generic-Error-Data)

- **POST** `api/v1/users/logout` : logout user and delete user session
  
    **200** : user logged out successfully and session deleted.
    
    Response Data

    ```
    {
        status: "success",
		data: {
			user: {
                email : string
            },
		},
    }
    ```

- **GET** `api/v1/users/login` : check if user is logged in
    
    **200** : user is logged in.

    Response Data

    ```
    {
        status: "success",
		data: {
			user: {
                email : string
            },
		},
    }
    ```

    **401** : This user was not found. 

***
> ## Note
> Check for 500 status code errors which are errors on the server side.
### Generic Error Data
```
{
    status : "fail",
    message : string,
    error : ErrorObject
}
```