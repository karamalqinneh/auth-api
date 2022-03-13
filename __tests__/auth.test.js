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

describe("testing basic_auth server", () => {
  it("POST to /signup to create a new user", async () => {
    let body = {
      username: "user",
      password: "testtest",
    };
    const response = await request.post("/signup").send(body);
    expect(response.status).toEqual(201);
  });
  it("POST to /signin to login as a user (use basic auth)", async () => {
    const response = await request.post("/signin").auth("user1", "testtest");
    expect(response.status).toEqual(200);
  });
});
