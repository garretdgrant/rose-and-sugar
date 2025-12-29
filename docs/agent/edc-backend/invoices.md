# Invoices API Endpoints

All invoices endpoints live under `/invoices` and require authentication.
Swagger is available at `/api` for interactive exploration.

## Auth and access

- Auth: `JWT` (and `ApiKey` security is declared in Swagger).
- Staff-only: endpoints that create or update invoices, line items, or payments.
- Client users: can only access `/invoices/me` when their JWT has a `clientId`.

## Shared response shapes

### Invoice (with relations)

Returned by list, create, and update invoice endpoints.

```
{
  "id": "uuid",
  "invoiceNumber": "INV-2025-000123",
  "status": "DRAFT | DUE | OVERDUE | PAID | VOID",
  "clientId": "uuid",
  "projectId": "uuid | null",
  "issuedAt": "ISO-8601 | null",
  "dueAt": "ISO-8601 | null",
  "paidAt": "ISO-8601 | null",
  "currency": "USD",
  "subtotalCents": 50000,
  "totalCents": 50000,
  "memo": "string | null",
  "terms": "string | null",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "client": {
    "id": "uuid",
    "name": "string",
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
  } | null,
  "lineItems": [
    {
      "id": "uuid",
      "invoiceId": "uuid",
      "description": "string",
      "quantity": 1,
      "unitPriceCents": 50000,
      "amountCents": 50000,
      "createdAt": "ISO-8601",
      "updatedAt": "ISO-8601"
    }
  ],
  "payments": [
    {
      "id": "uuid",
      "status": "PENDING | SUCCEEDED | FAILED | REFUNDED | CANCELED",
      "method": "STRIPE | ZELLE",
      "invoiceId": "uuid",
      "currency": "USD",
      "amountCents": 50000,
      "processingFeeCents": 1500,
      "totalChargedCents": 51500,
      "paidAt": "ISO-8601 | null",
      "stripePaymentIntentId": "string | null",
      "stripeChargeId": "string | null",
      "stripeReceiptUrl": "string | null",
      "notes": "string | null",
      "createdAt": "ISO-8601",
      "updatedAt": "ISO-8601"
    }
  ]
}
```

Notes:

- `dueAt` is computed as the first day of the next month in UTC based on `issuedAt` (or "now" if omitted on create).
- `subtotalCents` and `totalCents` are derived from line items.
- Creating a Stripe payment adds a processing fee line item and increases totals.
- If a payment is created with `status = SUCCEEDED`, the invoice is marked `PAID` and `paidAt` is set.

### Invoice line item

Returned by line item create/update.

```
{
  "id": "uuid",
  "invoiceId": "uuid",
  "description": "string",
  "quantity": 1,
  "unitPriceCents": 50000,
  "amountCents": 50000,
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

### Payment

Returned by payment create.

```
{
  "id": "uuid",
  "status": "PENDING | SUCCEEDED | FAILED | REFUNDED | CANCELED",
  "method": "STRIPE | ZELLE",
  "invoiceId": "uuid",
  "currency": "USD",
  "amountCents": 50000,
  "processingFeeCents": 1500,
  "totalChargedCents": 51500,
  "paidAt": "ISO-8601 | null",
  "stripePaymentIntentId": "string | null",
  "stripeChargeId": "string | null",
  "stripeReceiptUrl": "string | null",
  "notes": "string | null",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

## Endpoints

### GET `/invoices`

List all invoices (staff only).

- Auth: JWT (staff role required).
- Response: `200 OK` with `Invoice[]` (see "Invoice (with relations)").
- Errors: `403` if not staff.

### GET `/invoices/me`

List invoices for the authenticated client.

- Auth: JWT with `clientId`.
- Response: `200 OK` with `Invoice[]` (see "Invoice (with relations)").
- Errors: `403` if the user is not associated with a client.

### POST `/invoices`

Create an invoice (staff only).

- Auth: JWT (staff role required).
- Body:
  - `invoiceNumber` (string, 3-50 chars, required)
  - `clientId` (uuid, required)
  - `projectId` (uuid, optional)
  - `issuedAt` (ISO-8601 string, optional)
  - `paidAt` (ISO-8601 string, optional)
  - `currency` (string, 3-10 chars, optional, default `USD`)
  - `memo` (string, max 500 chars, optional)
  - `terms` (string, max 1000 chars, optional)
  - `lineItems` (array, min 1, required)
    - `description` (string, 1-200 chars, required)
    - `quantity` (int, min 1, optional, default `1`)
    - `unitPriceCents` (int, min 0, required)
- Response: `201 Created` with `Invoice` (see "Invoice (with relations)").
- Errors:
  - `400` if no line items
  - `403` if not staff or project does not belong to client

### PATCH `/invoices/:invoiceId`

Update an invoice (staff only).

- Auth: JWT (staff role required).
- Params: `invoiceId` (uuid)
- Body (all optional):
  - `invoiceNumber` (string, 3-50 chars)
  - `clientId` (uuid)
  - `projectId` (uuid)
  - `issuedAt` (ISO-8601 string)
  - `paidAt` (ISO-8601 string)
  - `status` (`DRAFT | DUE | OVERDUE | PAID | VOID`)
  - `currency` (string, 3-10 chars)
  - `memo` (string, max 500 chars)
  - `terms` (string, max 1000 chars)
- Response: `200 OK` with `Invoice` (see "Invoice (with relations)").
- Errors:
  - `403` if not staff or project does not belong to client
  - `404` if invoice does not exist

### POST `/invoices/:invoiceId/line-items`

Add a line item (staff only).

- Auth: JWT (staff role required).
- Params: `invoiceId` (uuid)
- Body:
  - `description` (string, 1-200 chars, required)
  - `quantity` (int, min 1, optional, default `1`)
  - `unitPriceCents` (int, min 0, required)
- Response: `201 Created` with `InvoiceLineItem` (see "Invoice line item").
- Errors:
  - `403` if not staff
  - `404` if invoice does not exist

### PATCH `/invoices/:invoiceId/line-items/:lineItemId`

Update a line item (staff only).

- Auth: JWT (staff role required).
- Params:
  - `invoiceId` (uuid)
  - `lineItemId` (uuid)
- Body (all optional):
  - `description` (string, 1-200 chars)
  - `quantity` (int, min 1)
  - `unitPriceCents` (int, min 0)
- Response: `200 OK` with `InvoiceLineItem` (see "Invoice line item").
- Errors:
  - `403` if not staff
  - `404` if line item not found or does not belong to invoice

### POST `/invoices/:invoiceId/payments`

Create a payment (staff only).

- Auth: JWT (staff role required).
- Params: `invoiceId` (uuid)
- Body:
  - `method` (`STRIPE | ZELLE`, required)
  - `status` (`PENDING | SUCCEEDED | FAILED | REFUNDED | CANCELED`, optional, default `PENDING`)
  - `paidAt` (ISO-8601 string, optional)
  - `notes` (string, max 500 chars, optional)
  - `stripePaymentIntentId` (string, max 200 chars, optional)
  - `stripeChargeId` (string, max 200 chars, optional)
  - `stripeReceiptUrl` (string, max 500 chars, optional)
- Response: `201 Created` with `Payment` (see "Payment").
- Errors:
  - `403` if not staff
  - `404` if invoice does not exist
