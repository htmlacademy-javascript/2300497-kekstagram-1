console.log('-----------Длина строки----------');


function checkLength(word, max) {
  return word.length <= max;
};

console.log(checkLength('проверяемая строка', 20));
console.log(checkLength('проверяемая строка', 10));
console.log(checkLength('проверяемая строка', 18));


console.log('-----------Полиндром----------');


function isPolindrom(word) {
  word = word.toLowerCase().replace(/\s/g, '');

  for (let i = 0; i < word.length / 2; i++) {
    if (word[i] !== word[word.length - 1 - i]) {
      return false;
    }
    return true;
  }

};

console.log(isPolindrom('топот'));
console.log(isPolindrom('ДовОд'));
console.log(isPolindrom('Кекс'));
console.log(isPolindrom('Лёша на полке клопа нашёл '));


console.log('-----------Извлечение в целые положительные----------');

function numExtract(word) {
  let search = /[0-9]/g;
  let numArray = word.match(search);
  if (!numArray || numArray.length === 0) {
    return NaN;
  }
  let result = parseInt(numArray.join(''), 10);
  return result;
};

console.log(numExtract('2023 год'));
console.log(numExtract('ECMAScript 2022'));
console.log(numExtract('1 кефир, 0.5 батона'));
console.log(numExtract('агент 007'));
console.log(numExtract('а я томат'));
