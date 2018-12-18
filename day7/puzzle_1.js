function getNextKeysPosition(dataMap, key, tree) {
  if (typeof dataMap[key] === 'undefined') {
    return [-1]
  }

  const posList = dataMap[key].map(row => {
    const nextKey = row.replace(/.*\sstep\s([A-Z])\scan.*/, '$1')
    return findDeep(tree, nextKey)
  }).filter(value => value >= 0)
  return posList
}

function sort (dataMap, tree, key, prevIndex = undefined) {
  let index = findDeep(tree, key, prevIndex)
  if (index < 0 || index === prevIndex) {
    const oldIndex = findDeep(tree, key)
    if (oldIndex >= 0) {
      const splitPos = tree[oldIndex].char.indexOf(key)
      tree[oldIndex].char.splice(splitPos, 1)
      index = Math.min(getNextKeysPosition(dataMap, key, tree))
      index = index - 1 >= 0 ? index - 1 : 0
    }

    if (typeof prevIndex === 'undefined') {
      index = Math.min(getNextKeysPosition(dataMap, key, tree))
      index = index - 1 >= 0 ? index - 1 : 0
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

  dataMap[key].forEach(row => {
    const nextKey = row.replace(/.*\sstep\s([A-Z])\scan.*/, '$1')
    tree = sort(dataMap, tree, nextKey, index)
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
