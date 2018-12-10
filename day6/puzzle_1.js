function createMap(dataList, dataMap, width, height) {
  dataList.forEach((row, index) => {
    const [x, y] = [row[0], row[1]]
    dataMap[y][x] = index

    for (let indexY = 0; indexY < height; indexY++) {
      for (let indexX = 0; indexX < width; indexX++) {
        const prev = dataMap[indexY][indexX]
        if (prev === '.') {
          dataMap[indexY][indexX] = index
        } else if (prev !== index) {
          // console.log(`...${prev}[${indexY}][${indexX}]`)
          let target  = typeof prev === 'number' ? dataList[prev] : dataList[prev[0]]

          const diff = check([indexX, indexY], [x, y], target)
          // console.log(`${index}[${y}][${x}] : ${prev}[${target}] ... ${diff}`)
          if (diff === 0) {
            dataMap[indexY][indexX] = typeof prev !== 'number' ? [...prev, index] : [prev, index]
          } else if (diff > 0) {
            dataMap[indexY][indexX] = prev
          } else {
            dataMap[indexY][indexX] = index
          }
        }
      }
    }
  })

  return dataMap
}

function check(currentPos, aPos, bPos) {
  const aKyori = Math.abs(currentPos[0] - aPos[0]) + Math.abs(currentPos[1] - aPos[1])
  const bKyori = Math.abs(currentPos[0] - bPos[0]) + Math.abs(currentPos[1] - bPos[1])
  const diff = aKyori - bKyori
  return diff
}

function count(dataMap, dataList) {
  dataMap.forEach((row,index) => {
    if (index === 0 || index === dataMap.length - 1) {
      row.forEach(value => {
        if (typeof value === 'number') {
          dataList[value] = 0
        }
      })
    } else {
      // console.log(`${row[0]}, ${row[row.length-1]}`)
      dataList[row[0]] = 0
      dataList[row[row.length-1]] = 0
    }
  })

  dataMap.forEach(row => {
    // console.log(row.join(' '))
    row.forEach(value => {
      if (typeof value === 'number' && dataList[value] !== 0) {
        // console.log(value)
        dataList[value] = typeof dataList[value] !== 'number' ? 1 : dataList[value] + 1
      }
    })
  })
  // console.log(dataList.join(', '))

  return dataList
}

function call (input) {
  let dataList = input.split('\n')

  let maxX = 0
  let maxY = 0
  dataList = dataList.map(row => {
    const [x, y] = row.split(',').map(value => parseInt(value, 10))
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
    return [x, y]
  }).sort((a, b) => a[0] - b[0])

  let dataMap = Array(maxY + 1)
  for (let index = 0; index < dataMap.length; index++) {
    dataMap[index] = Array(maxX + 1).fill('.')
  }

  // datalist を元にデータ作成
  dataMap = createMap(dataList, dataMap, maxX + 1, maxY + 1)

  // 有限データの数を数える
  const ret = count(dataMap, dataList)
  console.log(ret.join(', '))
  console.log(Math.max(...ret))
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
