function sort (dataMap, tree, key, prevIndex = undefined) {
  let index = findDeep(tree, key, prevIndex)
  if (index < 0 || index === prevIndex) {
    const oldIndex = findDeep(tree, key)
    if (oldIndex >= 0) {
      const splitPos = tree[oldIndex].char.indexOf(key)
      tree[oldIndex].char.splice(splitPos, 1)
    }

    if (typeof prevIndex === 'undefined') {
      index = 0
    } else if (tree[prevIndex].next !== null) {
      index = tree[prevIndex].next
    } else {
      tree.push({char: [], next: null})
      index = tree.length - 1
      tree[prevIndex].next = index
    }
    tree[index].char.push(key)
  }

  if (typeof dataMap[key] === 'undefined') return tree

  // let treePos = 0
  dataMap[key].forEach(row => {
    const beforeKey = row.replace(/.*\sstep\s([A-Z])\scan.*/, '$1')
    tree = sort(dataMap, tree, beforeKey, index)
  })

  // console.log(tree)
  return tree
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
  console.log(dataMap)

  // 並び替え
  let tree = [{char: [Object.keys(dataMap)[0]], next: null}]
  Object.keys(dataMap).forEach(key => {
    tree = sort(dataMap, tree, key)
  })
  console.log(tree)
  tree = tree.map(obj => {
    obj.char.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    return obj.char.join('')
  })
  console.log(tree.join(''))
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
