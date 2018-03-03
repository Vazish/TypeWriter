var words = require('./importWords');

function probabilityAssignment(wordArray, type) {
  var length = wordArray.length;
  if (length === 1) {
    return [{word: wordArray[0], likelihood: 1}]
  } else {
    if (type === 'all') {
      return wordArray
      .map((someWord, index) => ({word: someWord, likelihood: (function (someWord, word) {return ((word.length + 1)/someWord.length)})(someWord, wordArray[0])}))
      .sort((a, b) => b.likelihood - a.likelihood);
    } else { // type === common
      return wordArray.map((someWord, index) => ({word: someWord, likelihood: (length  - (index))/(length + 1)}))
    }
  }
}

function closeMatch(word, testWord) {
  let score = 0
  for (let i = 0; i < word.length; i++) {
    if (word[i] === testWord[i]) {
      score++
    }
  }
  return score/word.length;
}

function returnAllWords(word) { // return top 3 words
  var theWordsArray = words.words.commonWords;
  var filteredCommon = theWordsArray
  .filter(someWord => someWord.length >= word.length && someWord.indexOf(word) === 0);

  if (filteredCommon.length === 0) {
    var allWords = words.words.allWords.filter(someWord => someWord.length >= word.length && someWord.indexOf(word) === 0);;
    console.log('All Words');
    if (probabilityAssignment(allWords, 'all').length === 0) {
      console.log('Word not found')
      var filteredWithSameLength = theWordsArray.filter((someWord) => (someWord.length === word.length));
      // assign weight to the most matching ones
      return filteredWithSameLength.map((someWord) => ({word: someWord, likelihood: closeMatch(word, someWord)})).filter((wordObj) => (wordObj.likelihood >= 0.5)).sort((a, b) => (b.likelihood - a.likelihood))
    } else {
      return probabilityAssignment(allWords, 'all');
    }
  } else {
    console.log('Common words');
    return probabilityAssignment(filteredCommon, 'common');
  }
}

// console.log(closeMatch('jello', 'jelly'));
console.log(returnAllWords('math'));

exports.probableWords = returnAllWords;
