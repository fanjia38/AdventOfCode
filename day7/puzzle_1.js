function sort (dataMap) {
  let answer = [{char: [], next: null}]

  Object.keys(dataMap).forEach(key => {
    // 探索対象の文字位置を検索 or セット
    console.log(answer)
    index = findDeep(answer, key)
    if (index < 0) {
      index = 0
      answer[index].char.push(key)
    }
    console.log(dataMap[key])

    dataMap[key].forEach(row => {
      const nextKey = row.replace(/.*\sstep\s([A-Z])\scan.*/, '$1')
      let nextIndex = findDeep(answer, nextKey, index)
      if (nextIndex === index) {
        const splitPos = answer[index].char.indexOf(nextKey)
        answer[index].char.splice(splitPos, 1)
        if (answer[index].next === null) {
          answer[index].next = answer.length
          answer.push({char: [], next: null})
        }
        answer[answer[index].next].char.push(nextKey)
      } else if (nextIndex < 0) {
        let prevIndex = findDeep(answer, nextKey)

        if (prevIndex < 0) {
          if (answer[index].next === null) {
            answer[index].next = answer.length
            answer.push({char: [], next: null})
          }
          nextIndex = answer[index].next
          answer[nextIndex].char.push(nextKey)
        } else {
          const splitPos = answer[prevIndex].char.indexOf(nextKey)
          answer[prevIndex].char.splice(splitPos, 1)
          if (answer[index].next === null) {
            answer[index].next = answer.length
            answer.push({char: [], next: null})
          }
          answer[answer[index].next].char.push(nextKey)
        }
      }
    })
  })
  return answer
}

function findDeep (obj, char, index = 0) {
  if (obj[index].char.indexOf(char) >= 0) {
    return index
  } else if (obj[index].next === null) {
    return -1
  } else {
    return findDeep(obj, char, obj[index].next)
  }
}

function call (input) {
  const dataList = input.split('\n')
  // const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  // const alpha = ['A', 'B', 'C', 'D', 'E', 'F']

  let dataMap = {}
  dataList.forEach(row => {
    const char = row.replace(/Step\s([A-Z])\smust.*/,'$1')
    if (typeof dataMap[char] === 'undefined') {
      dataMap[char] = [row]
    } else {
      dataMap[char].push(row)
    }
  })
  // console.log(dataMap)

  let answer = sort(dataMap, dataList)

  answer = answer.map(obj => {
    obj.char.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    return obj.char
  })
  console.log(answer)
  console.log(answer.join(''))
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
