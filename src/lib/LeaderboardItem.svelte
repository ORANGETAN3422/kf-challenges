<script>
  import kfLeaderboard from "/kf-leaderboard.png";

  const position = {
    right: '10%',
    bottom: '10%',
    translate: ''
  };
</script>

<button
  class="absolute max-h-[130px] flex flex-col items-center justify-center text-center space-y-2 py-2"
  style={`
    right: ${position.right};
    bottom: ${position.bottom};
    ${position.translate ? `transform: translate(${position.translate});` : ''}
  `}
>
  <p class="text-stroke-2 text-2xl w-full">Leaderboards</p>
  <img
    src={kfLeaderboard}
    alt="leaderboard"
    class="max-h-[130px] w-auto block shrink-0 mb-9"
  />
</button>
