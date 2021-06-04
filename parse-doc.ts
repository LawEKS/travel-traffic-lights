import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

export const parseDoc = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");

  if (!doc) return null;

  const tables = doc.querySelectorAll("table") as unknown as Element[];
  const data = [...tables].map((table) => {
    if (!table) return {};

    const status = table
      .querySelector("thead th:first-child")
      ?.textContent.split(" ")[0]
      .toLowerCase();

    const countries = [...table.querySelectorAll("tbody th:first-child")].map(
      (cell) => cell.textContent.trim(),
    );
    const changes = [...table.querySelectorAll("tbody th:last-child")].map(
      (cell) => cell.textContent.trim(),
    );

    return {
      status,
      countries,
      changes,
    };
  });

  return data;
};
