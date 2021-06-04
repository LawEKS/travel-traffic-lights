import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"

export const parseDoc = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")

  const tables = doc.querySelectorAll("table")
  const data = [...tables].map((table) => {
    const status = table
      .querySelector("thead th:first-child")
      .textContent.split(" ")[0]
      .toLowerCase()

    const countries = [...table.querySelectorAll("tbody th:first-child")].map(
      (cell) => cell.textContent.trim()
    )
    const changes = [...table.querySelectorAll("tbody th:last-child")].map(
      (cell) => cell.textContent.trim()
    )
    if (changes.length)
      console.log(changes)
    return {
      status,
      countries,
      changes,
    }
  })

  return data
}