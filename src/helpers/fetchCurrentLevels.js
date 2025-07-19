const apiGDDL = 'https://kf-list-orangetan3422s-projects.vercel.app/api/level/';
const apiColon = 'https://kf-list-orangetan3422s-projects.vercel.app/api/colon/';
const levelAmount = 4;
const emptyLines = 2;

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
  const fetches = ids.map(async id => {
    try {
      const res = await fetch(`${apiGDDL}${id}`);
      if (!res.ok) throw new Error('not found on gddl');
      const data = await res.json();

      return {
        id: data.ID,
        name: data.Meta.Name,
        creator: data.Meta.Creator,
        difficulty: data.Meta.Difficulty + " Demon",
        stars: 10,
        gddl: data.Rating
      };
    } catch {
      const fallbackRes = await fetch(`${apiColon}${id}`);
      if (!fallbackRes.ok) throw new Error('colons are no workey');
      const data = await fallbackRes.json();

      return {
        id: data.id,
        name: data.name,
        creator: data.author,
        difficulty: data.difficulty,
        stars: data.stars,
        gddl: 0
      };
    }
  });

  return Promise.all(fetches);
}

export async function fetchCurrentLevels(csvData, currentWeek) {
  const ids = extractCurrentIds(csvData, currentWeek);
  const challenges = await fetchChallenges(ids);
  return challenges;
}
