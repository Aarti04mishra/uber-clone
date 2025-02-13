# Backend API Documentation

## `/user/register` EndPoint

### Description 

Register a new user by creating abuser account with provided information

### HTTP Method

`POST`

### Endpoint

/user/register

### Request body

Request body should be in JSON format and include the following details:

-- `fullname` (object):
  -- `firstname` (string,required): User's firstname(minimum 3 characters).
  -- `lastname` (string,required): User's lastname(minimum 3 characters).
-- `email` (string,required): User's email(must be valid email).
-- `password` (string,required): User's password(include all characters),

### Example Request body 

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "StrongPass@123"
}

### Example Response

Success:

{
  "user": {
    "_id": "64abc123def4567890ghijk",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2024-12-10T12:00:00.000Z",
    "updatedAt": "2024-12-10T12:00:00.000Z"
  },
  "token": "jwt_token_here"
}


Error (Validation):

{
  "errors": [
    { "msg": "Invalid Email", "param": "email" },
    { "msg": "Password must be at least 8 characters long.", "param": "password" }
  ]
}


## `/user/login` EndPoint

### Description 

Logins a user

### HTTP Method

`POST`

### Endpoint

/user/login

### Request body

Request body should be in JSON format and include the following details:

-- `email` (string,required): User's email(must be valid email).
-- `password` (string,required): User's password(must be at least 8 chracters long.)

### Example Request body 

{
  "email": "john.doe@example.com",
  "password": "StrongPass@123"
}

### Example Response

--`user`(object):
 --`fullname`(object).
  --`firstname`(string):User's first name (minimum 3 characters).
  --`lastname`(string):User's last name (minimum 3 characters).
 -- `email` (string): User's email(must be valid email).
--`token` (String):JWT Token.


# User Authentication: Profile and Logout Endpoints

## **Profile Route**

### **Endpoint:**
`POST /profile`

### **Purpose:**
Fetch and return the authenticated user's details.

### **Middleware:**
- `authMiddleware.authUser`
  - Verifies the provided token.
  - Ensures the token is not blacklisted.
  - Fetches the user from the database and attaches it to `req.user`.


### **Flow:**
1. The `authMiddleware.authUser` middleware validates the user's token.
2. If valid, the user's data is fetched from the database and attached to `req.user`.
3. The `profileUser` controller sends back the user's details in the response.

### **Response:**
#### **Success (200):**

{
    "_id": "userId",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "token": "userJWTToken"
}


#### **Failure (401):**
Unauthorized response if the token is missing, invalid, or blacklisted:

{
    "message": "Unauthorized"
}


---

## **Logout Route**

### **Endpoint:**
`POST /logout`

### **Purpose:**
Log out the authenticated user by:
1. Clearing the authentication token from cookies.
2. Adding the token to the blacklist to prevent further use.

### **Middleware:**
- `authMiddleware.authUser`
  - Ensures the user is authenticated before logging out.


### **Flow:**
1. The `authMiddleware.authUser` middleware validates the user's token.
2. The `logoutUser` controller clears the token from cookies and adds it to the blacklist.
3. The response confirms the user has been logged out successfully.

### **Response:**
#### **Success (200):**
```json
{
    "message": "logged out"
}
```

#### **Failure (401):**
Unauthorized response if the token is missing, invalid, or blacklisted:
```json
{
    "message": "Unauthorized"
}
```

---

## **Auth Middleware (`authUser`)**
The middleware is used to protect routes like `/profile` and `/logout`.


### **How It Works:**
1. Extracts the token from cookies or the `Authorization` header.
2. Checks if the token is blacklisted.
3. If valid, decodes the token and fetches the user details from the database.
4. Attaches the user data to `req.user` and calls `next()`.
5. If any step fails, it responds with a 401 Unauthorized error.


# Captain Registration API

## `/captain/register` EndPoint

### Description 

To register a captain by collecting their personal information and vehicle details.

### HTTP Method

`POST`

### Endpoint

/captain/register

### Request body

Request body should be in JSON format and include the following details:


### Request Structure
The request should include the following fields:

- **fullname** (object): Full name of the captain.
  - **firstname** (string, required): The first name of the captain (minimum 3 characters).
  - **lastname** (string, optional): The last name of the captain.

- **email** (string, required): A valid email address of the captain.

- **password** (string, required): A strong password (minimum 8 characters) that includes:
  - At least one lowercase letter.
  - At least one uppercase letter.
  - At least one number.
  - At least one special character (e.g., `@$!%*?&`).

- **vehicle** (object): Vehicle details of the captain.
  - **color** (string, required): The color of the vehicle (minimum 3 characters).
  - **plate** (string, required): The vehicle's license plate (minimum 3 characters).
  - **capacity** (integer, required): The seating capacity of the vehicle (minimum value: 2).
  - **vehicleType** (string, required): The type of vehicle, restricted to one of the following values:
    - `car`
    - `auto`
    - `motorcycle`

### Example Request Body
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "StrongPassword123@",
    "vehicle": {
        "color": "White",
        "plate": "MP 04 XY 6204",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

### Validation Rules
- **firstname**: Must be at least 3 characters long.
- **email**: Must be a valid email format.
- **password**: Must be at least 8 characters long and satisfy the password criteria mentioned above.
- **color**: Must be at least 3 characters long.
- **plate**: Must be at least 3 characters long.
- **capacity**: Must be an integer and at least 2.
- **vehicleType**: Must be one of the specified values (`car`, `auto`, `motorcycle`).

### Response Structure

#### Success Response
```json
{
    "message": "Captain registered successfully!",
    "data": {
        "id": "unique_captain_id",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
            "color": "White",
            "plate": "MP 04 XY 6204",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

#### Error Responses

1. **Validation Error**:
   - Status: `400 Bad Request`
   - Example:
     ```json
     {
         "error": "First name must be at least 3 characters long."
     }
     ```

2. **Missing Fields**:
   - Status: `400 Bad Request`
   - Example:
     ```json
     {
         "error": "All fields are required."
     }
     ```

3. **Duplicate Email**:
   - Status: `409 Conflict`
   - Example:
     ```json
     {
         "error": "Email is already registered."
     }
     ```

