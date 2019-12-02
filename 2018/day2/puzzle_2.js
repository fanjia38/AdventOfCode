function call (input) {
  const datalist = input.split('\n')

  datalist.forEach((row, rowIndex) => {
    row = row.split('')
    for (let index = 0; index < row.length; index++) {
      let word = ''
      if (index >= 1) {
        word += row.slice(0, index).join('')
      }
      word += '[\\w]'
      if (index <= row.length) {
        word += row.slice(index + 1, row.length).join('')
      }

      const regex = new RegExp(word)

      for (let searchIndex = rowIndex + 1; searchIndex < datalist.length; searchIndex++) {
        if (regex.test(datalist[searchIndex])) {
          console.log(word.replace('[\\w]', ''))
          process.exit(0)
        }
      }
    }
  })
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
