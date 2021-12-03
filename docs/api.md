# Bookhouse API

## Authentication

### Login:

 >**Request**:

URL: `/api/auth/signin`\
Method: `POST`\
Body:

```json
{
	"username": "string",
	"password": "string",
}
```

 >**Response**:
 
Body:

```json
{
	"ok": 1/0,
	"redirect": "string"
}
```

---

### Register:

 >**Request**:

URL: `/api/auth/signup`\
Method: `POST`\
Body:

```json
{
	"username": "string",
	"email": "string",
	"password": "string",
	"password2": "string",
	"interests": [ "string list" ],
}
```

 >**Response**:

Body:

```json
{
	"ok": 1/0,
	"redirect": "string"
}
```

## User management

### Get public user info:

  > **Request**:

URL: `/api/user/USERID`
Method: `GET`

 > **Response**:
 
Body:

```json
{
	"user":
	{
		"username": "string",
		"avatarImageURL": "string",
	}
}
```
