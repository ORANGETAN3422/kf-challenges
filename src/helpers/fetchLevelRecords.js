export function findRecordsForLevel(csvData, week, level) {
  const lines = csvData.replace(/\r\n/g, "\n").split("\n");
  const weekStr = `WEEK ${String(week).padStart(2, "0")}`;
  const levelId = String(level);

  const victors = [];

  const weekIndex = lines.findIndex((line) => line.startsWith(weekStr));
  if (weekIndex === -1) return victors;

  const nameLine = lines[0];
  const names = nameLine.split(",").slice(1);

  for (let i = weekIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("WEEK") || line === "") break;

    const columns = line.split(",");
    const levelColumn = columns[0];

    const match = levelColumn.match(/\[(\d+)\]/);
    if (!match || match[1] !== levelId) continue;

    for (let j = 1; j < columns.length; j++) {
      if (columns[j].trim().toLowerCase() === "complete") {
        victors.push(names[j - 1]);
      }
    }
  }

  return victors;
}

export function fetchLeaderboard(csvData, currentWeek, allTime = false) {
  const lines = csvData.replace(/\r/g, "").split("\n");
  const weekStr = `WEEK ${String(currentWeek).padStart(2, "0")}`;
  const rowStr = allTime ? "POINTS (ALL-TIME)" : "POINTS (WEEK)";

  const leaderboard = [];

  // Get player names (1st row)
  const nameLine = lines[0];
  const names = nameLine.split(",").slice(1); // skip "CURRENT WEEK"

  // Find the starting index of the current week
  const weekIndex = lines.findIndex((line) => line.startsWith(weekStr));
  if (weekIndex === -1) return leaderboard;

  // Find the row within the week section
  for (let i = weekIndex; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith(rowStr)) {
      const parts = line.split(",").slice(1); // skip label
      for (let j = 0; j < names.length; j++) {
        const rawPoints = parts[j]?.trim();
        const points = parseInt(rawPoints, 10);
        if (!isNaN(points)) {
          leaderboard.push({ name: names[j], points });
        }
      }
      break;
    }

    if (line.startsWith("WEEK") && i !== weekIndex) break;
  }

  leaderboard.sort((a, b) => b.points - a.points);

  return leaderboard;
}
