function call (input) {
  const datalist = input.split('\n')

  const answer = datalist.reduce((prev, current) => {
    return prev + parseInt(current, 10)
  }, 0)
  console.log(answer)
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))