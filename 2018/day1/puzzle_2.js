function call (input) {
  const datalist = input.split('\n')

  let reaches = []
  let sum = 0

  for (let index = 0; index < datalist.length; index++) {
    sum += parseInt(datalist[index], 10)

    if (reaches.indexOf(sum) >= 0) {
      console.log(`${sum}!!`)
      process.exit(0)
    } else {
      reaches.push(sum)
    }

    if (index === (datalist.length - 1)) {
      index = -1
    }
  }
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
