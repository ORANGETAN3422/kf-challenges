<script>
  import kfGauntlet from "/kf-gauntlet.png";

  export let index;
  export let levelInfo;

  const gauntletPositions = [
    { left: '10%', bottom: '10%', translate: '' },
    { left: '27%', top: '20%', translate: '' },
    { left: '50%', bottom: '10%', translate: '-50%, 0' },
    { right: '27%', top: '20%', translate: '' },
    { right: '10%', bottom: '10%', translate: '' }
  ];

  const pos = gauntletPositions[index];
</script>

<button
  class="absolute max-h-[140px] flex flex-col items-center justify-center text-center space-y-2 py-2"
  style={`
    ${pos.left ? `left: ${pos.left};` : ''}
    ${pos.right ? `right: ${pos.right};` : ''}
    ${pos.top ? `top: ${pos.top};` : ''}
    ${pos.bottom ? `bottom: ${pos.bottom};` : ''}
    ${pos.translate ? `transform: translate(${pos.translate});` : ''}
  `}
>
  <p class="text-stroke-2 text-xl w-full">{levelInfo.Meta.Name}</p>
  <img
    src={kfGauntlet}
    alt="gauntlet"
    class="max-h-[130px] w-auto block shrink-0"
  />
</button>
