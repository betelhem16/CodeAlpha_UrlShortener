const MAX_URL_LENGTH = 2048;
const ALLOWED_PROTOCOLS = ["http:", "https:"];

export function isValidUrl(input: string): boolean {
  if (!input || typeof input !== "string") {
    return false;
  }

  if (input.length > MAX_URL_LENGTH) {
    return false;
  }

  try {
    const parsed = new URL(input);
    return ALLOWED_PROTOCOLS.includes(parsed.protocol);
  } catch {
    return false;
  }
}