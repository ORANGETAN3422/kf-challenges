export function checkPoints(gddl) {
  const thresholds = [
    { max: 1, points: 1 }, // EASY
    { max: 6, points: 2 }, // MEDIUM
    { max: 11, points: 4 }, // HARD
    { max: 15, points: 7 }, // INSANE
  ];

  for (const { max, points } of thresholds) {
    if (gddl <= max) return points;
  }

  return undefined;
}

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}
