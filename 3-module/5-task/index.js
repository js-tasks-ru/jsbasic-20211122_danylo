function getMinMax(str) {
  elements = str.split(' ');
  numbers = elements.filter(elem => !isNaN(parseFloat(elem)))
                    .map(num => parseFloat(num));
  
  result = {
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  }

  return result;
}
