"use strict"
import { promises } from "fs"

const testPath = "data.txt"

const readFile = async path => {
  try {
    const data = await promises.readFile(path, "utf-8")
    return data
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}

const data = await readFile(testPath)
const rows = data.trim().split(/\r?\n/)

const numToSum = []
for (let i = 0; i < rows.length; i++) {
  let row = rows[i]
  const nums = [...row.matchAll(/[0-9]+/g)]
  nums.forEach(numMatch => {
    console.log("\n\n")
    const num = numMatch[0]
    const numIndex = numMatch.index

    if (
      checkIfQualifies(numIndex - 1, num.length + 1, rows[i - 1]) ||
      checkIfQualifies(numIndex - 1, num.length + 1, rows[i]) ||
      checkIfQualifies(numIndex - 1, num.length + 1, rows[i + 1])
    )
      numToSum.push(num)
  })
}
function checkIfQualifies(startIndex, length, row) {
  if (!length || !row) {
    console.log("false because invalid")
    return false
  }

  if (row.length <= startIndex + length) {
    length = row.length - startIndex - 1
  }
  if (startIndex < 0) {
    startIndex = 0
    length -= 1
  }
  //console.log(startIndex, length, row)
  try {
    const workstr = row.substring(startIndex, startIndex + length + 1)
    console.log(
      startIndex,
      length,
      containsNonNumericOrDot(workstr),
      "\t",
      workstr
    )
    return containsNonNumericOrDot(workstr)
  } catch (e) {
    console.error(e)
    return true
  }
}
function containsNonNumericOrDot(str) {
  const regex = /[^0-9.]/
  return regex.test(str)
}
let result = 0
numToSum.forEach(n => {
  result += parseInt(n)
})
console.log("result = ", result)
