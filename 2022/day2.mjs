import { program } from 'commander'
import fs from 'node:fs/promises'

//input
program.parse(process.argv)
const filePath = program.args[0]
const data = await fs.readFile(filePath, {encoding: 'utf8'})
const dataList = data.split('\n')

const x = 'X'.charCodeAt(0) // グー, 勝ち
const y = 'Y'.charCodeAt(0) // パー, 引き分け
const z = 'Z'.charCodeAt(0) // チョキ, 負け


const getResultRockPaperScissors = (inputPlayer, inputYou) => {
  const player = inputPlayer.charCodeAt(0) + 23
  const you = inputYou.charCodeAt(0)

  return (((player === x && you === y) || (player === y && you === z) || (player === z && you === x)) ? 6 : player === you ? 3 : 0) + (you - 87)
}

const result = dataList.map((line) => getResultRockPaperScissors(...line.split(' ')))
console.log('1...', result.reduce((a, b) => a + b, 0))

const getResultRockPaperScissors2 = (inputPlayer, result) => {
  const player = inputPlayer.charCodeAt(0) + 23

  if (result === 'Z') {
    return (player === x ? y - 87 : player === y ? z - 87 : x - 87) + 6
  }
  if (result === 'Y') {
    return (player === x ? x - 87 : player === y ? y - 87 : z - 87) + 3
  }
  if (result === 'X') {
    return player === x ? z - 87 : player === y ? x - 87 : y - 87
  }
}
const result2 = dataList.map((line) => getResultRockPaperScissors2(...line.split(' ')))
console.log('2...', result2.reduce((a, b) => a + b, 0))
