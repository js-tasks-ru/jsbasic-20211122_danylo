function toggleText() {
  btn = document.querySelectorAll('.toggle-text-button')[0];
  div = document.querySelector('#text');

  btn.addEventListener('click', function() {
    if(div.hidden) {
      div.hidden = false;
    }
    else {
      div.hidden = true;
    }
  });
}
