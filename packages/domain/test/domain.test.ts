import { describe, expect, it } from "vitest";
import { DOMAIN_VERSION } from "../src/index";

describe("domain package", () => {
  it("loads", () => {
    expect(DOMAIN_VERSION).toBe(1);
  });
});
