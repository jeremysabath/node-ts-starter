import fs from "fs"
import { promisify } from "util"
import puppeteer from "puppeteer"
import moment from "moment"

const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)

const main = async (): Promise<void> => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent("<html><body><h1>Hello PDF</h1</body></html>")
    const pdf = await page.pdf()

    await mkdir("output", { recursive: true })
    await writeFile(
      `output/${moment().format("YYYY-MM-DD - hh.mm.ss")}.pdf`,
      pdf
    )
    console.log("wrote PDF 🤙🏻")
  } catch (error) {
    console.error("Error: ", error)
  }
}

main()
