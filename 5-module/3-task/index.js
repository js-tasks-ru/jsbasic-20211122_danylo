function initCarousel() {
  const carousel = document.querySelector('.carousel__inner');
  const left_arrow = document.querySelector('.carousel__arrow_left');
  const right_arrow = document.querySelector('.carousel__arrow_right');
  let index_of_slide = 0;
  let width = carousel.offsetWidth;
  left_arrow.style.display = 'none';

  left_arrow.addEventListener('click', function() {
    carousel.style.transform = `translateX(-${(index_of_slide - 1) * width}px)`;
    index_of_slide -= 1;
    right_arrow.style.display = '';

    if(index_of_slide == 0) {
      left_arrow.style.display = 'none';
    }
  });

  right_arrow.addEventListener('click', function () {
    carousel.style.transform = `translateX(-${(index_of_slide + 1) * width}px)`;
    index_of_slide += 1;
    left_arrow.style.display = '';

    if (index_of_slide == 3) {
      right_arrow.style.display = 'none';
    }
  });
}
