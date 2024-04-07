(function () {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM content loaded");

    const deleteButtons = document.querySelectorAll("button[data-product-id]");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = button.getAttribute("data-product-id");
        deleteProduct(productId);
      });
    });
  });

  async function deleteProduct(productId) {
    console.log("The product ID is: ", productId);

    try {
      const responseProduct = await fetch(`/api/testDelete/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (responseProduct.ok) {
        console.log("Product deleted");
        location.reload();
      } else {
        console.error("Error while deleting product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
})();
