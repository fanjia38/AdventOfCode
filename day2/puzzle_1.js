function call (input) {
  const datalist = input.split('\n')

  let count2 = 0
  let count3 = 0
  datalist.forEach(row => {
    let charList = {}
    row.split('').forEach(char => {
      typeof charList[char] !== 'undefined' ? charList[char]++ : charList[char] = 1
    })

    const countList = Object.values(charList)
    if (countList.includes(2)) {
      count2++
    }
    if (countList.includes(3)) {
      count3++
    }
  })

  console.log(count2 * count3)
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
