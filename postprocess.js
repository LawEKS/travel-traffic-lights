import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import { writeJSON, writeTXT } from "https://deno.land/x/flat/mod.ts"

try {
  const filename = Deno.args[0]
  const html = Deno.readFileSync(filename)

  const doc = new DOMParser().parseFromString(html, "text/html")

  const tables = doc.querySelectorAll("table")
  console.log("number of tables", tables.length)
  const data = [...tables].map((table) => {
    const status = table
      .querySelector("thead th:first-child")
      .textContent.split(" ")[0]
      .toLowerCase()

    console.log("status", status)

    const countries = [...table.querySelectorAll("tbody th:first-child")].map(
      (cell) => cell.textContent.trim()
    )
    const changes = [...table.querySelectorAll("tbody th:last-child")].map(
      (cell) => cell.textContent.trim()
    )
    return {
      status,
      countries,
      changes,
    }
  })
  const newFilename = "travel-traffic-lights.json"
  await writeJSON(newFilename, data)
  await removeFile(filename)
} catch (error) {
  console.log(error)
  await writeTXT("errors.txt", error)
}
