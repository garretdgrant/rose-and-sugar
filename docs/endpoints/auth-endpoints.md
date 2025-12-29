# Auth API Endpoints

All auth endpoints live under `/auth`.
Swagger is available at `/api` for interactive exploration.

## Auth and access

- Public: `POST /auth/login`, `POST /auth/client-signup`.
- Authenticated: `GET /auth/me` (JWT required).

## Shared response shapes

### SafeUser

```
{
  "id": "uuid",
  "email": "string",
  "name": "string | null",
  "role": "USER | ADMIN",
  "staffRole": "SUPER_ADMIN | null",
  "clientId": "uuid | null",
  "isEmailVerified": true,
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

### SafeClient

```
{
  "id": "uuid",
  "name": "string",
  "plan": "BASIC | GROWTH | PREMIUM | null",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

### SafeProject

```
{
  "id": "uuid",
  "name": "string",
  "status": "ACTIVE | PAUSED | ARCHIVED",
  "description": "string",
  "clientId": "uuid",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

### MeResponse

```
{
  "id": "uuid",
  "email": "string",
  "name": "string | null",
  "role": "USER | ADMIN",
  "staffRole": "SUPER_ADMIN | null",
  "clientId": "uuid | null",
  "isEmailVerified": true,
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "projectIds": ["uuid"],
  "client": {
    "id": "uuid",
    "name": "string",
    "plan": "BASIC | GROWTH | PREMIUM | null",
    "createdAt": "ISO-8601",
    "updatedAt": "ISO-8601"
  } | null
}
```

## Endpoints

### POST `/auth/login`

Log in with email + password.

- Auth: none.
- Body:
  - `email` (string, email, required)
  - `password` (string, 8-128 chars, required)
- Response: `200 OK` with `{ accessToken, user }` (see "SafeUser").
- Errors: `401` if credentials are invalid.

### POST `/auth/client-signup`

Create a client account with an initial user and project (atomic).

- Auth: none (requires `signUpSecret`).
- Body:
  - `contactName` (string, 1-80 chars, required)
  - `companyName` (string, 2-120 chars, required)
  - `email` (string, email, required)
  - `password` (string, 8-72 chars, required)
  - `projectName` (string, 2-120 chars, required)
  - `signUpSecret` (string, min 8, required)
  - `plan` (`BASIC | GROWTH | PREMIUM`, optional)
- Response: `200 OK` with `{ accessToken, user, client, project }`.
- Errors:
  - `401` if the signup secret is invalid
  - `409` if email or company name is already in use

### GET `/auth/me`

Get the authenticated user and their client/project context.

- Auth: JWT.
- Response: `200 OK` with `MeResponse`.
