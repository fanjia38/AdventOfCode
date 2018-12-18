// function getNextKeysPosition(dataMap, key, tree) {
//   if (typeof dataMap[key] === 'undefined') {
//     return [-1]
//   }

//   const posList = dataMap[key].map(row => {
//     const nextKey = row.replace(/.*\sstep\s([A-Z])\scan.*/, '$1')
//     return findDeep(tree, nextKey)
//   }).filter(value => value >= 0)
//   return posList
// }

function sort (inputData, tree, prevKeys, index) {
  if (prevKeys.length <= 0) {
    return tree
  }

  let currentKeys = []
  prevKeys = prevKeys.filter(prevKey => {
    if (inputData[prevKey].next.length <= 0) {
      return false
    }
    const nextList = inputData[prevKey].next.filter(nextKey => {
      const canSetNumber = inputData[nextKey].prev.every(targetKey => {
        return inputData[targetKey].pos !== null
      })
      // 設定可能なものをリストから prevKeys から取り除く
      return canSetNumber
    })
    if (nextList.length > 0) {
      currentKeys = currentKeys.concat(nextList)
      if (inputData[prevKey].pos !== index - 1) {
        const pos = inputData[prevKey].pos
        const splicePos = tree[pos].char.indexOf(prevKey)
        tree[pos].char.splice(splicePos, 1)
        tree[index-1].char.push(prevKey)
        inputData[prevKey].pos = index - 1
      }
    }
    return nextList.length === 0
  })
  currentKeys = currentKeys.filter((val, i, list) => list.indexOf(val) === i)
  tree.push({char: currentKeys, next: null})
  currentKeys.forEach(key => {
    inputData[key].pos = index
  })
  tree[index-1].next = index
  tree = sort(inputData, tree, [...prevKeys, ...currentKeys], index + 1)
  return tree
}

// function findDeep (obj, char, index = 0) {
//   if (obj[index].char.indexOf(char) >= 0) {
//     return index
//   } else if (obj[index].next === null) {
//     return -1
//   } else {
//     return findDeep(obj, char, obj[index].next)
//   }
// }

function call (input) {
  const dataList = input.split('\n')

  let inputData = {}
  dataList.forEach(row => {
    const [first, second] = row.replace(/Step\s([A-Z])\smust.*step\s([A-Z])\scan.*/,'$1 $2').split(' ')
    if (typeof inputData[first] === 'undefined') {
      inputData[first] = {next: [second], prev: [], pos: null}
    } else {
      inputData[first].next.push(second)
    }
  })
  Object.keys(inputData).forEach(key => {
    inputData[key].next.forEach(nextKey => {
      if (typeof inputData[nextKey] === 'undefined') {
        inputData[nextKey] = {next: [], prev: [key], pos: null}
      } else {
        inputData[nextKey].prev.push(key)
      }
    })
  })
  // console.log(inputData)

  // 並び替え
  let tree = [{char: [], next: null}]
  const rootKeys = Object.keys(inputData).filter(key => {
    return inputData[key].prev.length === 0
  })
  rootKeys.forEach(key => {
    tree[0].char.push(key)
    inputData[key].pos = 0
  })
  tree = sort(inputData, tree, rootKeys, 1)
  console.log(tree)
  // console.log(inputData)
  // let tree = [{char: [Object.keys(dataMap)[0]], next: null}]
  // Object.keys(dataMap).forEach(key => {
  //   tree = sort(dataMap, tree, key)
  // })
  // console.log(tree)
  tree = tree.map(obj => {
    obj.char.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    return obj.char.join('')
  })
  console.log(tree.join(''))
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
