import mongoose from "mongoose";
import productsDaoMongoDB from "../../dao/products.dao.js";
import { expect } from "chai";

describe("DB connection", function () {
  before(async function () {
    await mongoose.connect("");

    this.productsDaoMongoDB = productsDaoMongoDB;
  });

  it("Should successfully create a product", async function () {
    const data = {
      title: "Product name",
      description: "Product description",
      thumbnail: "Product image URL",
      price: 19.99,
      code: "ABC123",
      stock: 100,
      owner: {
        email: "owner@domain.com",
        role: "owner",
      },
    };

    const result = await this.productsDaoMongoDB.create(data);

    expect(result).to.exist;
    expect(result.title).to.equal(data.title);
    expect(result.description).to.equal(data.description);
  });
});
