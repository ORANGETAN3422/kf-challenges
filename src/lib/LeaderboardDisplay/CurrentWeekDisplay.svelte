<script>
  export let currentWeekRecords;
  $: dynamicHeight = `${50 + currentWeekRecords.length * 35}px`;
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
      <div class="flex justify-between items-center py-1 border-b border-yellow-800/[50%] last:border-none text-white px-2">
        <div class="flex items-center gap-2">
          <span class="font-bold text-yellow-400">{index + 1}.</span>
          <span>{person.name}</span>
        </div>
        <div class="text-yellow-300 font-semibold">
          {person.points} pts
        </div>
      </div>
    {/each}
  </div>
</div>
