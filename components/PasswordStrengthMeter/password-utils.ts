/** Convert SHA1 hex to uppercase */
export async function sha1(str: string): Promise<string> {
  const buf = new TextEncoder().encode(str);
  const hashBuf = await crypto.subtle.digest("SHA-1", buf);
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

/** k-anonymity check against HaveIBeenPwned Passwords API */
export async function checkPwnedPassword(password: string): Promise<boolean> {
  try {
    const hash = await sha1(password);
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { "Add-Padding": "true" },
    });
    if (!res.ok) return false;
    const text = await res.text();
    return text.split("\r\n").some((line) => line.startsWith(suffix));
  } catch {
    return false;
  }
}

/** Simple zxcvbn-like scoring based on password characteristics */
export function scorePassword(password: string): { score: number; feedback: string } {
  if (password.length === 0) return { score: 0, feedback: "" };

  const hasLength = password.length >= 8;
  const hasDigit = /[0-9]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  const isLong = password.length >= 12;

  const requiredMet = hasLength && hasDigit && hasUpper;

  let score = 0;
  if (hasLength) score++;
  if (hasDigit) score++;
  if (hasUpper) score++;
  if (isLong || hasSpecial) score++;

  score = Math.min(4, score);

  if (!requiredMet && score >= 3) score = 2;

  const labels: Record<number, string> = {
    0: "слишком слабый",
    1: "очень слабый",
    2: "слабый",
    3: "хороший",
    4: "отличный",
  };

  const label = labels[score] ?? "";
  const time = score >= 3 ? ` · ${estimateCrackTime(password)}` : "";

  return { score, feedback: label + time };
}

function estimateCrackTime(password: string): string {
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  const entropy = password.length * Math.log2(poolSize || 1);
  const guessesPerSec = 1e10;
  const seconds = Math.pow(2, entropy) / guessesPerSec;
  const years = seconds / (86400 * 365);

  if (years < 1) return "~мгновенно";
  if (years > 500) return "500+ лет";
  return `~${Math.round(years)} лет`;
}
