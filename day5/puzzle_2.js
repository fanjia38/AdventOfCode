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
  const unit = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  let unitLength = []
  for (let unitIndex = 0; unitIndex < unit.length; unitIndex++) {
    const regex = new RegExp(unit[unitIndex], 'gi')
    let targetList = input.replace(regex, '').split('')
    console.log(`${unit[unitIndex]}: ${targetList.length}`)

    for (let index = 0; index < targetList.length;) {
      const pos = checkReact(targetList, index)
      if (pos >= 0) {
        // console.log(pos)
        targetList.splice(pos, 2)
        index = pos <= 0 ? 0 : pos - 1
      } else {
        index = targetList.length
      }
    }
    console.log(`${unit[unitIndex]}: ${targetList.length}`)
    unitLength.push(targetList.length)
  }

  console.log(Math.min(...unitLength))

}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
