import { describe, it, expect } from "vitest";
import { isValidUrl } from "./urlValidationService";

describe("isValidUrl", () => {
  it("accepts a valid https URL", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
  });

  it("accepts a valid http URL", () => {
    expect(isValidUrl("http://example.com")).toBe(true);
  });

  it("rejects a javascript: URL", () => {
    expect(isValidUrl("javascript:alert(1)")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isValidUrl("")).toBe(false);
  });

  it("rejects a malformed string", () => {
    expect(isValidUrl("not a url at all")).toBe(false);
  });

  it("rejects a URL exceeding the max length", () => {
    const longUrl = "https://example.com/" + "a".repeat(2050);
    expect(isValidUrl(longUrl)).toBe(false);
  });
});