function sort (alpha, dataMap) {
  let answer = alpha.slice()

  alpha.forEach(char => {
    if (typeof dataMap[char] !== 'undefined') {
      const list = dataMap[char].map(row => {
        return row.replace(/Step\s([A-Z])\smust.*/, '$1')
      }).sort()

      const charPos = answer.indexOf(char)
      console.log(`${char}(${charPos}) ... ${list.join(', ')}`)
      let addList = []
      list.forEach(target => {
        const targetPos = answer.indexOf(target)
        if (charPos < targetPos) {
          answer.splice(targetPos, 1)
          addList.push(target)
        }
      })
      answer.splice(charPos, 0, ...addList)
      console.log(answer.join(', '))
    }
  })
  return answer
}

function call (input) {
  const dataList = input.split('\n')
  const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  // const alpha = ['A', 'B', 'C', 'D', 'E', 'F']

  let dataMap = {}
  dataList.forEach(row => {
    const char = row.replace(/.*\sstep\s([A-Z])\scan.*/,'$1')
    if (typeof dataMap[char] === 'undefined') {
      dataMap[char] = [row]
    } else {
      dataMap[char].push(row)
    }
  })

  let answer = sort(alpha, dataMap)

  console.log(answer.join(''))
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
