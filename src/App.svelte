<script>
  import { onMount } from "svelte";
  import { fetchCurrentLevels } from "./helpers/fetchCurrentLevels.js";
  import { fetchCsv, fetchCurrentWeek } from "./helpers/fetchCsv.js";

  import GauntletDisplay from "./lib/GauntletDisplay.svelte";

  import kfBackground from "/kf-background.png";

  let currentWeek;
  let csvData;
  let currentLevels = [];

  onMount(async () => {
    csvData = await fetchCsv();
    currentWeek = await fetchCurrentWeek(csvData);
    currentLevels = await fetchCurrentLevels(csvData, currentWeek);
  });
</script>

<main class="w-full">
  <img
    class="fixed inset-0 w-full h-full object-cover object-[center_bottom] z-[-10] brightness-25"
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
    <GauntletDisplay {currentLevels} {currentWeek} />
  {/if}
</main>
