// ===== BAJI G - PAKISTANI LADIES FASHION =====
// Pure JavaScript - No build tools needed

// ===== PRODUCT DATA =====
const products = [
  {
    id: 1, name: "Pista Green Embroidered Suit", price: 28500, category: "Silk",
    image: "./images/dress1.jpg",
    description: "Elegant pista green shalwar kameez with intricate thread embroidery and matching dupatta.",
    details: "Premium silk blend with delicate Pakistani hand embroidery. Features a flowing dupatta and tailored shalwar. Perfect for Eid gatherings and formal events. Export quality finish.",
    colors: ["#A8C686", "#B89778", "#3C2F2B"], sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 2, name: "Maroon Velvet Formal Suit", price: 19800, category: "Formal",
    image: "./images/dress2.jpg",
    description: "Rich maroon velvet formal with heavy silver zardozi and crystal embellishments.",
    details: "Luxurious velvet fabric adorned with traditional Pakistani zardozi work. Ideal for weddings and evening functions. Handcrafted by master artisans in Karachi.",
    colors: ["#6B1C2C", "#8C8C8C", "#3F2E2A"], sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 3, name: "Pink Printed Lawn Summer", price: 12400, category: "Lawn",
    image: "./images/dress3.jpg",
    description: "Soft pink lawn cotton with digital prints and lightweight chiffon dupatta.",
    details: "Breathable premium lawn perfect for Pakistani summers. Beautiful digital prints with elegant dupatta. A favorite in Lahore, Karachi & Islamabad markets.",
    colors: ["#E8A8C8", "#C5A28F", "#8F6652"], sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 4, name: "Red Bridal Lehenga Set", price: 68500, category: "Bridal",
    image: "./images/dress4.jpg",
    description: "Traditional red bridal lehenga with gold gota work and matching jewelry.",
    details: "Authentic Pakistani bridal couture featuring heavy gota, zari and mirror work. Complete with traditional jewelry styling. Perfect for Barat and Walima ceremonies.",
    colors: ["#C41E1E", "#B89778", "#3F2E2A"], sizes: ["S", "M", "L"]
  },
  {
    id: 5, name: "Black Gold Evening Maxi", price: 24900, category: "Formal",
    image: "./images/dress5.jpg",
    description: "Stunning black maxi with gold sequin patterns and sheer sleeves.",
    details: "Floor-length evening wear with exquisite gold sequin detailing. Elegant silhouette perfect for formal dinners and receptions. High-end export quality.",
    colors: ["#1A1A1A", "#B89778", "#4A3428"], sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 6, name: "Turquoise Chiffon Elegance", price: 16750, category: "Silk",
    image: "./images/dress6.jpg",
    description: "Vibrant turquoise chiffon suit with floral embroidery and printed dupatta.",
    details: "Lightweight chiffon with delicate floral hand embroidery. Comes with a beautifully printed dupatta. Ideal for daytime events and festive occasions across Pakistan.",
    colors: ["#2EAAA8", "#B89778", "#C9A26A"], sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 7, name: "Ivory Gold Formal Dress", price: 31200, category: "Bridal",
    image: "./images/dress7.jpg",
    description: "Ivory white formal dress with gold zari cuffs and pearl neckline details.",
    details: "Elegant ivory fabric with gold zari work on cuffs and neckline. Pearl embellishments add timeless grace. Perfect for engagement, Nikah or reception events.",
    colors: ["#F5F0E6", "#B89778", "#8B664A"], sizes: ["S", "M", "L"]
  },
  {
    id: 8, name: "Teal & Yellow Festive Lawn", price: 15400, category: "Lawn",
    image: "./images/dress8.jpg",
    description: "Teal blue lawn suit with mustard dupatta and traditional embroidery.",
    details: "Vibrant teal lawn with contrasting mustard dupatta. Traditional embroidery on neckline and sleeves. Perfect for Mehndi, Eid and spring celebrations.",
    colors: ["#1E6B6B", "#B07B2D", "#C9A26A"], sizes: ["XS", "S", "M", "L", "XL"]
  }
];

// ===== STATE =====
let cart = [];
let activeFilter = "All";
let searchTerm = "";
let sortMode = "default";
let selectedProduct = null;
let selectedColor = "";
let selectedSize = "";
let modalQty = 1;

