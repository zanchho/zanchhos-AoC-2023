import { readFile } from "../getDataFromFile.js"

const path = "day4/data.txt"
const data = await readFile(path)
const rows = data.split(/\r?\n/)
const cardArr = []
class Card {
  constructor(name, arrHave, arrWin) {
    this.name = name
    this.have = arrHave || []
    this.win = arrWin || []
  }

  _countWinningNumbers() {
    const commonNumbers = []
    const count = this.have.reduce((commonCount, num1) => {
      if (this.win.includes(num1)) {
        commonNumbers.push(num1)
        return commonCount + 1
      }
      return commonCount
    }, 0)
    console.log("Values of:", this.name)
    console.log("Number of common elements:", count)
    console.log("Common numbers:", commonNumbers)
    console.log()
    return count
  }

  getWorth() {
    const count = this._countWinningNumbers()
    if (count === 0) return 0
    let res = 0
    for (let i = 0; i < count; i++) {
      i !== 0 ? (res *= 2) : (res += 1)
    }
    // (1 for the first match, then doubled three times for each of the three matches after the first).
    return res
  }
}

//important
part1()

//functions
function part1() {
  let res = 0
  addCards()
  cardArr.forEach(e => (res += e.getWorth()))
  console.log("Result for Part1:", res)
}
function addCards() {
  rows.forEach(row => {
    const name = row.substring(0, row.indexOf(":"))
    const winN = row.substring(row.indexOf(":") + 1, row.indexOf("|"))
    const haveN = row.substring(row.indexOf("|") + 1, row.length)
    console.log("row: ", row)
    console.log()
    console.log("winN", winN)
    console.log()
    console.log("haveN", haveN)

    console.log("winN", getNumbers(winN))
    console.log()
    console.log("haveN", getNumbers(haveN))

    cardArr.push(new Card(name, getNumbers(haveN), getNumbers(winN)))
  })
}
function getNumbers(str) {
  const res = []
  const numbers = [...str.matchAll(/ [0-9]+/g)]

  numbers.forEach(e => {
    res.push(Number(e[0].trim()))
  })
  return res
}
