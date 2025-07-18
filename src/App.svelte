<script>
  import { onMount } from "svelte";
  import { fetchCurrentLevels } from "./helpers/fetchCurrentLevels.js";
  import { fetchCsv, fetchCurrentWeek } from "./helpers/fetchCsv.js";

  import GauntletDisplay from "./lib/GauntletDisplay.svelte";

  let currentWeek;
  let csvData;
  let currentLevels = [];

  onMount(async () => {
    csvData = await fetchCsv();
    currentWeek = await fetchCurrentWeek(csvData)
    currentLevels = await fetchCurrentLevels(csvData, currentWeek);
  });
</script>

<main class="w-full">
  {#if !csvData}
    <h2 class="text-5xl text-stroke-2 wrap-break-word">Loading Current Challenge</h2>
  {:else if currentLevels.length === 0}
    <h2 class="text-5xl text-stroke-2 wrap-break-word">Loading Level Info</h2>
  {:else}
    <GauntletDisplay {currentLevels} {currentWeek}/>
  {/if}
</main>
