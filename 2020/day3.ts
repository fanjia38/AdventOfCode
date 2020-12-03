const input = Deno.readTextFile("./2020/input.txt");

// part one
input.then((data) => {
  const list: string[] = data.split('\n')
  const maxXPos = list[0].length

  const filteredList = list.filter((row, yPos) => {
    let xPos = yPos * 3
    xPos = xPos % maxXPos

    // console.log(`x:${xPos}, y:${yPos}(${maxXPos})`)
    return list[yPos][xPos] === '#'
  })

  console.log(filteredList.length)
});

// part two
input.then((data) => {
  const rules = [
                  {right: 1, down:1},
                  {right: 3,down:1},
                  {right: 5,down:1},
                  {right: 7,down:1},
                  {right: 1,down:2}
                ]
  const list: string[] = data.split('\n')
  const maxXPos = list[0].length

  const retVals = rules.map(({right, down}) => {
    const filteredList = list.filter((row, yPos) => {
      if (yPos % down !== 0 ) return false

      let xPos = (yPos / down) * right
      xPos = xPos % maxXPos

      return list[yPos][xPos] === '#'
    })

    return filteredList.length
  })

  console.log(retVals)

  const sum = retVals.reduce((prev, current) => prev * current, 1)
  console.log(sum)
});
