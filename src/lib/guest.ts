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
      .filter((row) => row.length >= 3 && row[0]);

    const entered = code.trim().toUpperCase();

    // Column C holds the access code; column A holds the guest name.
    const match = rows.find(
      (row) => (row[2] || "").trim().toUpperCase() === entered
    );

    if (match) {
      return { name: match[0], code: (match[2] || "").trim().toUpperCase() };
    }
    return null;
  } catch (err) {
    console.error("Failed to validate invite code:", err);
    return null;
  }
}


export function saveGuest(guest: Guest) {
  localStorage.setItem(GUEST_NAME_KEY, guest.name);
  localStorage.setItem(GUEST_CODE_KEY, guest.code);
}

export function getGuestName(): string {
  return localStorage.getItem(GUEST_NAME_KEY) || "Guest";
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem(GUEST_CODE_KEY);
}

export function logoutGuest() {
  localStorage.removeItem(GUEST_NAME_KEY);
  localStorage.removeItem(GUEST_CODE_KEY);
}
