const charDic = require('./dictionary/char')
const wordDic = require('./dictionary/word')
const T = {}

T.charMap = function (char) {
  const t = charDic[char]

  return t || char
}

T.wordMap = function (text) {
  const reg = new RegExp(`(${Object.keys(wordDic).join('|')})`, 'gm')
  const rst = text.replace(reg, (match) => wordDic[match])

  return rst
}

T.textMap = function (text) {
  const rst = T.wordMap(text)
  const chars = Array.from(rst).map(char => T.charMap(char))

  return chars.join('')
}

T.cn2tw = function (text) {
  return T.textMap(text)
}

module.exports = T
