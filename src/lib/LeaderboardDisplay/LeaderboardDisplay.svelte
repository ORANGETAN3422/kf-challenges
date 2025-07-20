<script>
  // @ts-nocheck

  import kfFrame01 from "/frames/kf-frame-01.png";
  import closeIcon from "/icons/close.png";
  import gddlIcon from "/icons/gddl.ico";
  import starIcon from "/icons/star.png";

  import { fetchLeaderboard } from "../../helpers/fetchLevelRecords";

  import CurrentWeekDisplay from "./CurrentWeekDisplay.svelte";
  import AllTimeDisplay from "./AllTimeDisplay.svelte";

  export let leaderboardVisible;
  export let csvData;
  export let currentWeek;

  let allTimeRecords = {};
  let currentWeekRecords = {};

  $: allTimeRecords = fetchLeaderboard(csvData, currentWeek, true);
  $: currentWeekRecords = fetchLeaderboard(csvData, currentWeek);
  $: dynamicHeight2 = `${50 + currentWeekRecords.length * 35}px`;

  function hidePopup() {
    leaderboardVisible = false;
  }
</script>

{#if leaderboardVisible}
  <div class="level-popup ml-[-20px] fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
    <div class="relative">
      <img src={kfFrame01} alt="background" class="min-w-[480px] max-w-[480px]" />

      <div class="absolute top-[43px] left-[50px] w-[380px] h-[630px] text-white text-xl overflow-scroll scroll-container !pointer-events-auto">
        <button
          class="absolute top-1 right-1 w-[65px] h-[65px] hover:scale-110 !p-0 z-100 x-button"
          on:click={hidePopup}
        >
          <img src={closeIcon} alt="X" class="w-full h-auto" />
        </button>

        <h3
          class="absolute top-[10px] ml-[40px] text-4xl text-center z-20 drop-shadow-md font-bold bg-gradient-to-b from-[#ffd500] to-[#ffbc70] bg-clip-text text-transparent"
          style="-webkit-text-stroke: black 1.5px;"
        >
          Leaderboards
        </h3>

        <CurrentWeekDisplay {currentWeekRecords} />
        <AllTimeDisplay {allTimeRecords} />
      </div>
    </div>
  </div>
{/if}
