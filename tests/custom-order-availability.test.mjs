// Run with: node --test tests/custom-order-availability.test.mjs
// Resend is replaced before loading the route. These tests never send email.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { z } from "zod";

const compile = (path) =>
  ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
const spam = { exports: {} };
vm.runInNewContext(compile("../src/lib/spam.ts"), { exports: spam.exports });
const route = compile(
  "../src/app/api/contact/custom-order-availability/route.ts",
);

function setup({
  env = {
    RESEND_API_KEY: "test-only",
    SENDER_EMAIL: "sender@example.com",
    RECEIVER_EMAIL: "megan@example.com",
  },
  error = null,
  throws = false,
} = {}) {
  const calls = [];
  const exports = {};
  vm.runInNewContext(route, {
    exports,
    Response,
    process: { env },
    require(name) {
      if (name === "zod") return { z };
      if (name === "@/lib/spam") return spam.exports;
      if (name === "resend")
        return {
          Resend: class {
            emails = {
              send: async (message) => {
                calls.push(message);
                if (throws)
                  throw new Error("provider secret must not be exposed");
                return { error };
              },
            };
          },
        };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return { post: exports.POST, calls };
}
const request = (body) =>
  new Request("http://localhost/api/contact/custom-order-availability", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

test("forwards a trimmed opt-in email to the configured recipient, not the visitor", async () => {
  const { post, calls } = setup();
  const response = await post(
    request({ email: " visitor@example.com ", company: "", consent: true }),
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].to, "megan@example.com");
  assert.equal(calls[0].replyTo, "visitor@example.com");
  assert.match(
    calls[0].text,
    /not an order, a reservation, or a marketing subscription/,
  );
  assert.equal(calls[0].html, undefined);
});

for (const [label, body] of Object.entries({
  "missing email": { consent: true },
  "invalid email": { email: "invalid", consent: true },
  "wrong email type": { email: {}, consent: true },
  "long email": { email: `${"a".repeat(250)}@example.com`, consent: true },
  "missing consent": { email: "visitor@example.com" },
  "false consent": { email: "visitor@example.com", consent: false },
  honeypot: { email: "visitor@example.com", consent: true, company: "bot" },
  "wrong honeypot type": {
    email: "visitor@example.com",
    consent: true,
    company: {},
  },
  "null body": null,
})) {
  test(`rejects ${label} without sending`, async () => {
    const { post, calls } = setup();
    assert.equal((await post(request(body))).status, 400);
    assert.equal(calls.length, 0);
  });
}

test("rejects malformed JSON without sending", async () => {
  const { post, calls } = setup();
  assert.equal(
    (await post(new Request("http://localhost", { method: "POST", body: "{" })))
      .status,
    400,
  );
  assert.equal(calls.length, 0);
});

for (const key of ["RESEND_API_KEY", "SENDER_EMAIL", "RECEIVER_EMAIL"]) {
  test(`missing ${key} returns unavailable without sending`, async () => {
    const env = {
      RESEND_API_KEY: "test-only",
      SENDER_EMAIL: "sender@example.com",
      RECEIVER_EMAIL: "megan@example.com",
    };
    delete env[key];
    const { post, calls } = setup({ env });
    assert.equal(
      (await post(request({ email: "visitor@example.com", consent: true })))
        .status,
      503,
    );
    assert.equal(calls.length, 0);
  });
}

for (const options of [
  { error: { message: "provider secret must not be exposed" } },
  { throws: true },
]) {
  test(`provider ${options.throws ? "exception" : "error"} returns a safe failure`, async () => {
    const { post } = setup(options);
    const response = await post(
      request({ email: "visitor@example.com", consent: true }),
    );
    assert.equal(response.status, 502);
    assert.doesNotMatch(await response.text(), /provider secret/);
  });
}
