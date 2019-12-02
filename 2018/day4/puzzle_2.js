function findDailyData (list, startIndex) {
  for (let index = startIndex; index < list.length; index++) {
    if (/Guard #[0-9]+ begins shift/.test(list[index])) {
      return index
    }
  }
}

function createDailyObject (dailyData) {
  let guardId = 0
  let sleepData = Array(60)
  let sleepFlg = false  // true: sleep, false: wake

  let count = 0
  dailyData.forEach(row => {
    const [_, minutes] = getTime(row)
    if (/Guard #[0-9]+ begins shift/.test(row)) {
      guardId = row.replace(/.*Guard #([0-9]+) begins shift/, '$1')
    } else if (/falls asleep/.test(row)) {
      sleepData[minutes] = true
      count++
    } else if (/wakes up/.test(row)) {
      sleepData[minutes] = false
    }
  })

  for (let index = 0; index < sleepData.length; index++) {
    sleepFlg = typeof sleepData[index] !== 'undefined' ? sleepData[index] : sleepFlg
    sleepData[index] = sleepFlg ? 1 : 0
  }

  return [guardId, count, sleepData]
}

function getTime (strData) {
  const time =  strData.replace(/\[\d{4}-\d{2}-\d{2}\s(\d{2}):(\d{2})\].*/, '$1 $2')
  return time.split(' ').map(value => parseInt(value, 10))
}

function call (input) {
  const dataList = input.split('\n').sort()

  let allSleepList = []
  for (let listIndex = 0; listIndex < dataList.length;) {
    const endIndex = findDailyData(dataList, listIndex + 1)
    let [guardId, count, sleepData] = createDailyObject(dataList.slice(listIndex, endIndex))

    if (typeof allSleepList[guardId] === 'undefined') {
      allSleepList[guardId] = {id: guardId, count: count, data: sleepData}
    } else {
      allSleepList[guardId].count += count
      sleepData = allSleepList[guardId].data.map((value, index) => {
        return sleepData[index] === 1 ? value + 1 : value
      })
      allSleepList[guardId].data = sleepData
    }
    listIndex = endIndex
  }

  const answer = allSleepList.reduce((prev, current) => {
    return prev.count - current.count < 0 ? current : prev
  })

  const maxCount = Math.max(...answer.data)
  const pos = answer.data.indexOf(maxCount)
  console.log(`${answer.id}(${answer.count}) ... ${pos} => ${parseInt(answer.id, 10) * pos}`)
}

// input
call(require('fs').readFileSync('/dev/stdin', 'utf8'))
