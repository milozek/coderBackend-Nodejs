import productsModel from "../dao/models/products.model.js";
class ProfileController {
  static async getUserInformation(req) {
    return {
      name: req.user.first_name,
      role: req.user.role,
      user_id: req.user._id
    };
  }

  static async get(limit, page, sort, search) {
    const criteria = {};
    const options = { limit, page, sort };

    if (sort) {
      options.sort = { price: sort };
    }
    if (search) {
      criteria.price = search;
    }

    const {
      docs,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage
    } = await productsModel.paginate(criteria, options);

    const BASE_URL = "http://localhost:8080/api/profile";
    const prevLink = hasPrevPage
      ? `${BASE_URL}?sort=${sort}&search=${search}&page=${prevPage}&limit=${limit}`
      : null;
    const nextLink = hasNextPage
      ? `${BASE_URL}?sort=${sort}&search=${search}&page=${nextPage}&limit=${limit}`
      : null;

    return {
      status: "success",
      payload: docs.map((doc) => doc.toJSON()), 
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
    };
  }
}

export default ProfileController;
