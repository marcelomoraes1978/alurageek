import { servicesProducts } from "./services/product-services.js";

// Captura os elementos do DOM
const form = document.querySelector("[data-form]");
const productsContainer = document.querySelector("[data-product]");

// Cria um card para cada produto
function createCard({ name, price, image, id }) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${image}" alt="${name}">
    <p>${name}</p>
    <p>R$ ${price}</p>
    <button class="delete-button" data-id="${id}">
      <img src="./assets/delete.png" alt="Deletar">
    </button>
  `;

  // Adiciona evento de deletar
  const deleteButton = card.querySelector(".delete-button");
  deleteButton.addEventListener("click", async () => {
    try {
      await servicesProducts.deleteProduct(id);
      card.remove();
      console.log(`Produto com id ${id} deletado com sucesso`);
    } catch (error) {
      console.error(`Erro ao deletar produto ${id}:`, error);
    }
  });

  return card;
}

// Renderiza todos os produtos
async function renderProducts() {
  try {
    const products = await servicesProducts.productList();
    productsContainer.innerHTML = ""; // Limpa a lista de produtos
    products.forEach((product) => {
      const card = createCard(product);
      productsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao renderizar produtos:", error);
  }
}

// Adiciona produto pelo formulário
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("[data-name]").value.trim();
  const price = document.querySelector("[data-price]").value.trim();
  const image = document.querySelector("[data-image]").value.trim();

  if (!name || !price || !image) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  try {
    const newProduct = await servicesProducts.createProduct(name, price, image);
    const newCard = createCard(newProduct);
    productsContainer.appendChild(newCard);
    form.reset(); // Limpa o formulário
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
  }
});

// Inicializa a aplicação
renderProducts();
