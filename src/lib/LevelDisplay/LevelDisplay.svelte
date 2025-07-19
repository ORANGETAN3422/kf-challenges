<script>
  import kfFrame01 from "/frames/kf-frame-01.png";
  import closeIcon from "/icons/close.png";
  import gddlIcon from "/icons/gddl.ico";
  import starIcon from "/icons/star.png";

  import LevelCompletions from "./LevelCompletions.svelte";

  import { checkPoints, copyToClipboard } from "../../helpers/utilities";

  export let currentViewedLevel;
  export let levelDetailVisible;
  export let csvData;
  export let currentWeek;

  let isPulsing = false;

  function copy(text) {
    copyToClipboard(text);
    isPulsing = true;
    setTimeout(() => (isPulsing = false), 500);
  }

  function hidePopup() {
    levelDetailVisible = false;
  }

  $: points = checkPoints(currentViewedLevel.gddl);
</script>

{#if levelDetailVisible}
  <div class="level-popup fixed inset-0 z-50 flex items-center justify-center">
    <div class="relative">
      <img src={kfFrame01} alt="background" class="min-w-120 max-w-120" />

      <div class="absolute top-[43px] left-[50px] w-[380px] h-[630px] text-white text-xl overflow-scroll">
        <img
          src={`https://tjcsucht.net/levelthumbs/${currentViewedLevel.id}.png`}
          alt=""
          class="absolute top-0 left-0 w-full z-10"
          style="mask-image: linear-gradient(to bottom, black 85%, transparent); -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent);"
        />

        <button
          class="absolute top-1 right-1 w-[65px] h-[65px] z-20 hover:scale-110 !p-0"
          on:click={hidePopup}
        >
          <img src={closeIcon} alt="X" class="w-full h-auto" />
        </button>

        <h3 class="absolute w-full top-[170px] text-4xl text-center z-20 drop-shadow-md font-bold bg-gradient-to-b from-[#ffd500] to-[#ffbc70] bg-clip-text text-transparent" style="-webkit-text-stroke: black 1.5px;">
          {currentViewedLevel.name}
        </h3>

        <div class="absolute top-5 left-4 flex items-center z-20 select-none">
          <img
            src={currentViewedLevel.gddl === 0 ? starIcon : gddlIcon}
            alt="*"
            class="w-[2em] h-[2em] mr-2"
          />
          <p class="text-3xl drop-shadow" style="-webkit-text-stroke: black 1px;">
            {currentViewedLevel.gddl === 0 ? currentViewedLevel.stars : Math.floor(currentViewedLevel.gddl)}
          </p>
        </div>

        <div class="absolute top-[217px] left-[3%] w-[94%] h-[67px] bg-yellow-950/50 rounded-xl px-2 py-1 z-20 drop-shadow-md">
          <p>{points} Point{points === 1 ? '' : 's'} on completion</p>
          <p>
            ID: 
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <span
              on:click={() => copy(currentViewedLevel.id)}
              class="cursor-pointer"
              class:pulse-animate={isPulsing}
            >
              {currentViewedLevel.id}
            </span>
          </p>
        </div>

        <div class="absolute top-[292px] left-[3%] w-[94%] h-[104px] bg-yellow-950/50 rounded-xl px-2 py-1 z-20 drop-shadow-md">
          <p>Difficulty: {currentViewedLevel.difficulty}</p>
          <p>Created by {currentViewedLevel.creator}</p>
          <p>
            GD Browser: 
            <i>
              <a
                href={`https://gdbrowser.com/${currentViewedLevel.id}`}
                target="_blank"
                class="underline hover:text-blue-300"
              >
                {currentViewedLevel.name}
              </a>
            </i>
          </p>
        </div>

        <LevelCompletions {csvData} {currentWeek} {currentViewedLevel} />

      </div>
    </div>
  </div>
{/if}

<style>
  .pulse-animate {
    animation: pulse 1s ease-out;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      color: rgb(200, 200, 255);
    }
    50% {
      transform: scale(1.2);
      color: white;
    }
    100% {
      transform: scale(1);
      color: white;
    }
  }
</style>
