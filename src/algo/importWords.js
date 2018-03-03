var common = require('./wordList/commonWords');
var all = require('./wordList/words_alpha')

var commonWords = common.commonWords.split(',');
var allWordsSorted = all.allWords.split(',');

var words = { commonWords: commonWords, allWords: allWordsSorted };
exports.words = words;
