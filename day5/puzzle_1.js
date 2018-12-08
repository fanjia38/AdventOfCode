function checkReact(list, start) {
  for (let index = start; index < list.length; index++) {
    const char = list[index]
    const target = /[A-Z]/.test(char) ? char.toLowerCase() : char.toUpperCase()
    if (list[index+1] === target) {
      return index
    }
  }
  return -1
}

function call (input) {
  const list = input.split('')

  for (let index = 0; index < list.length;) {
    const pos = checkReact(list, index)
    if (pos >= 0) {
      const cut = list.splice(pos, 2)
      index = pos <= 0 ? 0 : pos - 1
    } else {
      console.log(list.length)
      console.log(list.join(''))
      process.exit(0)
    }
  }
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
