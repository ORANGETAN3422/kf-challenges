const apiBase = 'https://kf-list-orangetan3422s-projects.vercel.app/api/level/';
const levelAmount = 4
const emptyLines = 2

function extractCurrentIds(csvText, currentWeek) {
  const lines = csvText.split('\n').map(line => line.trim());
  const currentIndex = lines.findIndex(line => line.includes(`WEEK ${currentWeek}`));

  const ids = [];
  for (let i = 1; i <= levelAmount + emptyLines; i++) {
    const line = lines[currentIndex + i];
    const match = line.match(/\[(\d+)\]/);
    if (match) {
      ids.push(match[1]);
    }
  }

  return ids;
}

async function fetchChallenges(ids) {
  const fetches = ids.map(id =>
    fetch(`${apiBase}${id}`).then(res => res.json())
  );

  return Promise.all(fetches);
}

export async function fetchCurrentLevels(csvData, currentWeek) {
  const ids = extractCurrentIds(csvData, currentWeek);
  const challenges = await fetchChallenges(ids);
  return challenges;
}
