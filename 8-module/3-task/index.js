export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if(!product) return;
    let prod = this.cartItems.find((p) => p.product.name == product.name)
    if(prod) {
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

