<script>
  import PersonName from "./PersonName.svelte";

  export let currentWeekRecords;
  $: dynamicHeight = `${50 + currentWeekRecords.length * 37}px`;
</script>

<div class="absolute current-week overflow-scroll scroll-container h-[265px] w-full top-[75px] left-0">
  <div
    class="absolute left-[3%] w-[94%] bg-yellow-950/50 rounded-xl px-2 py-1 z-20 drop-shadow-md transition-all duration-300 !overflow-y-hidden"
    style="height: {dynamicHeight};"
  >
    <h3
      class="text-2xl font-bold bg-gradient-to-b from-[#ffd500] to-[#ffbc70] bg-clip-text text-transparent"
      style="-webkit-text-stroke: black 1px;"
    >
      This Week
    </h3>

    {#each currentWeekRecords as person, index}
      <PersonName {index} {person} />
    {/each}
  </div>
</div>
