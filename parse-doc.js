import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"

export const parseDoc = (html) => {
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

  return data
}