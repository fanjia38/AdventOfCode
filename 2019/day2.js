/**
 * Day 2: 1202 Program Alarm
 * https://adventofcode.com/2019/day/2
 */
function calc1 (datalist, set1 = 12, set2 = 2) {
  datalist[1] = set1
  datalist[2] = set2

  for (let index = 0; datalist[index] < 99; index+=4) {
    const [flg, input1, input2, set] = datalist.slice(index, index+4)
    datalist[set] = eval(`${datalist[input1]} ${flg === 1 ? '+' : '*'} ${datalist[input2]}`)
  }
  return datalist[0]
}

function calc2 (datalist) {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const ret = calc1([...datalist], noun, verb)

      if (ret === 19690720) {
        return eval(`100 * ${noun} + ${verb}`)
      }
    }
  }
}

// input
const input = require('fs').readFileSync('/dev/stdin', 'utf8')
const datalist = input.split(',').map(val => parseInt(val))
console.log('day1:', calc1([...datalist]))
console.log('day2:', calc2([...datalist]))
