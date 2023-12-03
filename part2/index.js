"use strict"
import { promises } from "fs"

const readFile = async path => {
  try {
    const data = await promises.readFile(path, "utf-8")
    return data
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}

const testPath = "part2/data.txt"
const data = await readFile(testPath)
const rows = data.trim().split(/\r?\n/)
const starsToMultiply = []
let result = 0

for (let i = 0; i < rows.length; i++) {
  let row = rows[i]
  const nums = [...row.matchAll(/[0-9]+/g)]

  nums.forEach(numMatch => {
    console.log("\n\n")
    const num = numMatch[0]
    const numIndex = numMatch.index

    checkForGearRatio(num, numIndex - 1, num.length + 1, i, rows)
  })
}
const combinedArray = MultiplyArr(starsToMultiply)

combinedArray.forEach(n => {
  result += parseInt(n.num)
})

console.log("result = ", result)

function MultiplyArr(arr) {
  const newArr = arr.reduce((result, current) => {
    const existingEntry = result.find(
      entry => entry.index === current.index && entry.row === current.row
    )

    if (existingEntry) {
      existingEntry.num *= parseInt(current.num)
      existingEntry.isMultiplied = true
    } else {
      result.push({ ...current, num: parseInt(current.num) })
    }

    return result
  }, [])
  return newArr.filter(e => e.isMultiplied === true)
}

function checkForGearRatio(num, numIndex, length, i, rows) {
  let res = false
  if (numIndex < 0) {
    numIndex = 0
    length -= 1
  }
  const workstr0 = rows[i - 1]
    ? rows[i - 1].substring(numIndex, numIndex + length + 1)
    : ""
  const workstr1 = rows[i].substring(numIndex, numIndex + length + 1)
  const workstr2 = rows[i + 1]
    ? rows[i + 1].substring(numIndex, numIndex + length + 1)
    : ""
  const regex = /[*]/g

  const stars0 = [...workstr0.matchAll(regex)]
  const stars1 = [...workstr1.matchAll(regex)]
  const stars2 = [...workstr2.matchAll(regex)]

  if (stars0.length !== 0) {
    let ob = { index: stars0[0].index + numIndex, row: i - 1, num: num }
    starsToMultiply.push(ob)
    res = true
  }
  if (stars1.length !== 0) {
    let ob = { index: stars1[0].index + numIndex, row: i, num: num }
    starsToMultiply.push(ob)
    res = true
  }
  if (stars2.length !== 0) {
    let ob = { index: stars2[0].index + numIndex, row: i + 1, num: num }
    starsToMultiply.push(ob)
    res = true
  }
  return res
}
