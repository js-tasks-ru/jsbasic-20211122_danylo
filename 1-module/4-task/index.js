function checkSpam(str) {
  const spam1 = '1xbet';
  const spam2 = 'xxx';

  str = str.toLowerCase();

  return (str.includes(spam1) || str.includes(spam2));
}
