// 注文データの解析
function getClaimInfo (strClaimData) {
  const [no, _, pos, size] = strClaimData.split(' ')
  const number = parseInt(no.replace('#', ''), 10)
  const [posX, posY] = pos.split(',').map(value => parseInt(value, 10))
  const [width, height] = size.split('x').map(value => parseInt(value, 10))

  return [number, posX, posY, width, height]
}

function checkArea (fabric, number, posX, posY, width, height) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (fabric[y+posY][x+posX] !== number) {
        return false
      }
    }
  }
  return true
}

function call (input) {
  const datalist = input.split('\n')

  let fabric = []
  datalist.forEach(row => {
    const [number, posX, posY, width, height] = getClaimInfo(row)

    for (let y = posY; y < posY + height; y++) {
      if (typeof fabric[y] === 'undefined') {
        fabric[y] = []
      }

      for (let x = posX; x < posX + width; x++) {
        if (typeof fabric[y][x] === 'undefined') {
          fabric[y][x] = number
        } else if (typeof fabric[y][x] === 'number') {
          fabric[y][x] = 'X'
        }
      }
    }
  })

  fabric.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      const area = fabric[y][x]
      if (typeof area === 'number') {
        const [number, posX, posY, width, height] = getClaimInfo(datalist[area - 1])
        if (x === posX && y === posY) {
          if (checkArea(fabric, number, posX, posY, width, height)) {
            console.log(`${number}: ${datalist[area - 1]}`)
          } else {
            x += width
          }
        }
      }
    }
  })
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
