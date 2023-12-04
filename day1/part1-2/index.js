"use strict"
import { readFile } from "../../getDataFromFile.js"
//discord.com/user/230947151931375617 `s replace Function
const numberify = s => {
  const numbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ]
  const characters = s.split("")
  for (let i = 0; i < numbers.length; i++) {
    for (const { index } of s.matchAll(numbers[i])) {
      characters[index] = i + 1
    }
  }
  return characters.join("")
}

const path = "day1/part1-2/data.txt"
const data = await readFile(path)

let res1 = 0,
  res2 = 0
getNumbers(data).forEach(e => {
  res1 += parseInt(e)
})

getNumbers(numberify(data)).forEach(e => {
  res2 += parseInt(e)
})
console.log("Part1 result:\t", res1)
console.log("Part2 result:\t", res2)

function getNumbers(str) {
  const res = []
  const rows = str.trim().split(/\n/)
  rows.forEach(row => {
    const numbers = [...row.matchAll(/[0-9]/g)]
    res.push(digitArrayToNumber(numbers))
  })
  return res
}
//["1","2","3"] -- "13"
function digitArrayToNumber(numbers) {
  const fd = numbers[0]
  const sd = numbers[numbers.length - 1]
  return fd + sd
}