// ===== DOM ELEMENTS =====
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.getElementById('filterButtons');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const cartCount = document.getElementById('cartCount');
const mobileCartCount = document.getElementById('mobileCartCount');
const drawerCartCount = document.getElementById('drawerCartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartFooter = document.getElementById('cartFooter');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const cartOverlay = document.getElementById('cartOverlay');
const checkoutOverlay = document.getElementById('checkoutOverlay');
const marqueeTrack = document.getElementById('marqueeTrack');
const yearSpan = document.getElementById('year');

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  yearSpan.textContent = new Date().getFullYear();
  renderMarquee();
  renderProducts();
  setupEventListeners();
  setupScrollSpy();
});

// ===== MARQUEE =====
function renderMarquee() {
  const images = [...products.map(p => p.image), ...products.map(p => p.image)];
  marqueeTrack.innerHTML = images.map(img =>
    `<img src="${img}" alt="Baji G Dress" class="marquee-img" loading="lazy">`
  ).join('');
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
  let result = [...products];

  if (activeFilter !== "All") {
    result = result.filter(p => p.category === activeFilter);
  }

  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase().trim();
    result = result.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }

  if (sortMode === "price-low") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortMode === "price-high") {
    result.sort((a, b) => b.price - a.price);
  }

  if (result.length === 0) {
    productsGrid.innerHTML = `<div class="no-results">No dresses found matching your search. Please try other filters.</div>`;
    return;
  }

  productsGrid.innerHTML = result.map(product => `
    <div class="product-card" onclick="openProductModal(${product.id})">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-badge">${product.category}</span>
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">PKR ${product.price.toLocaleString()}</div>
        <p class="product-desc">${product.description}</p>
        <button class="btn-emerald" onclick="event.stopPropagation(); openProductModal(${product.id})">VIEW DETAILS & ADD TO CART</button>
      </div>
    </div>
  `).join('');
}

// ===== FILTER EVENTS =====
function setupEventListeners() {
  // Filter buttons
  filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  // Search
  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderProducts();
  });

  // Sort
  sortSelect.addEventListener('change', (e) => {
    sortMode = e.target.value;
    renderProducts();
  });

  // Mobile menu
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('active');
  });
  document.getElementById('mobileClose').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('active');
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.remove('active');
    });
  });

  // Cart
  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('mobileCartBtn').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('active');
    openCart();
  });
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('cartContinue').addEventListener('click', closeCart);
  document.getElementById('cartDrawer').addEventListener('click', e => e.stopPropagation());

  // Checkout
  document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
  document.getElementById('checkoutClose').addEventListener('click', closeCheckout);
  document.getElementById('checkoutOverlay').addEventListener('click', closeCheckout);
  document.querySelector('.checkout-modal').addEventListener('click', e => e.stopPropagation());
  document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);

  // Product modal
  document.getElementById('modalClose').addEventListener('click', closeProductModal);
  document.getElementById('productModal').addEventListener('click', closeProductModal);
  document.querySelector('.modal').addEventListener('click', e => e.stopPropagation());

  // Contact form
  document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);
}

