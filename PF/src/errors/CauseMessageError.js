export const generatorUserError = (data) => {
  return `Products missing or invalid values:
    - title must be a string:           ${data.title}

    - description must be a string:      ${data.description}

    - thumbnail must be a string:         ${data.thumbnail}

    - price must be a num:                   ${data.price}

    - code must be a num:                   ${data.code}
    
    - stock must be a num:                   ${data.stock}
    `;
};

export const generatorID = (pid) => {
  return `The cart is: ${pid}, you have to create a new cart or to login   
  `;
};
