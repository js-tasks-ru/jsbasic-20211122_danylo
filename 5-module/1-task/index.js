function hideSelf() {
  const btn = document.querySelectorAll('.hide-self-button')[0];

  btn.addEventListener('click', function() {
    btn.hidden = 'true';
  });
}
