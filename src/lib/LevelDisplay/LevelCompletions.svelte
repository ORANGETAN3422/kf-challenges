<script>
  import { findRecordsForLevel } from "../../helpers/fetchLevelRecords";

  export let csvData;
  export let currentViewedLevel;
  export let currentWeek;

  let records = [];

  $: records = findRecordsForLevel(csvData, currentWeek, currentViewedLevel.id);
  $: dynamicHeight = `${50 + records.length * 35}px`;
</script>

<div
  class="absolute top-[412px] left-[3%] w-[94%] bg-yellow-950/50 rounded-xl px-2 py-1 z-20 drop-shadow-md transition-all duration-300 !overflow-y-hidden"
  style="height: {dynamicHeight};"
>
<h3 class="text-2xl font-bold bg-gradient-to-b from-[#ffd500] to-[#ffbc70] bg-clip-text text-transparent" style="-webkit-text-stroke: black 1px;">Victors</h3>
  {#each records as name}
    <div class="text-white py-1 border-b border-yellow-800/[50%] last:border-none">
      {name}
    </div>
  {/each}
</div>
