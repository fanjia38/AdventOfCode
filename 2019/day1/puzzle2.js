/**
 * Day 1: The Tyranny of the Rocket Equation
 * Part Two
 * https://adventofcode.com/2019/day/1
 */
function call (input) {
  const datalist = input.split('\n')

  const answer = datalist.reduce((prev, current) => {
    let target = Math.floor(current/3)-2
    let sum = 0
    while (target >= 1) {
      sum = sum + target
      target = Math.floor(target/3)-2
    }
    return prev + sum
  }, 0)
  console.log(answer)
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
