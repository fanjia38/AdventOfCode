import { program } from 'commander'
import fs from 'node:fs/promises'

// input
program.parse(process.argv)
const filePath = program.args[0]
const data = await fs.readFile(filePath, {encoding: 'utf8'})
const dataList = data.split('\n\n').map(line => line.split('\n'))

const maxCalorie = (dataList) => {
  return dataList.reduce((prev, current) => {
    const sum = current.reduce((prev, current) => prev + parseInt(current), 0)
    return Math.max(prev, sum)
  }, 0)
}

console.log('max...', maxCalorie(dataList))

const compareFn = (a, b) => {
  const sumA = a.reduce((prev, current) => prev + parseInt(current), 0)
  const sumB = b.reduce((prev, current) => prev + parseInt(current), 0)
  return sumB - sumA
}

const sortedList = dataList.sort(compareFn)
const summary = sortedList.slice(0, 3).reduce((prev, current) => {
  const sum = current.reduce((innerPrev, innerCurrent) => innerPrev + parseInt(innerCurrent), 0)
  return prev + sum
}, 0)
console.log(summary)
