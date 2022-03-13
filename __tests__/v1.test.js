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

describe("testing db routesr", () => {
  it("can get list of records", async () => {
    const response = await request.get("/contact");
    expect(response.status).toBe(200);
  });
  it("404 on a bad route", async () => {
    const response = await request.get("/brokeLink");
    expect(response.status).toEqual(404);
  });
  it("404 on a bad method", async () => {
    const response = await request.post("/contact/1");
    expect(response.status).toEqual(404);
  });
  it("Create a record using POST", async () => {
    const response = await request.post("/contact");
    expect(response.status).toEqual(201);
  });

  it("Read a list of records using GET", async () => {
    const response = await request.get("/contact");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it("Update a record using PUT", async () => {
    const response = await request.put("/contact/1");
    expect(typeof response.body).toEqual("object");
  });

  it("Destroy a record using DELETE", async () => {
    const response = await request.delete("/contact/1");
    expect(response.status).toEqual(201);
  });
});
