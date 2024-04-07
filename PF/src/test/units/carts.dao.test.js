import supertest from "supertest";
import { expect } from "chai";

const baseURL = "http://localhost:8080/api";
const request = supertest(baseURL);

describe("Cart Routes", () => {
  describe("GET /cartsview/:uid", () => {
    it("Should return a user's cart", async () => {
      const userId = "65ef23714bfab7b8c00acd71";
      const role = "admin";
      const agent = request.agent();

      agent.user = { role };

      const response = await agent.get(`/cartsview/${userId}`);

      const { statusCode, ok, body } = response;
      console.log("Body: ", body);
      console.log("Response: ", response.header);

      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;

      expect(body).to.exist;
      expect(body).to.have.property("status");
      expect(body).to.have.property("payload");
    });
  });
});

describe("add product to cart", () => {
  it("Should add a product to the cart", async () => {
    const product = "65d7d565ec465e35d2519399";
    const response = await request.post(`/add-to-cart/${product}`);
    const { statusCode, ok, _body } = response;
    console.log("Response:", response.text);
    expect(statusCode).to.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.exist;
    expect(_body).to.have.property("status");
    expect(_body).to.have.property("payload");
  });
});
