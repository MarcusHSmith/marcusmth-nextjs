export const FULL_NAME = "Marcus Smith";

// Reading series constants
export const READING_SERIES_PREFIX = "reading-";
export const READING_BASE_SLUG = "reading";
export const RESTAURANTS_SLUG = "restaurants";
export const SUPERYACHTS_SLUG = "superyachts";

export const RESTAURANTS_READING_SERIES_LINK = `/${READING_BASE_SLUG}/${RESTAURANTS_SLUG}`;
export const SUPERYACHTS_READING_SERIES_LINK = `/${READING_BASE_SLUG}/${SUPERYACHTS_SLUG}`;

export const READING_SERIES_SLUGS = {
  [RESTAURANTS_SLUG]: RESTAURANTS_READING_SERIES_LINK,
  [SUPERYACHTS_SLUG]: SUPERYACHTS_READING_SERIES_LINK,
} as const;
