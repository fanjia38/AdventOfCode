const input = Deno.readTextFile("./2020/input.txt");

// part one
input.then((data) => {
  const list: string[] = data.split('\n')
  list.map((current, currentIdx) => {
    const targetList = list.slice(currentIdx)

    targetList.forEach(target => {
      const param1 = parseInt(current)
      const param2 = parseInt(target)

      if(param1 + param2 === 2020) {
        console.log(param1 * param2)
      }
    })
  })
});

// part two
input.then((data) => {
  const list: string[] = data.split('\n')
  list.map((firstVal, firstIdx) => {
    const secondList = list.slice(firstIdx)

    secondList.forEach((secoundVal, secoundIdx) => {
      const thirdList = list.slice(firstIdx + secoundIdx)

      thirdList.forEach(thirdVal => {
        const param1 = parseInt(firstVal)
        const param2 = parseInt(secoundVal)
        const param3 = parseInt(thirdVal)

        if(param1 + param2 + param3 === 2020) {
          console.log(param1 * param2 * param3)
        }
      })
    })
  })
});
