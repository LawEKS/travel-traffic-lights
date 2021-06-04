import {
  assert,
  assertArrayIncludes,
} from "https://deno.land/std@0.95.0/testing/asserts.ts";
import { parseDoc } from "./parse-doc.ts";

Deno.test("can parse document and extract data", async () => {
  const html = await Deno.readTextFile("./test-doc.html");
  const data = parseDoc(html);
  assert(data?.length === 3);
});

Deno.test("table with changes", () => {
  const html = /* html */ `
    <!DOCTYPE html>
    <body>
      <table>
        <thead>
          <tr>
            <th scope="col">Green list</th>
            <th scope="col">Green watchlist and upcoming changes to the green list</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Australia</th>
            <td> </td>
          </tr>
          <tr>
            <th scope="row">Portugal (including the Azores and Madeira)</th>
            <td>Currently on the green list. Will move to amber list 4am, Tuesday 8 June. If you arrive in England after then you need to <a href="#amber-list" class="govuk-link">follow the amber list rules</a>.</td>
          </tr>
        </tbody>
    </table>
    </body>
  </html>
  `;
  const data = parseDoc(html);
  const countries = data?.[0]?.countries ?? [];
  const changes = data?.[0]?.changes ?? [];
  assertArrayIncludes(countries, [
    "Australia",
    "Portugal (including the Azores and Madeira)",
  ]);
  assertArrayIncludes(changes, [
    "",
    "Currently on the green list. Will move to amber list 4am, Tuesday 8 June. If you arrive in England after then you need to follow the amber list rules.",
  ]);
});
