// Only photographs of the actual salon are used. Stock imagery was removed because
// its descriptions presented it as Urmi's staff, clients or premises.
// Real work/team/entrance photos are still needed: see docs/local-search-handoff.md.

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const heroImage: ImageAsset = {
  src: "/urmimainfront.png",
  alt: "Inside Urmi Threading Salon: styling chairs, mirrors and the front counter",
  width: 1360,
  height: 1020,
};

export const salonStationsImage: ImageAsset = {
  src: "/images/salon-stations.jpg",
  alt: "Service chairs and mirrored stations inside Urmi Threading Salon",
  width: 680,
  height: 510,
};
