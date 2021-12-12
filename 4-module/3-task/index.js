function highlight(table) {
  const trs = table.rows;

  for(let i = 1; i < trs.length; i++) {
    const tr = trs[i];
    const available = tr.cells[3].getAttribute('data-available');
    
    if(available == null) {
      tr.setAttribute('hidden', 'true');
    }
    else {
      available == 'true' ? tr.classList.add('available') : tr.classList.add('unavailable');
    }

    const gender = tr.cells[2].innerHTML;

    gender == 'm' ? tr.classList.add('male') : tr.classList.add('female');

    const age = parseInt(tr.cells[1].innerHTML);

    if(age < 18) {
      tr.style.textDecoration = 'line-through';
    }
  }
}
