import { delay } from "https://deno.land/std/async/mod.ts";
import { TableData } from "./extract-flat-country-data.ts";
import { getLocationData, LocationData } from "./get-location-data.ts";

let RATE_LIMIT = 50;
const GOOGLE_RATE_LIMIT = Deno.env.get("GOOGLE_RATE_LIMIT");
if (GOOGLE_RATE_LIMIT) {
  RATE_LIMIT = +GOOGLE_RATE_LIMIT;
}

export interface TableDataWithLocation extends TableData, LocationData {}

export const addLocationData = async (
  data: TableData[] | null,
  chunkSize = RATE_LIMIT - 1,
): Promise<TableDataWithLocation[] | null> => {
  if (!data) return null;

  const numberOfChunks = Math.ceil(data.length / chunkSize);
  console.info({ numberOfChunks });

  const chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    const requests = chunk.map((item) => {
      if (!item.country) return { ...item, location: null };
      return getLocationData(item.country).then((location) => ({
        ...item,
        ...location,
      }));
    });
    const results = await Promise.all(requests);
    await delay(60 * 1000);
    chunks.push(results);
  }

  return chunks.flat();
};
