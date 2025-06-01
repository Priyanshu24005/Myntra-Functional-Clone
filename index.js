
let search = document.querySelector(".search_input");

search.addEventListener("input", () => {
  let searchInput = search.value.toLowerCase();
  let allProducts = document.querySelectorAll(".product");

  allProducts.forEach((product) => {
    let productName = product.querySelector(".head").innerText.toLowerCase();
    if (productName.includes(searchInput)) {
      product.style.display = "block";
      sliderContainer.style.display = "none";
    } else {
      product.style.display = "none";
    }
  });
});

let itemcontainer = document.getElementById("items-container");
let cartcount = localStorage.getItem("addcart")
  ? parseInt(localStorage.getItem("addcart"))
  : 0;
document.querySelector(".bag-items").innerText = cartcount;


function product(detail) {
  let product = document.createElement("div");
  product.className = "product";

  product.innerHTML = `
        <div class="product-card">
            <img src="${detail.image}" alt="Product Image">
            <div class="head">${detail.title}</div>
            <p class="price">$${detail.price}</p>
            <button class="buy">Add to Cart</button>
        </div>   
    `;

 
  if (itemcontainer) {
    itemcontainer.appendChild(product);
  }

 
  product.querySelector(".buy").addEventListener('click', () => {
    alert("Item Added To Cart");
    cartcount++;
    document.querySelector(".bag-items").innerText = cartcount;

    
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Add new item
    cart.push({
        id: detail.id,
        title: detail.title,
        price: detail.price,
        image: detail.image
    });

   
    localStorage.setItem("cartItems", JSON.stringify(cart));
    localStorage.setItem("addcart", cartcount);
});

}


async function datafetch(i) {
  try {
    let response = await fetch(`https://fakestoreapi.com/products/${i}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    let result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

async function fetchImages() {
  for (let i = 1; i <= 20; i++) {
    let productItems = await datafetch(i);

    if (productItems) {
      product(productItems);
    }
  }
}

fetchImages();

let sliderContainer = document.querySelector(".slider-container");


let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let img = document.querySelectorAll(".image-container img");
let image_container = document.querySelector(".image-container");

let currentImage = 1;
let Timeout;

function updateimage() {
  if (currentImage > img.length) {
    currentImage = 1;
  } else if (currentImage < 1) {
    currentImage = img.length;
  }

  image_container.style.transform = `translateX(-${
    (currentImage - 1) * 900
  }px)`;

  clearTimeout(Timeout);
  Timeout = setTimeout(() => {
    currentImage++;
    updateimage();
  }, 3000);
}

updateimage();
