import {
  assert,
  assertArrayIncludes,
} from "https://deno.land/std@0.95.0/testing/asserts.ts";
import fakeDoc from "./fake-doc.ts";
import { extractFlatCountyData } from "./extract-flat-country-data.ts";

Deno.test("can parse document and extract data", () => {
  const data = extractFlatCountyData(fakeDoc);
  assert(data && data.length > 0);
});

Deno.test("table with changes", () => {
  const data = extractFlatCountyData(fakeDoc);
  const actual = data ?? [];
  assertArrayIncludes(actual, [
    { status: "green", country: "Australia", changes: null },
    {
      status: "green",
      country: "Portugal (including the Azores and Madeira)",
      changes:
        "Currently on the green list. Will move to amber list 4am, Tuesday 8 June. If you arrive in England after then you need to follow the amber list rules.",
    },
  ]);
});