// ===== PRODUCT MODAL =====
function openProductModal(productId) {
  selectedProduct = products.find(p => p.id === productId);
  if (!selectedProduct) return;

  selectedColor = selectedProduct.colors[0];
  selectedSize = selectedProduct.sizes[0];
  modalQty = 1;

  modalBody.innerHTML = `
    <div class="modal-image">
      <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
    </div>
    <div class="modal-details">
      <div class="modal-category">${selectedProduct.category} &bull; PAKISTAN CRAFTED</div>
      <h3 class="modal-name">${selectedProduct.name}</h3>
      <div class="modal-price">PKR ${selectedProduct.price.toLocaleString()}</div>
      <p class="modal-desc">${selectedProduct.details}</p>

      <div class="modal-section-label">SELECT SHADE</div>
      <div class="color-swatches" id="modalColors"></div>

      <div class="modal-section-label">CHOOSE YOUR SIZE</div>
      <div class="size-buttons" id="modalSizes"></div>

      <div class="modal-actions">
        <div class="qty-control">
          <button onclick="updateModalQty(-1)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <span id="modalQtyDisplay">${modalQty}</span>
          <button onclick="updateModalQty(1)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
        <button class="btn-gold modal-add-btn" onclick="addToCart()">
          ADD TO CART &bull; PKR ${(selectedProduct.price * modalQty).toLocaleString()}
        </button>
      </div>
      <p class="modal-shipping">Ships from Karachi &bull; 3&ndash;8 days delivery across Pakistan &bull; Worldwide export available</p>
    </div>
  `;

  renderModalColors();
  renderModalSizes();
  productModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function renderModalColors() {
  const container = document.getElementById('modalColors');
  if (!container) return;
  container.innerHTML = selectedProduct.colors.map((col, i) =>
    `<div class="color-swatch ${col === selectedColor ? 'active' : ''}" style="background:${col}" onclick="selectColor('${col}')"></div>`
  ).join('');
}

function renderModalSizes() {
  const container = document.getElementById('modalSizes');
  if (!container) return;
  container.innerHTML = selectedProduct.sizes.map(size =>
    `<button class="size-btn ${size === selectedSize ? 'active' : ''}" onclick="selectSize('${size}')">${size}</button>`
  ).join('');
}

function selectColor(color) {
  selectedColor = color;
  renderModalColors();
}

function selectSize(size) {
  selectedSize = size;
  renderModalSizes();
}

function updateModalQty(delta) {
  modalQty = Math.max(1, modalQty + delta);
  document.getElementById('modalQtyDisplay').textContent = modalQty;
  const btn = document.querySelector('.modal-add-btn');
  if (btn) btn.textContent = `ADD TO CART \u2022 PKR ${(selectedProduct.price * modalQty).toLocaleString()}`;
}

function closeProductModal() {
  productModal.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== CART =====
function addToCart() {
  if (!selectedProduct || !selectedColor || !selectedSize) return;

  const existing = cart.findIndex(
    item => item.id === selectedProduct.id &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
  );

  if (existing !== -1) {
    cart[existing].quantity += modalQty;
  } else {
    cart.push({
      ...selectedProduct,
      selectedColor,
      selectedSize,
      quantity: modalQty
    });
  }

  closeProductModal();
  updateCartUI();
  openCart();
}

function updateCartQty(index, newQty) {
  if (newQty < 1) return;
  cart[index].quantity = newQty;
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = count;
  mobileCartCount.textContent = count;
  drawerCartCount.textContent = count;
  cartTotal.textContent = `PKR ${total.toLocaleString()}`;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <h3>Your cart is empty</h3>
        <p>Discover our beautiful Pakistani dresses</p>
        <button class="btn-emerald" onclick="closeCart(); window.location.href='#collections'" style="width:auto; padding: 12px 32px;">BROWSE COLLECTIONS</button>
      </div>
    `;
    cartFooter.style.display = 'none';
  } else {
    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">PKR ${item.price.toLocaleString()} &times; ${item.quantity}</div>
          <div class="cart-item-variant">Color &bull; Size: ${item.selectedColor} / ${item.selectedSize}</div>
          <div class="cart-item-actions">
            <div class="cart-item-qty">
              <button onclick="updateCartQty(${index}, ${item.quantity - 1})">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span>${item.quantity}</span>
              <button onclick="updateCartQty(${index}, ${item.quantity + 1})">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
        <div class="cart-item-total">PKR ${(item.price * item.quantity).toLocaleString()}</div>
      </div>
    `).join('');
    cartFooter.style.display = 'block';
  }
}

function openCart() {
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== CHECKOUT =====
function openCheckout() {
  closeCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('checkoutItemCount').textContent = cart.length;
  document.getElementById('checkoutAmount').textContent = `PKR ${total.toLocaleString()}`;
  document.getElementById('checkoutContent').style.display = 'block';
  document.getElementById('checkoutSuccess').classList.remove('active');
  checkoutOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  checkoutOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function handleCheckout(e) {
  e.preventDefault();
  document.getElementById('checkoutContent').style.display = 'none';
  document.getElementById('checkoutSuccess').classList.add('active');

  setTimeout(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cart = [];
    updateCartUI();
    closeCheckout();
    alert(`Thank you! Your order of PKR ${total.toLocaleString()} has been placed successfully. Our team in Lahore will contact you shortly for confirmation and delivery details.`);
  }, 1650);
}

// ===== CONTACT FORM =====
function handleContactSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');

  btn.textContent = 'SENDING YOUR MESSAGE...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'MESSAGE RECEIVED \u2014 THANK YOU!';
    success.classList.add('show');

    setTimeout(() => {
      btn.textContent = 'SEND MESSAGE TO BAJI G TEAM';
      btn.disabled = false;
      success.classList.remove('show');
      e.target.reset();
    }, 3200);
  }, 950);
}

// ===== SCROLL SPY =====
function setupScrollSpy() {
  const sections = ['home', 'collections', 'about', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 120) current = section;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
