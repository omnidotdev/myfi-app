import { afterAll, beforeEach, describe, expect, mock, test } from "bun:test";

const calls: string[] = [];

const mockSignOutLocal = mock(async () => {
  calls.push("signOutLocal");
  return { idpLogoutUrl: "https://identity.example/end-session" };
});
const mockSignIn = mock(async (_params: unknown) => {
  calls.push("signIn");
});

// Module mocks are process-wide in bun, so keep every other export real for
// the test files that run after this one
const authFns = await import("@/server/functions/auth");
mock.module("@/server/functions/auth", () => ({
  ...authFns,
  signOutLocal: mockSignOutLocal,
}));
const signInModule = await import("@/lib/auth/signIn");
mock.module("@/lib/auth/signIn", () => ({
  ...signInModule,
  default: mockSignIn,
}));

// Import after mocking
const { followSignOut, followSwitch } = await import("./followIdentity");

// Stand-in for the browser location the helpers read and navigate with
const location = { href: "", pathname: "", search: "" };
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");

describe("followIdentity", () => {
  beforeEach(() => {
    calls.length = 0;
    mockSignOutLocal.mockClear();
    mockSignIn.mockClear();
    Object.assign(location, {
      href: "https://app.example/settings?tab=profile",
      pathname: "/settings",
      search: "?tab=profile",
    });
    Object.defineProperty(globalThis, "window", {
      value: { location },
      configurable: true,
      writable: true,
    });
  });

  afterAll(() => {
    if (originalWindow)
      Object.defineProperty(globalThis, "window", originalWindow);
    else Reflect.deleteProperty(globalThis, "window");
  });

  test("a switched Omni account signs out locally, then signs in again on the same page", async () => {
    await followSwitch();

    expect(calls).toEqual(["signOutLocal", "signIn"]);
    expect(mockSignIn).toHaveBeenCalledWith({
      redirectUrl: "/settings?tab=profile",
      providerId: "omni",
    });
  });

  test("an Omni sign-out ends only the local session and never the federated one", async () => {
    await followSignOut();

    expect(calls).toEqual(["signOutLocal"]);
    expect(mockSignIn).not.toHaveBeenCalled();
    // The identity provider end-session URL is ignored
    expect(location.href).toBe("/");
  });
});
