import { addLocationData } from "./add-location-data.ts";

import { extractFlatCountyData } from "./extract-flat-country-data.ts";
import { removeFile, writeTXT } from "https://deno.land/x/flat/mod.ts";

try {
  const filename = Deno.args[0];
  const html = await Deno.readTextFile(filename);
  const countryData = extractFlatCountyData(html);
  const data = await addLocationData(countryData);
  const json = JSON.stringify(data, null, 2);
  await Deno.writeTextFile("travel-traffic-lights.json", json);
  await Deno.writeTextFile(
    "public/travel-traffic-lights.js",
    `const data = ${json}`,
  );
  await removeFile(filename);
  await removeFile("errors.txt").catch(() => {});
} catch (error) {
  console.log(error);
  await writeTXT("errors.txt", error);
}
