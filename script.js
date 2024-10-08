let cart = [];

function addToCart(productName, productPrice) {
    // Adiciona o produto ao carrinho
    cart.push({ name: productName, price: productPrice });
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // Limpa a lista de itens do carrinho
    cartItems.innerHTML = '';

    // Adiciona itens ao carrinho
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2);
}
//limpa o carrinho e atualiza interface do usuario
function clearCart() {
    cart = [];
    updateCartUI();
}

function toggleCart() {
    const cartContent = document.getElementById('cart');
    cartContent.style.display = cartContent.style.display === 'none' || !cartContent.style.display ? 'block' : 'none';
}

function headerButtonAction() {
    alert('Nosso site, foi fundado em 2024, com o intuito ');
}
//botao de favoritos
const favoriteButtons = document.querySelectorAll('.fa-star');
favoriteButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault(); // evita que o navegador siga o link
      button.classList.toggle('active');
    });
  });

  //cadastro de produto
async function cadastrarproduto(event) {
    event.preventDefault()

    const nome = document.getElementById("nome").value
    const preco = Number(document.getElementById('preco').value)
    const descricao = document.getElementById("descricao").value
    const image = document.getElementById('image').files[0]

    let formData = new FormData();

    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('descricao', descricao);
    formData.append('image', image);

    const response = await fetch('http://localhost:3000/produto/cadastrar', {
        method: "POST",
        body: formData
    })

    const results = await response.json

    if(results.sucess) {
        alert(results.message)
    }
    else {
        alert(results.message)

    }
}