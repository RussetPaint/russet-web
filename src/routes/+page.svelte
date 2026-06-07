<script lang="ts">
  import TopPannel from "$lib/components/TopPannel.svelte";
  import Palette from "$lib/components/Palette.svelte";
  import { onMount } from "svelte";
  import DraggableWindow from "$lib/components/DraggableWindow.svelte";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let lastPointerEvent: MouseEvent | null;

  let palette: Palette;

  onMount(() => {
    canvas.width = 1920;
    canvas.height = 920;
    ctx = canvas.getContext("2d");
  });

  function onpointerdown(event: MouseEvent) {
    lastPointerEvent = event;
  }

  function onpointermove(event: PointerEvent) {
    if (!lastPointerEvent || (event.buttons !== 1 && event.buttons !== 2)) {
      return;
    }

    const lmb = event.buttons === 1;
    const rmb = event.buttons === 2;

    for (const e of event.getCoalescedEvents()) {
      const last = getCoords(lastPointerEvent);
      const pos = getCoords(e);

      if (ctx && (lmb || rmb)) {
        ctx.beginPath();
        ctx.strokeStyle = palette.getColor(lmb ? 1 : 2);
        ctx.lineCap = "round";
        ctx.lineWidth = 5;
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }
      lastPointerEvent = e;
    }

    lastPointerEvent = event;
  }

  function onpointerup(event: PointerEvent) {
    onpointermove(event);
    lastPointerEvent = null;
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
<DraggableWindow><Palette bind:this={palette} /></DraggableWindow>

<div class="flex flex-col">
  <canvas
    bind:this={canvas}
    {onpointerdown}
    {onpointermove}
    {onpointerup}
    oncontextmenu={($event) => $event.preventDefault()}
  ></canvas>
</div>
