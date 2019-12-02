/**
 * Day 1: The Tyranny of the Rocket Equation
 * https://adventofcode.com/2019/day/1
 */
function call (input) {
  const datalist = input.split('\n')

  const answer = datalist.reduce((prev, current) => (
    prev + Math.floor(current / 3) - 2
  ), 0)
  console.log(answer)
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
