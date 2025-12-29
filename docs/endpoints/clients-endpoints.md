# Clients API Endpoints

All clients endpoints live under `/clients`.
Swagger is available at `/api` for interactive exploration.

## Auth and access

- Auth: `JWT` (and `ApiKey` security is declared in Swagger).
- Staff-only: `GET /clients`.
- Client users: can only access `/clients/me/projects` when their JWT has a `clientId`.

## Shared response shapes

### Client

```
{
  "id": "uuid",
  "name": "string",
  "plan": "BASIC | GROWTH | PREMIUM | null",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "projects": [
    {
      "id": "uuid",
      "name": "string",
      "status": "ACTIVE | PAUSED | ARCHIVED",
      "description": "string",
      "clientId": "uuid",
      "createdAt": "ISO-8601",
      "updatedAt": "ISO-8601"
    }
  ]
}
```

### Project

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

## Endpoints

### GET `/clients`

List all clients (staff only).

- Auth: JWT (staff role required).
- Response: `200 OK` with `Client[]` including `projects`.
- Errors: `403` if not staff.

### GET `/clients/me/projects`

List projects for the authenticated client.

- Auth: JWT with `clientId`.
- Response: `200 OK` with `Project[]`.
- Errors: `403` if the user is not associated with a client.
