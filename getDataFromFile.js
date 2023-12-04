import { promises } from "fs"

export const readFile = async path => {
  try {
    const data = await promises.readFile(path, "utf-8")
    return data
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}
