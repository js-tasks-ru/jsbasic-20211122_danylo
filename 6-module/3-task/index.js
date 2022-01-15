import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    const carousel_inner = document.createElement('div');
    carousel_inner.className = 'carousel__inner';

    const left_arrow = createElement(`
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>`);
    const right_arrow = createElement(`
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>`);

    carousel.append(left_arrow);
    carousel.append(right_arrow);

    for(let obj in slides) {
      const slide = slides[obj];

      const slide_html = createElement(`
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`);

      const button = slide_html.getElementsByClassName('carousel__button')[0];

      let myEvent = new CustomEvent("product-add", {
        detail: slide.id,
        bubbles: true
      });

      button.onclick = function () {
        this.dispatchEvent(myEvent);
      }

      carousel_inner.append(slide_html);
    }

    carousel.appendChild(carousel_inner);

    let index_of_slide = 0;
    let width = 500;

    left_arrow.style.display = 'none';

    left_arrow.addEventListener('click', function () {
      carousel_inner.style.transform = `translateX(-${(index_of_slide - 1) * width}px)`;
      index_of_slide -= 1;
      right_arrow.style.display = '';

      if (index_of_slide == 0) {
        left_arrow.style.display = 'none';
      }
    });

    right_arrow.addEventListener('click', function () {
      carousel_inner.style.transform = `translateX(-${(index_of_slide + 1) * width}px)`;
      index_of_slide += 1;
      left_arrow.style.display = '';

      if (index_of_slide == slides.length - 1) {
        right_arrow.style.display = 'none';
      }
    });

    this.elem = carousel;
  }
}
