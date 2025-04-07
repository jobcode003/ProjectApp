let cart = [];//we declare an empty cart array

// the following code will execute once the page completely loads
window.onload = () => {
    fetch('comm.php?action=getProducts')// this starts a fetch api  that fetches data from the php backend in the specified url
        .then(res => res.json())//the fetched data is transformed into a json format
        //the following code specifies what should be done withe fetched data
        .then(products => {
            const productDiv = document.getElementById('products');// get the html element with the specified id
            products.forEach(p => { //loops through the fetched data and aliases it as p
                //after looping through the data,it is placed in the html element using the innerHTML function
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
//the following piece of code adds selected data items into the cart section
function addToCart(id, name, price) {//this is a function with 3 parameters, id, name and price
    const existing = cart.find(item => item.id === id);//this line of code checks if the item to be added to the cart is already there
    if (existing) {
        existing.qty += 1;//if the selected item is found then the quantity of it is incremented by 1
    } else {
        cart.push({ id, name, price, qty: 1 });//if the selected item is not found then it is added into the
        //empty  cart array
    }
    renderCart();// this is a function to display cart items in the webpage
}

function renderCart() {//function to display the cart items in the page
    let total = 0;//create a variable to hold the total
    const cartDiv = document.getElementById('cart');//access the  cart section
    cartDiv.innerHTML = '';
    cart.forEach(item => {//loops through the items in the cart section and aliases them as item
        total += item.price * item.qty;//calculates the total and assigns it to the total variable
        //the code below clacolates the total and displays it in a p tag with the total rounded off to 2decimal places
        cartDiv.innerHTML += `<p>${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}</p>`;
    });
    document.getElementById('total').innerText = total.toFixed(2);//display the total
}

//this is a checkout function that sends the cart items data to the php backend
function checkout() {
    fetch('comm.php?action=checkout', {//sends a request to the backend to perform a checkout
        method: 'POST',//informs the server of the method used
        headers: { 'Content-Type': 'application/json' },//sets a request header that the content type is a json format
        body: JSON.stringify(cart)//converts cart items into json strings
    }).then(res => res.text()) //convert the response into text format
        .then(msg => {//process the response
            alert(msg);
            cart = [];//clears the cart after a checkout
            renderCart();//displays the cart
        });
}
