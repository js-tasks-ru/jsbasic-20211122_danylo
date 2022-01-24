import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">
            </h3>
          </div>
          <div class="modal__body">
          </div>
        </div>
      </div>`);
  }

  open() {
    const body = document.body;
    body.append(this.elem);
    body.classList.add('is-modal-open');
    this.elem.querySelector('.modal__close').onclick = (e) => this.close(e);
    document.addEventListener('keydown', this.keydownEventListener);
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').innerHTML = title;
  }

  setBody(node) {
    this.elem.querySelector('.modal__body').append(node);
  }

  close() {
    document.removeEventListener('keydown', this.keydownEventListener);
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }

  keydownEventListener = (event) => this.keyDown(event);

  keyDown(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}
