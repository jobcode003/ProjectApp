let cart = [];

window.onload = () => {
    fetch('comm.php?action=getProducts')
        .then(res => res.json())
        .then(products => {
            const productDiv = document.getElementById('products');
            products.forEach(p => {
                productDiv.innerHTML += `
          <div class="product">
            <img src="${p.image_url}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <p>$${p.price}</p>
            <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
          </div>`;
            });
        });
};

function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    renderCart();
}

function renderCart() {
    let total = 0;
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    cart.forEach(item => {
        total += item.price * item.qty;
        cartDiv.innerHTML += `<p>${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}</p>`;
    });
    document.getElementById('total').innerText = total.toFixed(2);
}

function checkout() {
    fetch('comm.php?action=checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart)
    }).then(res => res.text())
        .then(msg => {
            alert(msg);
            cart = [];
            renderCart();
        });
}
