import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    const ribbon = document.createElement('div');
    ribbon.className = 'ribbon';

    const leftButton = createElement(`
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    `);

    const rightButton = createElement(`
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    `);

    const ribbonInner = document.createElement('nav');
    ribbonInner.className = 'ribbon__inner';

    for(let category of categories) {
      const item = this.createCategoty(category)
      ribbonInner.appendChild(item);

      let myEvent = new CustomEvent('ribbon-select', {
        detail: category.id,
        bubbles: true
      });

      item.addEventListener('click', function (event) {
        event.preventDefault();
        ribbonInner.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
        this.classList.add('ribbon__item_active');
        ribbon.dispatchEvent(myEvent);
      });
    }
    
    ribbonInner.children[0].classList.add('ribbon__item_active');

    ribbon.appendChild(leftButton);
    ribbon.appendChild(ribbonInner);
    ribbon.appendChild(rightButton);

    this.elem = ribbon;

    leftButton.addEventListener('click', function(event) {
      event.preventDefault();
      ribbonInner.scrollBy(-350, 0);
    });

    rightButton.addEventListener('click', function (event) {
      event.preventDefault();
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener('scroll', function() {
      let scrollLeft = ribbonInner.scrollLeft;
      if(scrollLeft == 0) {
        leftButton.classList.remove('ribbon__arrow_visible');
        rightButton.classList.add('ribbon__arrow_visible');
      }

      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollRight < 1) {
        rightButton.classList.remove('ribbon__arrow_visible');
        leftButton.classList.add('ribbon__arrow_visible');
      }
    });
  }

  createCategoty(category) {
    const item = document.createElement('a');
    item.className = 'ribbon__item';
    item.dataset.id = category.id;
    item.innerHTML = category.name;
    item.href = '#';

    return item;
  }
}
