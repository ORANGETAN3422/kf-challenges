const csvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7-0BdqsPSi3PTWjpCI7ipSCVswx9Hv0MFHTVBpRzZRq47uFpaS5MdKKIMFcE9nNuinXHSr46VYgXn/pub?gid=0&single=true&output=csv";

export async function fetchCsv() {
  const res = await fetch(csvUrl);
  const text = await res.text();
  return text;
}

export async function fetchCurrentWeek(csvData) {
  const lines = csvData.split("\n").map((line) => line.trim());
  const firstLine = lines[0];
  const firstColumn = firstLine.split(",")[0];

  const match = firstColumn.match(/\[(.*?)\]/);
  const currentWeek = match ? match[1] : "01";

  return currentWeek;
}
