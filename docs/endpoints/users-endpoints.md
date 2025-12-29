# Users API Endpoints

All user endpoints live under `/users`.
Swagger is available at `/api` for interactive exploration.

## Auth and access

- No auth guard is enforced on these endpoints in the current controller.

## Shared response shapes

### User (safe)

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

## Endpoints

### POST `/users`

Create a client user.

- Auth: none.
- Body:
  - `email` (string, email, required)
  - `name` (string, optional)
  - `password` (string, 8-128 chars, required)
  - `clientId` (uuid, required)
  - `role` (`USER`, optional; admin cannot be created via API)
- Response: `201 Created` with `User` (see "User (safe)").
