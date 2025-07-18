const csvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7-0BdqsPSi3PTWjpCI7ipSCVswx9Hv0MFHTVBpRzZRq47uFpaS5MdKKIMFcE9nNuinXHSr46VYgXn/pub?gid=0&single=true&output=csv";

const CSV_CACHE_KEY = "weekly_csv_data";
const CSV_CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

function getCachedCsv() {
  const cached = localStorage.getItem(CSV_CACHE_KEY);
  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached);
    const now = Date.now();

    if (now - parsed.timestamp < CSV_CACHE_TTL) {
      return parsed.data;
    } else {
      localStorage.removeItem(CSV_CACHE_KEY); // stale
    }
  } catch {
    localStorage.removeItem(CSV_CACHE_KEY); // corrupted
  }

  return null;
}

function cacheCsv(text) {
  localStorage.setItem(CSV_CACHE_KEY, JSON.stringify({
    timestamp: Date.now(),
    data: text
  }));
}

export async function fetchCsv() {
  const cached = getCachedCsv();
  if (cached) {
    console.log("Using cached CSV data");
    return cached;
  }

  const res = await fetch(csvUrl);
  const text = await res.text();
  cacheCsv(text);
  return text;
}

export async function fetchCurrentWeek(csvData) {
  const lines = csvData.split("\n").map((line) => line.trim());
  const firstLine = lines[0];
  const firstColumn = firstLine.split(",")[0]; // assuming CSV is comma-separated

  const match = firstColumn.match(/\[(.*?)\]/);
  const currentWeek = match ? match[1] : "01";

  return currentWeek;
}
