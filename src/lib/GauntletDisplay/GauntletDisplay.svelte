<script>
  import GauntletItem from "./GauntletItem.svelte";
  import LeaderboardItem from "./LeaderboardItem.svelte";
  import CurvedPath from "./CurvedPath.svelte";

  export let currentLevels = [];
  export let currentWeek;
  export let levelDetailVisible;
  export let currentViewedLevel;
  export let leaderboardVisible;
</script>

<div class={`w-[1200px] h-[580px] mx-auto ml-[-20px] overflow-hidden`}>
  <h1
  class="text-5xl font-bold bg-gradient-to-b from-[#ffd500] to-[#ffbc70] bg-clip-text text-transparent w-full relative"
  style="-webkit-text-stroke: 2px black;"
>
  Karma Farm Challenges - Week {parseInt(currentWeek, 10)}
</h1>
  <div class="relative w-full h-full">
    {#each currentLevels as level, i}
      <GauntletItem index={i} levelInfo={currentLevels[i]} bind:levelDetailVisible={levelDetailVisible} bind:currentViewedLevel={currentViewedLevel}/>
    {/each}
    <LeaderboardItem bind:leaderboardVisible />
    <CurvedPath selectorOne=".item-0" selectorTwo=".item-1"/>
    <CurvedPath selectorOne=".item-1" selectorTwo=".item-2"/>
    <CurvedPath selectorOne=".item-2" selectorTwo=".item-3"/>
    <CurvedPath selectorOne=".item-3" selectorTwo=".item-4"/>
  </div>
</div>
