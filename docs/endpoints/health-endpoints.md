# Health API Endpoints

All health endpoints live under `/health`.
Swagger is available at `/api` for interactive exploration.

## Auth and access

- Public endpoints, no auth required.

## Shared response shapes

### HealthCheckResponse

```
{
  "statusCode": 200,
  "message": "OK"
}
```

## Endpoints

### GET `/health`

Get service health status.

- Auth: none.
- Response: `200 OK` with `HealthCheckResponse`.

### GET `/health/db`

Check database connectivity.

- Auth: none.
- Response: `200 OK` with `HealthCheckResponse`.
