<script lang="ts">
  import TopPannel from "$lib/components/TopPannel.svelte";
  import Palette from "$lib/components/Palette.svelte";
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let lastMousePosition: MouseEvent | null;

  let palette: Palette;

  onMount(() => {
    canvas.width = 1920;
    canvas.height = 920;
    ctx = canvas.getContext("2d");
  });

  function draw(event: MouseEvent) {
    const last = getCoords(lastMousePosition ? lastMousePosition : event);
    const pos = getCoords(event);
    const lmb = event.buttons === 1;
    const rmb = event.buttons === 2;
    if (ctx && (lmb || rmb)) {
      ctx.beginPath();
      ctx.strokeStyle = palette.getColor(lmb ? 1 : 2);
      ctx.lineWidth = 5;
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    lastMousePosition = lmb || rmb ? event : null;
  }

  function getCoords(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const { clientX, clientY } = event;
    let canvasX = (clientX - rect.left) * scaleX;
    let canvasY = (clientY - rect.top) * scaleY;

    canvasX = Math.min(Math.max(0, canvasX), canvas.width);
    canvasY = Math.min(Math.max(0, canvasY), canvas.height);

    return { x: canvasX, y: canvasY };
  }
</script>

<TopPannel />
<Palette bind:this={palette} />

<div class="flex flex-col">
  <canvas
    bind:this={canvas}
    onmousemove={draw}
    oncontextmenu={($event) => $event.preventDefault()}
  ></canvas>
</div>
