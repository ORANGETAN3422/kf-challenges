<script>
  import kfFrame01 from "/frames/kf-frame-01.png";
  import closeIcon from "/icons/close.png";
  import gddlIcon from "/icons/gddl.ico";
  import starIcon from "/icons/star.png";

  import { checkPoints, copyToClipboard } from "../../helpers/utilities";

  export let currentViewedLevel;
  export let levelDetailVisible;

  let isPulsing = false;

  function copy(text) {
    copyToClipboard(text);
    isPulsing = true;
    setTimeout(() => (isPulsing = false), 500);
  }

  function hidePopup() {
    levelDetailVisible = false;
  }
</script>

{#if levelDetailVisible}
  <div
    class="level-popup absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50"
  >
    <img
      src={kfFrame01}
      alt="background"
      class="h-auto min-w-120 max-w-120 z-50"
    />

    <div class="absolute top-[43px] left-[50px] w-[380px] h-[630px] flex text-center overflow-scroll">
      <img
        src={`https://tjcsucht.net/levelthumbs/${currentViewedLevel.id}.png`}
        alt=""
        class="absolute top-0 left-0 h-auto w-full z-51 bg-gradient-to-t from-white to-transparent"
        style="
        mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
        -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
      "
      />

      <button
        class="absolute !p-0 top-1 right-1 w-[65px] h-[65px] z-60 drop-shadow-2xl hover:scale-110"
        on:click={hidePopup}
      >
        <img src={closeIcon} alt="X" class="w-full h-auto" />
      </button>

      <h3
        class="absolute text-white w-full top-[170px] left-0 z-55 text-4xl"
        style="
        -webkit-text-stroke: black 1.5px;
        filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.4));
      "
      >
        {currentViewedLevel.name}
      </h3>

      <div
        class="z-55 absolute top-[20px] left-[15px] flex flex-row select-none"
      >
        <img
          src={currentViewedLevel.gddl === 0 ? starIcon : gddlIcon}
          alt="*"
          class="w-[2em] h-[2em] mr-1"
        />
        <p
          class="text-3xl"
          style="
          -webkit-text-stroke: black 1px;
          filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.4));
        "
        >
          {currentViewedLevel.gddl === 0
            ? currentViewedLevel.stars
            : Math.floor(currentViewedLevel.gddl)}
        </p>
      </div>

      <div
        class="z-55 p-2 absolute top-[217px] left-[3%] w-[94%] h-[77px] bg-yellow-950/[0.5] rounded-xl text-xl text-left text-white"
        style="
        -webkit-text-stroke: black 0.7px;
        filter: drop-shadow(1.5px 1.5px 0 rgba(0, 0, 0, 0.4));
      "
      >
        <p>
          {checkPoints(currentViewedLevel.gddl)} Point{checkPoints(
            currentViewedLevel.gddl
          ) === 1
            ? ""
            : "s"} on completion
        </p>
        <p>
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          ID:
          <span
            on:click={() => copy(currentViewedLevel.id)}
            class="cursor-pointer {isPulsing ? 'pulse-animate' : ''}"
          >
            {currentViewedLevel.id}
          </span>
        </p>
      </div>

      <div
        class="z-55 p-2 absolute top-[302px] left-[3%] w-[94%] h-[104px] bg-yellow-950/[0.5] rounded-xl text-xl text-left text-white"
        style="
        -webkit-text-stroke: black 0.7px;
        filter: drop-shadow(1.5px 1.5px 0 rgba(0, 0, 0, 0.4));
      "
      >
        <p>
          Difficulty:
          {currentViewedLevel.difficulty}
        </p>
        <p>
            Created by 
            {currentViewedLevel.creator}
        </p>
        <p>
            GD Browser: <i><a aria-label="gd browser" href={`https://gdbrowser.com/${currentViewedLevel.id}`} target="_blank">{currentViewedLevel.name}</a></i>
        </p>
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
