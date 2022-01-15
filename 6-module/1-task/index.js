export default class UserTable {
  elem = document.createElement('table');
  constructor(rows) {
    const thead = document.createElement('thead');
    const headTr = document.createElement('tr');

    const nameTh = document.createElement('th');
    nameTh.innerHTML = 'Имя';

    const ageTh = document.createElement('th');
    ageTh.innerHTML = 'Возраст';

    const salaryTh = document.createElement('th');
    salaryTh.innerHTML = 'Зарплата';

    const cityTh = document.createElement('th');
    cityTh.innerHTML = 'Город';

    const emptyTh = document.createElement('th');

    headTr.appendChild(nameTh);
    headTr.appendChild(ageTh);
    headTr.appendChild(salaryTh);
    headTr.appendChild(cityTh);
    headTr.appendChild(emptyTh);

    thead.appendChild(headTr);
    this.elem.appendChild(thead);

    this.elem.appendChild(this.createTbody(rows));
  }

  createTbody(rows) {
    const tbody = document.createElement('tbody');

    for(const row of rows) {
      tbody.appendChild(this.createTr(row));
    }

    return tbody;
  }

  createTr(row) {
    const tr = document.createElement('tr');

    for(const td in row) {
      tr.appendChild(this.createTd(row[td]));
    }

    tr.appendChild(this.createTd('button'))

    return tr;
  }

  createTd(text) {
    const td = document.createElement('td');

    if(text === 'button') {
      const button = document.createElement('button');
      button.innerHTML = 'X';

      button.onclick = function() {
        let tr = this.closest('tr');
        tr.remove();
      }

      td.appendChild(button);
    }
    else {
      td.innerHTML = text;
    }

    return td;
  }
}
