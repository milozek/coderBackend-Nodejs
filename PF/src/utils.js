import path from "path";
import url from "url";
import bcrypt, { hashSync } from "bcrypt";
import { faker } from '@faker-js/faker';
import ProductService from "./services/products.service.js";
const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = (password) => {
  const result = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  return result;
};

export const isValidPassword = (password, user) => {
  const result = bcrypt.compareSync(password, user.password);
  return result;
};



export const generateProducts = async () => {


  let user = [];

  for (let index = 0; index < 101; index++) {
    const productObjetCreate = {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      thumbnail: faker.image.urlLoremFlickr(),
      price: faker.commerce.price({ min: 20, max: 200 }),
      code: faker.string.alphanumeric({ length: 10 }),
      stock: faker.number.int({ min: 3, max: 30 })
    };
    user.push(productObjetCreate);
  }

  const createRandomUser = await ProductService.insertMany(user)

  return createRandomUser

};

