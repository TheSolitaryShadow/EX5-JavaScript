//JS about slide
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const carousel = document.getElementById('carousel');

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

showSlide(currentSlide);
startAutoSlide();

//JS about hamburger
const burger = document.getElementById('mainNav');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle("show");
});

//JS about table
//name
document.getElementById('registrationform').addEventListener('submit', function(submit) {
submit.preventDefault();
const name=document.getElementById("name").value.trim();
const nameError = document.getElementById("nameError");
if (name ===''){
    nameError.textContent="Name is required.";
    isValid=false;
}

//email
const email=document.getElementById("email").value.trim();
const emailError=document.getElementById("emailError").value.trim();
const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if(!emailPattern.test(email)){
    emailError.textContent="Enter a valid email."
    isValid=false;
}

//dob
const dob=document.getElementById("dob").value;
const dobError=document.getElementById("dobError").value;
if(!dob){
    dobError.textContent="Select your birth date.";
    isValid=false;
}

//gender
const gender=document.querySelector('input[name="gender"]:checked');
const genderError=document.getElementById("genderError");
if(!gender){
    genderError.textContent="Please select your gender.";
    isValid=false
}

//ticket
const ticket = document.getElementById("ticket").value;
const ticketError = document.getElementById("ticketError");
if (ticket==="") {
    ticketError.textContent = "Choose a ticket type.";
    isValid = false;
}

//no-of-visitors
const visitors=document.getElementById("no-of-visitors").value;
const visitorsError=document.getElementById("visitorsError");
if(visitors===""){
    visitorsError.textContent="Select the number of visitors.";
    isValid=false;
}

//date-of-visit
const date=document.getElementById("date-of-visit").value;
const visitDateError=document.getElementById("visitDateError");
if(date===""){
    visitDateError.textContent="Select your visit date."
    isValid=false;
}

if(isValid){
    alert("Form submitted successfully!");
}
});



let products = [];
let cart = [];

fetch('ghibli_merchandise.json')
  .then(response => response.json())
  .then(jsArrayObjects => {
    products = jsArrayObjects;
    displayProducts(products);
        });
  
      
function displayProducts(productList=products) {
    const container = document.getElementById('productList');
    container.innerHTML = ""; 
    
    productList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="assets/${product.id}.jpg" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        container.appendChild(card);
        card.querySelector('.add-to-cart').addEventListener('click', () => {
          addToCart(product.id);
        });
    });
}

function searchProducts() {
  const searchString = document.getElementById('search').value.toLowerCase();
  const searchResult = products.filter(product => 
      product.name.toLowerCase().includes(searchString)
  );
  displayProducts(searchResult);
}

document.getElementById('search').addEventListener('input', searchProducts);

function addToCart(id) {
  const product = products.find(p => p["id"] === id);
  cart.push(product);
  updateCart();
  showCheckoutButton();
}


function updateCart() {
  const cartList = document.getElementById('cartList');
  cartList.innerHTML = "";
  cartList.className = "produce-cartList"
  cartList.innerHTML = cart.map(i => `<ol><li>${i.name} - $${i.price}</li></ol>`).join("");
}

function checkout() {
  const checkoutForm = document.getElementById('cart');
  checkoutForm.style.display = 'block';
}

function showCheckoutButton() {
  const checkoutButton = document.getElementById('checkout-button');
  if (cart.length > 0 && !checkoutButton.classList.contains('visible')) {
      checkoutButton.classList.add('visible');
  }
}

function proceedToBuy() {
  const checkoutForm = document.getElementById('checkout-form');
  checkoutForm.style.display = 'block';
}

function confirmPurchase() {
  const name = document.getElementById('checkout-name').value;
  const email = document.getElementById('checkout-email').value;
  const address = document.getElementById('checkout-address').value;
  const paymentMethod = document.getElementById('payment-method').value;
  const cardNumber = document.getElementById('card-number').value;
  const expiry = document.getElementById('expiry').value;
  const CVV = document.getElementById('CVV').value;

  if (name && email && address && paymentMethod && cardNumber && expiry && CVV) {
      alert('Purchase confirmed!');
      cart = []; 
      document.getElementById('checkout-form').style.display = 'none';
  } else {
      alert('Please fill all fields.');
  }
}

function confirmPurchase() {
  const name = document.getElementById('checkout-name').value;
  const email = document.getElementById('checkout-email').value;
  const address = document.getElementById('checkout-address').value;
  const paymentMethod = document.getElementById('payment-method').value;
  const cardNumber = document.getElementById('card-number').value;
  const expiry = document.getElementById('expiry').value;
  const CVV = document.getElementById('CVV').value;

  if (name && email && address && paymentMethod && cardNumber && expiry && CVV) {
      const total = cart.reduce((sum, product) => sum + product.price, 0);
      const confirmationMessage = `
          <h2>Order Confirmed!</h2>
          <p>Thank you, ${name}!</p>
          <p>Your order of ${cart.length} items totaling <strong>$${total.toFixed(2)}</strong> will be delivered to:</p>
          <p>${address}</p>
          <p>Expect your package in 3-4 working days.</p>
          <button onclick="goBackToShopping()">Back to Shopping</button>
      `;
      document.getElementById('confirmation-container').innerHTML = confirmationMessage;
      document.getElementById('confirmation-container').style.display = 'block';
  } else {
      alert('Please fill all fields.');
  }
}


