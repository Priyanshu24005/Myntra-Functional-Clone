let bagContainer = document.querySelector(".bag-items-container");
let bagCount = document.querySelector(".bag-items");
let itemCountDisplay = document.querySelector("#item-count");
let totalPriceDisplay = document.querySelector("#total-mrp");
let totalAmount = document.querySelector("#total-amount");
let discountDisplay = document.querySelector("#discount");

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function updateCart() {

  bagContainer.innerHTML = "";

  let totalPrice = 0;
  let totalamount = 0;
  let discount = 0;

  cartItems.forEach((item, index) => {
    totalPrice += item.price;
    discount = totalPrice * 0.15;
    totalamount = totalPrice - discount + 5;

    let bagItem = document.createElement("div");
    bagItem.className = "cart-item";
    bagItem.innerHTML = `
            <img src="${item.image}" alt="item">
            <div class="cart-info">
                <p>${item.title}</p>
                <p>$${item.price.toFixed(2)}</p>
                <h4>Estimated Dilivery in ${item.id} days</4>
                <button class="remove" data-index="${index}">Remove</button>
            </div>
        `;
    bagContainer.appendChild(bagItem);
  });

 
  bagCount.innerText = cartItems.length;
  itemCountDisplay.innerText = cartItems.length;
  totalPriceDisplay.innerText = `$${totalPrice.toFixed(2)}`;
  discountDisplay.innerText = `$${discount.toFixed(2)}`;
  totalAmount.innerText = `$${totalamount.toFixed(2)}`;

  
}

bagContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    let index = e.target.getAttribute("data-index");
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("addcart", cartItems.length);
    updateCart(); 
  }
});

let btn = document.querySelector(".btn-place-order");

  btn.addEventListener("click", () => {
    alert(`Order has been Placed Successfully`);
  });

updateCart();
