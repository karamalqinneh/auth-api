"use strict";

const server = require("../src/server");

const supertest = require("supertest");

const request = supertest(server.app);
const { database } = require("../src/models/index");

beforeAll(async () => {
  await database.sync();
});
afterAll(async () => {
  await database.drop();
});

describe("unit testing", () => {
  it("POST /signup creates a new user and sends an object with the user", async () => {
    let user = {
      username: "kqinneh",
      password: "1234",
      role: "admin",
    };
    const response = await request.post("/signup").send(user);
    expect(response.status).toEqual(201);
  });

  it("POST to /signin to login as a user (use basic auth)", async () => {
    let user = {
      username: "kqinneh",
      password: "1234",
      role: "admin",
    };
    const response = await request
      .post("/signin")
      .auth(user.username, user.password);
    expect(response.status).toBe(200);
  });
});
