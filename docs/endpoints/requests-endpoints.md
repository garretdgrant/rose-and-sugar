# Requests API Endpoints

All requests endpoints live under `/requests` and require authentication.
Swagger is available at `/api` for interactive exploration.

## Auth and access

- Auth: `JWT` (and `ApiKey` security is declared in Swagger).
- Staff-only: `GET /requests`, `GET /requests/client/:clientId`.
- Client users: can access `/requests/me`, `GET /requests/:id` for their own client, and `POST /requests`.

## Shared response shapes

### Request (with relations)

Returned by list and get endpoints.

```
{
  "id": "uuid",
  "title": "string",
  "description": "string | null",
  "status": "NEW | IN_PROGRESS | COMPLETED",
  "priority": "LOW | NORMAL | HIGH",
  "clientId": "uuid",
  "projectId": "uuid",
  "createdByUserId": "uuid | null",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "client": {
    "id": "uuid",
    "name": "string",
    "plan": "BASIC | GROWTH | PREMIUM | null",
    "createdAt": "ISO-8601",
    "updatedAt": "ISO-8601"
  },
  "project": {
    "id": "uuid",
    "name": "string",
    "status": "ACTIVE | PAUSED | ARCHIVED",
    "description": "string",
    "clientId": "uuid",
    "createdAt": "ISO-8601",
    "updatedAt": "ISO-8601"
  },
  "createdBy": {
    "id": "uuid",
    "email": "string",
    "name": "string | null",
    "role": "USER | ADMIN",
    "staffRole": "SUPER_ADMIN | null",
    "clientId": "uuid | null",
    "isEmailVerified": true,
    "createdAt": "ISO-8601",
    "updatedAt": "ISO-8601"
  } | null,
  "notes": [
    {
      "id": "uuid",
      "body": "string",
      "requestId": "uuid",
      "authorId": "uuid | null",
      "author": {
        "id": "uuid",
        "email": "string",
        "name": "string | null",
        "role": "USER | ADMIN",
        "staffRole": "SUPER_ADMIN | null",
        "clientId": "uuid | null",
        "isEmailVerified": true,
        "createdAt": "ISO-8601",
        "updatedAt": "ISO-8601"
      } | null,
      "createdAt": "ISO-8601",
      "updatedAt": "ISO-8601"
    }
  ]
}
```

### Request note

Returned by note create.

```
{
  "id": "uuid",
  "body": "string",
  "requestId": "uuid",
  "authorId": "uuid | null",
  "author": {
    "id": "uuid",
    "email": "string",
    "name": "string | null",
    "role": "USER | ADMIN",
    "staffRole": "SUPER_ADMIN | null",
    "clientId": "uuid | null",
    "isEmailVerified": true,
    "createdAt": "ISO-8601",
    "updatedAt": "ISO-8601"
  } | null,
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

## Endpoints

### GET `/requests`

List all requests (staff only).

- Auth: JWT (staff role required).
- Response: `200 OK` with `Request[]` (see "Request (with relations)").
- Errors: `403` if not staff.

### GET `/requests/client/:clientId`

List requests for a specific client (staff only).

- Auth: JWT (staff role required).
- Params: `clientId` (uuid)
- Response: `200 OK` with `Request[]`.
- Errors: `403` if not staff.

### GET `/requests/me`

List requests for the authenticated client.

- Auth: JWT with `clientId`.
- Response: `200 OK` with `Request[]`.
- Errors: `403` if the user is not associated with a client.

### GET `/requests/:id`

Get a single request by id (staff can access any request, clients can access
their own).

- Auth: JWT.
- Params: `id` (uuid)
- Response: `200 OK` with `Request` (see "Request (with relations)").
- Errors:
  - `403` if the user is not associated with a client or not allowed
  - `404` if the request does not exist

### POST `/requests`

Create a request (client users only).

- Auth: JWT with `clientId`.
- Body:
  - `title` (string, 3-200 chars, required)
  - `description` (string, max 2000 chars, optional)
  - `projectId` (uuid, required)
  - `priority` (`LOW | NORMAL | HIGH`, optional, default `NORMAL`)
- Response: `201 Created` with `Request`.
- Errors:
  - `403` if the user is not associated with a client or project does not
    belong to client

### POST `/requests/:id/notes`

Create a note for a request (staff can access any request, clients can access
their own).

- Auth: JWT.
- Params: `id` (uuid)
- Body:
  - `body` (string, 1-2000 chars, required)
- Response: `201 Created` with `RequestNote`.
- Errors:
  - `403` if the user is not associated with a client or not allowed
  - `404` if the request does not exist

### DELETE `/requests/:id/notes/:noteId`

Delete a note for a request (staff only).

- Auth: JWT (staff role required).
- Params:
  - `id` (uuid)
  - `noteId` (uuid)
- Response: `204 No Content`
- Errors:
  - `403` if not staff
  - `404` if request or note does not exist

### PATCH `/requests/:id`

Update request status (staff only).

- Auth: JWT (staff role required).
- Params: `id` (uuid)
- Body:
  - `status` (`NEW | IN_PROGRESS | COMPLETED`, required)
- Response: `200 OK` with `Request` (see "Request (with relations)").
- Errors:
  - `403` if not staff
  - `404` if request does not exist
