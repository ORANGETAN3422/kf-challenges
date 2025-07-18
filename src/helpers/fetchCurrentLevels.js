const apiGDDL = 'https://kf-list-orangetan3422s-projects.vercel.app/api/level/';
const apiColon = 'https://kf-list-orangetan3422s-projects.vercel.app/api/colon/';
const levelAmount = 4;
const emptyLines = 2;
const CACHE_PREFIX = 'challenge_';
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

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

function getCachedChallenge(id) {
  const cached = localStorage.getItem(`${CACHE_PREFIX}${id}`);
  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached);
    const now = Date.now();

    if (now - parsed.timestamp < CACHE_TTL) {
      return parsed.data;
    } else {
      localStorage.removeItem(`${CACHE_PREFIX}${id}`); // stale
    }
  } catch {
    localStorage.removeItem(`${CACHE_PREFIX}${id}`); // corrupted
  }

  return null;
}

function cacheChallenge(id, data) {
  localStorage.setItem(`${CACHE_PREFIX}${id}`, JSON.stringify({
    timestamp: Date.now(),
    data: data
  }));
}

async function fetchChallenges(ids) {
  const fetches = ids.map(async id => {
    const cached = getCachedChallenge(id);
    if (cached) {
      console.log(`Using cached challenge ${id}`);
      return cached;
    }

    try {
      const res = await fetch(`${apiGDDL}${id}`);
      if (!res.ok) throw new Error('not found on gddl');
      const data = await res.json();

      const challenge = {
        id: data.ID,
        name: data.Meta.Name,
        creator: data.Meta.Creator,
        difficulty: data.Meta.Difficulty + " Demon",
        stars: 10,
        gddl: data.Rating
      };

      cacheChallenge(id, challenge);
      return challenge;
    } catch {
      const fallbackRes = await fetch(`${apiColon}${id}`);
      if (!fallbackRes.ok) throw new Error('colons are no workey');
      const data = await fallbackRes.json();

      const challenge = {
        id: data.id,
        name: data.name,
        creator: data.author,
        difficulty: data.difficulty,
        stars: data.stars,
        gddl: 0
      };

      cacheChallenge(id, challenge);
      return challenge;
    }
  });

  return Promise.all(fetches);
}

export async function fetchCurrentLevels(csvData, currentWeek) {
  const ids = extractCurrentIds(csvData, currentWeek);
  const challenges = await fetchChallenges(ids);
  return challenges;
}