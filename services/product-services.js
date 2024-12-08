const BASE_URL = "http://localhost:3001/products";

const productList = async () => {
  const response = await fetch(BASE_URL);
  return await response.json();
};

const createProduct = async (name, price, image) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price, image }),
  });
  return await response.json();
};

const deleteProduct = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

export const servicesProducts = {
  productList,
  createProduct,
  deleteProduct,
};
