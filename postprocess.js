import { parseDoc } from "./parse-doc.js"
import { writeJSON, writeTXT } from "https://deno.land/x/flat/mod.ts"

try {
  const filename = Deno.args[0]
  const html = Deno.readFileSync(filename)
  const data = parseDoc(html)
  const newFilename = "travel-traffic-lights.json"
  await writeJSON(newFilename, data)
  await removeFile(filename)
} catch (error) {
  console.log(error)
  await writeTXT("errors.txt", error)
}
