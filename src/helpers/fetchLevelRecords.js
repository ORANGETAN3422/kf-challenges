export function findRecordsForLevel(csvData, week, level) {
  const lines = csvData.replace(/\r\n/g, '\n').split('\n');
  const weekStr = `WEEK ${String(week).padStart(2, '0')}`;
  const levelId = String(level);

  const victors = [];

  const weekIndex = lines.findIndex(line => line.startsWith(weekStr));
  if (weekIndex === -1) return victors;

  const nameLine = lines[0];
  const names = nameLine.split(',').slice(1);

  for (let i = weekIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('WEEK') || line === '') break;

    const columns = line.split(',');
    const levelColumn = columns[0];
    
    const match = levelColumn.match(/\[(\d+)\]/);
    if (!match || match[1] !== levelId) continue;

    for (let j = 1; j < columns.length; j++) {
      if (columns[j].trim().toLowerCase() === 'complete') {
        victors.push(names[j - 1]);
      }
    }
  }

  return victors;
}
