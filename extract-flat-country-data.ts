import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom@v0.1.12-alpha/deno-dom-wasm.ts";

export interface TableData {
  status?: string;
  country?: string;
  changes: string | null;
}

export const extractFlatCountyData = (html: string): TableData[] | null => {
  const doc = new DOMParser().parseFromString(html, "text/html");

  if (!doc) return null;

  const tables = doc.querySelectorAll("table") as unknown as Element[];
  const data = [...tables]
    .map((table) => {
      if (!table) return null;

      const status = table
        .querySelector("thead th:first-child")
        ?.textContent.split(" ")[0]
        .toLowerCase();

      const tableBodyChildren = table.querySelector("tbody")?.children;
      let countryChanges;
      if (tableBodyChildren) {
        countryChanges = [...tableBodyChildren].map((el) => {
          const country = el.querySelector("th")?.textContent.trim();
          const changes = el.querySelector("td")?.textContent.trim() || null;
          return { status, country, changes };
        });
      }

      return countryChanges ?? null;
    })
    .filter((item) => item !== null);

  return (data as unknown as TableData[]).flat();
};
