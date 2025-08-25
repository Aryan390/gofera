// function that takes date string and give year only
export const getYear = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

export function formatPhone(phone, extension = "+1") {
  // remove spaces, dashes, parentheses
  const cleaned = ("" + phone).replace(/\D/g, "");

  console.log(cleaned);
  if (phone && extension === "+1") {
    // US format: (XXX) XXX-XXXX
    const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+1 (${match[1]}) ${match[2]}-${match[3]}`;
    }
  } else {
    // Indian format: +91 XXXXX-XXXXX
    // ensure it has 10 digits at the end
    const match = cleaned.match(/(\d{5})(\d{5})$/);
    if (match) {
      return `+91 ${match[1]}-${match[2]}`;
    }
  }

  return phone; // fallback (if it doesn’t match expected pattern)
}

export function formatDateForInput(value) {
  if (!value) return "";
  const d = new Date(value);
  // Convert to local date (strip tz shift) then take YYYY-MM-DD
  const tzOff = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOff).toISOString().slice(0, 10);
}

export function formatTimeForInput(value) {
  if (!value) return "";
  // handles "HH:MM", "HH:MM:SS", and "03:21 PM"
  const ampm = value.match(/am|pm/i);
  if (ampm) {
    const [, hh, mm, ap] = value.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) || [];
    if (!hh) return "";
    let h = parseInt(hh, 10) % 12;
    if (/pm/i.test(ap)) h += 12;
    return `${String(h).padStart(2, "0")}:${mm}`;
  }
  // already 24h: "15:21" or "15:21:00"
  const m = value.match(/^(\d{2}):(\d{2})/);
  return m ? `${m[1]}:${m[2]}` : "";
}

// (optional) build an ISO string to send to backend
export function combineDateTime(dateYYYYMMDD, timeHHMM) {
  if (!dateYYYYMMDD || !timeHHMM) return null;
  // build local datetime then convert to ISO
  const [y, m, d] = dateYYYYMMDD.split("-").map(Number);
  const [hh, mm] = timeHHMM.split(":").map(Number);
  const local = new Date(y, m - 1, d, hh, mm, 0, 0);
  return local.toISOString();
}
