import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;
    let prod = this.cartItems.find((p) => p.product.name == product.name)
    if (prod) {
      prod.count += 1;
    }
    else {
      prod = { product, count: 1 };
      this.cartItems.push(prod);
    }
    this.onProductUpdate(prod);
  }

  updateProductCount(productId, amount) {
    let prod = this.cartItems.find((p) => p.product.id == productId);

    prod.count += amount;

    if (prod.count <= 0) {
      this.cartItems = this.cartItems.filter((item) => item.product.id != prod.product.id);
    }
    this.onProductUpdate(prod);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let count = 0;
    this.cartItems.forEach(item => count += item.count);
    return count;
  }

  getTotalPrice() {
    let price = 0;
    this.cartItems.forEach(item => price += item.count * item.product.price);
    return price;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    modal.setTitle("Your order");
    let body = document.createElement('div');
    for (let item of this.cartItems) {
      let itemHTML = this.renderProduct(item.product, item.count);
      body.innerHTML += itemHTML.outerHTML;
    }
    const form = this.renderOrderForm();
    body.innerHTML += form.outerHTML;
    
    body.querySelectorAll('.cart-counter__button_plus').forEach(item => {
      item.addEventListener('click', this.plusClick);
    });
    body.querySelectorAll('.cart-counter__button_minus').forEach(item => {
      item.addEventListener('click', this.minusClick);
    });

    modal.setBody(body);

    modal.elem.querySelector('form').onsubmit = (event) => this.onSubmit(event);

    modal.open();
    this.modal = modal;
    this.form = form;
  }

  plusClick = (event) => {
    let productId = event.target.closest('.cart-product').dataset.productId;
    this.updateProductCount(productId, 1);
  }

  minusClick = (event) => {
    let productId = event.target.closest('.cart-product').dataset.productId;
    this.updateProductCount(productId, -1);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this); 
    if (!document.body.classList.contains('is-modal-open')) { return; }

    if (this.cartItems.length == 0) {
      this.modal.close();

      return;
    }

    if (cartItem.count == 0) {
      this.modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"]`).remove();
    }
    else {
      let productId = cartItem.product.id;
      let productCount = this.modal.elem.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

      let productPrice = this.modal.elem.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      productCount.textContent = cartItem.count;
      productPrice.textContent = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
    }

    let infoPrice = this.modal.elem.querySelector(`.cart-buttons__info-price`);
    infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit(event) {
    event.preventDefault();
    this.modal.elem.querySelector('button[type="submit"]').classList.add("is-loading");

    let formData = new FormData(this.form);
    
    fetch('https://httpbin.org/post',
      {
        method: 'POST',
        body: formData
      }).then(response => {
        if (response.ok) {
          this.modal.setTitle('Success!');
          this.cartItems = [];
          const newBody = createElement(`
            <div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
            </div>
          `);
          this.modal.setBody(newBody);
        }
      })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

