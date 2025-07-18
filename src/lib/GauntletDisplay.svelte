<script>
  import GauntletItem from "./GauntletItem.svelte";
  import LeaderboardItem from "./LeaderboardItem.svelte";

  const displayHeight = 500;

  export let currentLevels = [];
  export let currentWeek;
</script>

<h1
  class="text-5xl font-bold bg-gradient-to-b from-[#ffd500] to-[#ffbc70] bg-clip-text text-transparent"
  style="-webkit-text-stroke: 2px black;"
>
  Karma Farm Challenges - Week {parseInt(currentWeek, 10)}
</h1>

<div class={`w-[1200px] h-[${displayHeight}px] mx-auto ml-[-20px]`}>
  <div class="relative w-full h-full">
    {#each currentLevels as level, i}
      <GauntletItem index={i} levelInfo={currentLevels[i]} />
    {/each}

    <LeaderboardItem />
  </div>
</div>
