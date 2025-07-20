<script>
  import kfLeaderboard from "/kf-leaderboard.png";

  export let leaderboardVisible;

  function showPopup() {
    leaderboardVisible = true;
  }

  const position = {
    right: '10%',
    bottom: '15%',
    translate: ''
  };
</script>

<button
  class="absolute max-h-[130px] flex flex-col items-center justify-center text-center space-y-2 py-2 lb-item item-4"
  style={`
    right: ${position.right};
    bottom: ${position.bottom};
    ${position.translate ? `transform: translate(${position.translate});` : ''}
  `}
  on:click={showPopup}
>
  <p class="text-stroke-2 text-2xl w-full" style="-webkit-text-stroke: 1px black;">Leaderboards</p>
  <img
    src={kfLeaderboard}
    alt="leaderboard"
    class="max-h-[130px] w-auto block shrink-0 mb-9"
  />
</button>
