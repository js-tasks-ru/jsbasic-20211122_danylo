function filterRange(arr, a, b) {
  result = Array.from(arr);
  return result.filter(element => element >= a && element <= b);
}
