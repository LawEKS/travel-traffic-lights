import { extractFlatCountyData } from "./extract-flat-country-data.ts";
import { removeFile, writeTXT } from "https://deno.land/x/flat/mod.ts";

try {
  const filename = Deno.args[0];
  const html = await Deno.readTextFile(filename);
  const data = extractFlatCountyData(html);
  await Deno.writeTextFile(
    "travel-traffic-lights.json",
    JSON.stringify(data, null, 2),
  );
  await removeFile(filename);
  await removeFile("errors.txt").catch(() => {});
} catch (error) {
  console.log(error);
  await writeTXT("errors.txt", error);
}
