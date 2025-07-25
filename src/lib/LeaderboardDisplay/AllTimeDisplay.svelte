<script>
  import PersonName from "./PersonName.svelte";

  export let allTimeRecords;
  $: dynamicHeight = `${50 + allTimeRecords.length * 37}px`;
</script>

<div class="absolute all-time overflow-scroll scroll-container h-[265px] w-full top-[352px] left-0">
  <div
    class="absolute left-[3%] w-[94%] bg-yellow-950/50 rounded-xl px-2 py-1 z-20 drop-shadow-md transition-all duration-300 !overflow-y-hidden"
    style="height: {dynamicHeight};"
  >
    <h3
      class="text-2xl font-bold bg-gradient-to-b from-[#ffd500] to-[#ffbc70] bg-clip-text text-transparent"
      style="-webkit-text-stroke: black 1px;"
    >
      All Time
    </h3>

    {#each allTimeRecords as person, index}
      <PersonName {index} {person} />
    {/each}
  </div>
</div>
