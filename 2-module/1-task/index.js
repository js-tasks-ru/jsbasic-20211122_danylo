function sumSalary(salaries) {
  sum = 0;

  for(let field in salaries) {
    if(Number.isInteger(salaries[field])) {
      sum += salaries[field];
    }
  }

  return sum;
}
