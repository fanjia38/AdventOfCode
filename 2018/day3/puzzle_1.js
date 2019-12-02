function call (input) {
  const datalist = input.split('\n')

  let fabric = []
  let duplicateCount = 0
  datalist.forEach(row => {
    const [no, _, pos, size] = row.split(' ')
    const number = parseInt(no, 10)
    const [posX, posY] = pos.split(',').map(value => parseInt(value, 10))
    const [width, height] = size.split('x').map(value => parseInt(value, 10))

    for (let indexY = posY; indexY < posY + height; indexY++) {
      if (typeof fabric[indexY] === 'undefined') {
        fabric[indexY] = []
      }

      for (let indexX = posX; indexX < posX + width; indexX++) {
        if (typeof fabric[indexY][indexX] === 'undefined') {
          fabric[indexY][indexX] = number
        } else if (typeof fabric[indexY][indexX] === 'number') {
          duplicateCount++
          fabric[indexY][indexX] = 'X'
        }
      }
    }
  })

  console.log(duplicateCount)
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
