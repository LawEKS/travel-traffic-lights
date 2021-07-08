export interface LocationData {
  location: {
    lat: number;
    lng: number;
  } | null;
}

export const getLocationData = async (
  country: string,
): Promise<LocationData> => {
  try {
    const blob = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${
        Deno.env.get(
          "GOOGLE_API_KEY",
        )
      }&address=${encodeURI(country)}`,
    );
    const data = await blob.json();
    const location = data.results[0].geometry.location ?? null;
    return { location };
  } catch {
    return { location: null };
  }
};
