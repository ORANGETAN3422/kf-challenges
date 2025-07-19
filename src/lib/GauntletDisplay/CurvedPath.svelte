<script>
  import { onMount } from "svelte";

  let canvas;
  const numDots = 7;

  export let selectorOne;
  export let selectorTwo;

  function getCubicPoint(t, p0, p1, p2, p3) {
    const x =
      (1 - t) ** 3 * p0.x +
      3 * (1 - t) ** 2 * t * p1.x +
      3 * (1 - t) * t ** 2 * p2.x +
      t ** 3 * p3.x;
    const y =
      (1 - t) ** 3 * p0.y +
      3 * (1 - t) ** 2 * t * p1.y +
      3 * (1 - t) * t ** 2 * p2.y +
      t ** 3 * p3.y;
    return { x, y };
  }

  function draw() {
    const objOne = document.querySelector(selectorOne);
    const objTwo = document.querySelector(selectorTwo);

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const elements = document.querySelectorAll(".target");
    if (elements.length < 2) return;

    const canvasRect = canvas.getBoundingClientRect();
    const startRect = objOne.getBoundingClientRect();
    const endRect = objTwo.getBoundingClientRect();
    const offset = 20;

    // Start point: right center of first element
    const p0 = {
      x: startRect.right - canvasRect.left - offset,
      y: startRect.top + startRect.height / 2 - canvasRect.top,
    };

    // End point: left center of second element
    const p3 = {
      x: endRect.left - canvasRect.left + offset,
      y: endRect.top + endRect.height / 2 - canvasRect.top,
    };

    const dx = p3.x - p0.x;
    const dy = p3.y - p0.y;

    const p1 = {
      x: p0.x + dx * 2.4,
      y: p0.y - Math.abs(dx) * 0.5,
    };
    const p2 = {
      x: p0.x + dx * -0.8,
      y: p3.y + Math.abs(dx) * 0.5,
    };

    // Draw dots along the curve
    ctx.font = "48px pusab";
    ctx.fillStyle = "lightgrey";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    for (let i = 0; i <= numDots; i++) {
      const t = i / numDots;
      const pt = getCubicPoint(t, p0, p1, p2, p3);

      ctx.fillText(".", pt.x, pt.y);
      ctx.strokeText(".", pt.x, pt.y);
    }
  }

  onMount(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    draw();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    });
  });
</script>

<canvas
  bind:this={canvas}
  style="position: fixed; top: 0; left: 0; pointer-events: none; z-index: -1;"
></canvas>
