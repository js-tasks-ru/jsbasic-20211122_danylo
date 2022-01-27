import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `);

    this.fillProducts(products);
  }

  fillProducts(products) {
    const gridInner = this.elem.querySelector('.products-grid__inner');
    gridInner.innerHTML = '';
    for(let product of products) {
      const htmlProduct = new ProductCard(product).elem;
      gridInner.append(htmlProduct);
    }
  }

  updateFilter(filters) {
    for (let key in filters) {
      this.filters[key] = filters[key];
    }

    let filteredProducts = this.products;

    for(let filter in this.filters) {
      if (filter == 'noNuts') {
        if (this.filters[filter]) {
          filteredProducts = filteredProducts.filter(product => !product.nuts);
        }
      }
      if (filter == 'vegeterianOnly') {
        if (this.filters[filter]) {
          filteredProducts = filteredProducts.filter(product => product.vegeterian == true);
        }
      }
      if (filter == 'maxSpiciness') {
        filteredProducts = filteredProducts.filter(product => product.spiciness <= this.filters[filter]);
      }
      if (filter == 'category' && this.filters[filter].length) {
        filteredProducts = filteredProducts.filter(product => product.category == this.filters[filter]);
      }
    }
    this.fillProducts(filteredProducts)
  }
}
