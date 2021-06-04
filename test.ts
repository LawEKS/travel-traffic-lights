import { assert } from "https://deno.land/std@0.95.0/testing/asserts.ts";
import { parseDoc } from "./parse-doc.ts"

Deno.test("can parse document and extract data", async () => {
  const html = await Deno.readTextFile("./test-doc.html")
  const data = parseDoc(html)
  assert(data && data.length === 3, "document contains three tables")
})
