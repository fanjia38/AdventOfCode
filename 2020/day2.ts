const input = Deno.readTextFile("./2020/input.txt");

// part one
input.then((data) => {
  const list: string[] = data.split('\n')
  const filteredList = list.filter(row => {
    const data = row.split(' ')

    const [minNum, maxNum] = data[0].split('-').map(val => parseInt(val))
    const key = data[1].slice(0, 1)

    const matched = data[2].match(new RegExp(key, 'g'))
    if (!matched) return false

    return minNum <= matched.length && matched.length <= maxNum
  })

  console.log(filteredList.length)
});

// part two
input.then((data) => {
  const list: string[] = data.split('\n')
  const filteredList = list.filter(row => {
    const data = row.split(' ')

    const [first, secound] = data[0].split('-').map(val => parseInt(val))
    const key = data[1].slice(0, 1)

    const firstVal = data[2][first-1]
    const secoundVal = data[2][secound-1]

    return firstVal !== secoundVal && (firstVal === key || secoundVal === key)
  })

  console.log(filteredList.length)
});
