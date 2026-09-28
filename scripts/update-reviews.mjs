// Pulls the live Google rating + review count for the salon and writes them
// into src/lib/constants.ts. Run daily by .github/workflows/update-reviews.yml.
//
// Env: GOOGLE_PLACES_API_KEY (required), GOOGLE_PLACE_ID (optional — looked up by name if missing)
import fs from "node:fs";

const KEY = process.env.GOOGLE_PLACES_API_KEY;
const FILE = new URL("../src/lib/constants.ts", import.meta.url);

if (!KEY) {
  console.error("GOOGLE_PLACES_API_KEY is not set");
  process.exit(1);
}

async function getPlace() {
  const headers = { "X-Goog-Api-Key": KEY };
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (placeId) {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: { ...headers, "X-Goog-FieldMask": "id,displayName,rating,userRatingCount" },
    });
    if (!res.ok) throw new Error(`Place Details ${res.status}: ${await res.text()}`);
    return res.json();
  }

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      "X-Goog-FieldMask": "places.id,places.displayName,places.rating,places.userRatingCount",
    },
    body: JSON.stringify({ textQuery: "Urmi Threading Salon, 150 Hinchman Ave, Wayne, NJ 07470" }),
  });
  if (!res.ok) throw new Error(`Text Search ${res.status}: ${await res.text()}`);
  const place = (await res.json()).places?.[0];
  if (!place) throw new Error("Salon not found on Google Places");
  console.log(`Tip: set GOOGLE_PLACE_ID=${place.id} to skip the lookup`);
  return place;
}

const place = await getPlace();
const rating = Number(place.rating);
const count = Number(place.userRatingCount);
console.log(`${place.displayName?.text}: ${rating} ★ from ${count} reviews`);

// Sanity guard — never write junk (or a big drop from a bad match) into the site.
if (!(rating >= 1 && rating <= 5) || !(count > 0)) throw new Error("Unexpected values from Google");

let src = fs.readFileSync(FILE, "utf8");
const current = Number(src.match(/reviewCount: (\d+),/)?.[1]);
if (current && count < current * 0.8) throw new Error(`Count dropped from ${current} to ${count}; refusing to update`);

const next = src
  .replace(/rating: [\d.]+,/, `rating: ${rating.toFixed(1)},`)
  .replace(/reviewCount: \d+,/, `reviewCount: ${count},`);

if (next === src) {
  console.log("No change");
} else {
  fs.writeFileSync(FILE, next);
  console.log("Updated constants.ts");
}
