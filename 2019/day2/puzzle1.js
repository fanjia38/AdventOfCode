/**
 * Day 2: Day 2: 1202 Program Alarm
 * https://adventofcode.com/2019/day/2
 */
function call (input) {
  const datalist = input.split(',').map(val => parseInt(val))

  datalist[1] = 12
  datalist[2] = 2
  for (let index = 0; datalist[index] < 99; index+=4) {
    const [flg, input1, input2, set] = datalist.slice(index, index+4)
    datalist[set] = eval(`${datalist[input1]} ${flg === 1 ? '+' : '*'} ${datalist[input2]}`)
  }
  console.log(datalist[0])
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
