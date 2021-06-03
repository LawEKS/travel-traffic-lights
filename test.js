import { assert } from "https://deno.land/std@0.95.0/testing/asserts.ts";
import { parseDoc } from "./parse-doc.js"

Deno.test("Parsing document results with a list of three items", () => {
  const html = Deno.readFileSync("./test-doc.html")
  const data = parseDoc(html)
  assert(data.length = 3, "document has three tables")
})