<script>
  import kfGauntlet from "/kf-gauntlet.png";
  import gddlIcon from "/icons/gddl.ico";
  import starIcon from "/icons/star.png";

  export let index;
  export let levelInfo;
  export let levelDetailVisible;
  export let currentViewedLevel;

  const gauntletPositions = [
    { left: "10%", bottom: "10%", translate: "", center: false },
    { left: "27%", top: "20%", translate: "", center: false },
    { left: "50%", bottom: "10%", translate: "-50%, 0", center: true },
    { right: "27%", top: "20%", translate: "", center: false },
    { right: "10%", bottom: "10%", translate: "", center: false },
  ];

  const pos = gauntletPositions[index];

  function showPopup() {
    levelDetailVisible = true;
    currentViewedLevel = levelInfo;
  }
</script>

<button
  class={`absolute max-h-[140px] flex flex-col items-center justify-center text-center space-y-2 py-2 origin-center transition-transform duration-200 hover:scale-105
      ${pos.center ? "transform -translate-x-1/2" : ""}
      ${index === 0 || 1 ? "target" : ""}
      item-${index}
    `}
  style={`
      ${pos.left ? `left: ${pos.left};` : ""}
      ${pos.right ? `right: ${pos.right};` : ""}
      ${pos.top ? `top: ${pos.top};` : ""}
      ${pos.bottom ? `bottom: ${pos.bottom};` : ""}
    `}
  on:click={showPopup}
>
  <p class=" text-2xl w-full" style="-webkit-text-stroke: 1px black;">
    {levelInfo.name}
  </p>
  <img
    src={kfGauntlet}
    alt="gauntlet"
    class="max-h-[130px] w-auto block shrink-0"
  />
  <p
    class="text-2xl flex items-center align-middle flex-row"
    style="-webkit-text-stroke: 1px black;"
  >
    <img
      class="w-[1em] mr-1"
      src={levelInfo.gddl === 0 ? starIcon : gddlIcon}
      alt="*"
    />
    {levelInfo.gddl === 0 ? levelInfo.stars : Math.floor(levelInfo.gddl)}
  </p>
</button>
