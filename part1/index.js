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

const testPath = "part1/data.txt"
const data = await readFile(testPath)
const rows = data.trim().split(/\r?\n/)
const numToSum = []
let result = 0

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

numToSum.forEach(n => {
  result += parseInt(n)
})
console.log("result = ", result)

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

  const workstr = row.substring(startIndex, startIndex + length + 1)
  console.log(
    startIndex,
    length,
    containsNonNumericOrDot(workstr),
    "\t",
    workstr
  )
  return containsNonNumericOrDot(workstr)
}

function containsNonNumericOrDot(str) {
  const regex = /[^0-9.]/
  return regex.test(str)
}
