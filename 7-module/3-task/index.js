import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>

        <div class="slider__progress"></div>

        <div class="slider__steps">
        </div>
      </div>
    `);

    this.createSteps(steps, this.elem.querySelector('.slider__steps'));
    this.setSliderValue(value, value / (steps - 1) * 100);
    this.elem.onclick = (e) => this.stepClick(e);
  }

  createSteps(countOfSteps, node) {
    for(let i = 0; i < countOfSteps; i++) {
      node.append(document.createElement('span'));
    }
  }

  setSliderValue(value, leftPercents) {
    this.elem.querySelector('.slider__value').innerHTML = value;
    this.elem.querySelector('.slider__steps').children[value].classList.add('slider__step-active');

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      })
    );
  }

  stepClick(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;
    this.setSliderValue(value, valuePercents);
  }
}
