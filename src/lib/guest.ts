const GUEST_NAME_KEY = "wedding_guest_name";
const GUEST_CODE_KEY = "wedding_guest_code";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/19I_1J2xh4ZyGDheAUdYBJDw8NX8BUHCqKg219O3069A/gviz/tq?tqx=out:csv";

export interface Guest {
  name: string;
  code: string;
}

export async function validateInviteCode(code: string): Promise<Guest | null> {
  try {
    const res = await fetch(SHEET_CSV_URL);
    const text = await res.text();
    const rows = text
      .split("\n")
      .map((row) =>
        row.split(",").map((cell) => cell.replace(/^"|"$/g, "").trim())
      )
      .filter((row) => row[0]);

    const entered = code.trim().toUpperCase();

    // Column A holds the guest name; the access code is the first name
    // (first word) of that name, matched case-insensitively, any length.
    const match = rows.find((row) => {
      const firstName = (row[0] || "").trim().split(/\s+/)[0] || "";
      return firstName.toUpperCase() === entered;
    });

    if (match) {
      return { name: match[0], code: entered };
    }
    return null;
  } catch (err) {
    console.error("Failed to validate invite code:", err);
    return null;
  }
}


export function saveGuest(guest: Guest) {
  sessionStorage.setItem(GUEST_NAME_KEY, guest.name);
  sessionStorage.setItem(GUEST_CODE_KEY, guest.code);
  localStorage.removeItem(GUEST_NAME_KEY);
  localStorage.removeItem(GUEST_CODE_KEY);
}

export function getGuestName(): string {
  return sessionStorage.getItem(GUEST_NAME_KEY) || "Guest";
}

export function getGuestCode(): string {
  return sessionStorage.getItem(GUEST_CODE_KEY) || "";
}

export function isLoggedIn(): boolean {
  return !!sessionStorage.getItem(GUEST_CODE_KEY);
}

export function logoutGuest() {
  sessionStorage.removeItem(GUEST_NAME_KEY);
  sessionStorage.removeItem(GUEST_CODE_KEY);
  localStorage.removeItem(GUEST_NAME_KEY);
  localStorage.removeItem(GUEST_CODE_KEY);
}
