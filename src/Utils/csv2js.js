const XLSX = require('xlsx')
const fs = require('fs')

const workbook = XLSX.readFile('繁简转换.csv')
const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
const words = {}

data.forEach(item => {
  words[item['[添加或修改]']] = item['[转换为]']
})

try {
  fs.writeFileSync('./words.js', `module.exports = ${JSON.stringify(words, null, '\t')}`)
} catch (err) {
  console.error(err)
}
