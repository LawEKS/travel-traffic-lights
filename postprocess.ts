import { parseDoc } from "./parse-doc.ts";
import {
  writeJSON,
  writeTXT,
  removeFile,
} from "https://deno.land/x/flat/mod.ts";

try {
  const filename = Deno.args[0];
  const html = await Deno.readTextFile(filename);
  const data = parseDoc(html);
  await writeJSON("travel-traffic-lights.json", data);
  await removeFile(filename);
  await removeFile("errors.txt").catch(() => {});
} catch (error) {
  console.log(error);
  await writeTXT("errors.txt", error);
}
