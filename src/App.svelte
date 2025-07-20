<script>
  import { onMount } from "svelte";
  import { fetchCurrentLevels } from "./helpers/fetchCurrentLevels.js";
  import { fetchCsv, fetchCurrentWeek } from "./helpers/fetchCsv.js";

  import GauntletDisplay from "./lib/GauntletDisplay/GauntletDisplay.svelte";
  import LevelDisplay from "./lib/LevelDisplay/LevelDisplay.svelte";
  import LeaderboardDisplay from "./lib/LeaderboardDisplay/LeaderboardDisplay.svelte";

  import kfBackground from "/kf-background.png";

  let currentWeek;
  let csvData;
  let currentLevels = [];

  export let currentViewedLevel;
  export let levelDetailVisible = false;
  export let leaderboardVisible = false;

  onMount(async () => {
    csvData = await fetchCsv();
    currentWeek = await fetchCurrentWeek(csvData);
    currentLevels = await fetchCurrentLevels(csvData, currentWeek);
    currentViewedLevel = currentLevels[0];
  });

  onMount(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
  });
</script>

<main class="w-full h-full overflow-y-hidden">
  <img
    class="fixed inset-0 w-full object-cover object-[center_bottom] z-[-10] brightness-25"
    style="height: calc(var(--vh, 1vh) * 100)"
    src={kfBackground}
    alt="background"
  />

  {#if !csvData}
    <h2 class="text-5xl text-stroke-2 wrap-break-word">
      Loading Current Challenge
    </h2>
  {:else if currentLevels.length === 0}
    <h2 class="text-5xl text-stroke-2 wrap-break-word">Loading Level Info</h2>
  {:else}
    <GauntletDisplay
      {currentLevels}
      {currentWeek}
      bind:levelDetailVisible
      bind:currentViewedLevel
      bind:leaderboardVisible
    />
    <LevelDisplay
      {currentWeek}
      {csvData}
      bind:levelDetailVisible
      bind:currentViewedLevel
    />
    <LeaderboardDisplay
      {currentWeek}
      {csvData}
      bind:leaderboardVisible
    />
  {/if}
</main>
