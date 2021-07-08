import {
  assertEquals,
  assertObjectMatch,
} from "https://deno.land/std@0.95.0/testing/asserts.ts";
import "https://deno.land/x/dotenv/load.ts";
import { addLocationData, TableDataWithLocation } from "./add-location-data.ts";
import { getLocationData } from "./get-location-data.ts";

const originalFetch = fetch;
const mockFetch = (response = {}) => {
  (globalThis.fetch as unknown) = () =>
    Promise.resolve({
      json: () => Promise.resolve(response),
    });
};
const unMockFetch = () => {
  globalThis.fetch = originalFetch;
};

const originalSetTimeout = setTimeout;
const mockSetTimeout = () => {
  (globalThis.setTimeout as unknown) = (cb: () => void) => {
    cb();
  };
};
const unMockSetTimeout = () => {
  globalThis.setTimeout = originalSetTimeout;
};

const response = {
  results: [
    {
      geometry: {
        location: {
          lat: 1,
          lng: -1,
        },
      },
    },
  ],
  status: "OK",
};

Deno.test("can request location data", async () => {
  mockFetch(response);
  const country = "Pitcairn, Henderson, Ducie and Oeno Islands";
  const data = await getLocationData(country);
  assertEquals(data, {
    location: {
      lat: 1,
      lng: -1,
    },
  });
  unMockFetch();
});

const badResponse = {
  results: [{}],
  status: "OK",
};

Deno.test("can request location data with bad response", async () => {
  mockFetch(badResponse);
  const country = "Pitcairn, Henderson, Ducie and Oeno Islands";
  const data = await getLocationData(country);
  assertEquals(data, {
    location: null,
  });
  unMockFetch();
});

const countryData = [
  {
    status: "",
    country: "Afghanistan",
    changes: null,
  },
  {
    status: "",
    country: "Angola",
    changes: null,
  },
  {
    status: "",
    country: "Argentina",
    changes: null,
  },
  {
    status: "",
    country: "Bahrain",
    changes: null,
  },
  {
    status: "",
    country: "Bangladesh",
    changes: null,
  },
  {
    status: "",
    country: "Bolivia",
    changes: null,
  },
  {
    status: "",
    country: "Botswana",
    changes: null,
  },
  {
    status: "",
    country: "Brazil",
    changes: null,
  },
  {
    status: "",
    country: "Burundi",
    changes: null,
  },
];

Deno.test("can add location data to country data", async () => {
  mockFetch(response);
  mockSetTimeout();
  const chunkSize = 2;
  const results = (await addLocationData(
    countryData,
    chunkSize,
  )) as TableDataWithLocation[];

  results.forEach((item) => {
    assertObjectMatch(item, {
      location: {
        lat: 1,
        lng: -1,
      },
    });
  });
  assertEquals(results.length, countryData.length);
  unMockSetTimeout();
  unMockFetch();
});
