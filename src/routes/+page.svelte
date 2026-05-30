<script lang="ts">
  import About from "$lib/components/About.svelte";
  import Palette from "$lib/components/Palette.svelte";
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let lastMousePosition: MouseEvent | null;

  let palette: Palette;

  let isTopPannelOpen = $state(false);
  let selectedTopPannelButton = $state<string>();

  function switchTopPannel(buttonName: string) {
    isTopPannelOpen = !isTopPannelOpen;
    selectedTopPannelButton = buttonName;
  }

  function hoverTopPannel(buttonName: string) {
    selectedTopPannelButton = buttonName;
  }

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

<Palette bind:this={palette} />

<div class="flex px-1 gap-1 bg-gray-300">
  {#each ["File", "About"] as button}
    <div class="relative">
      <button
        type="button"
        class="hover:bg-amber-600"
        onclick={() => switchTopPannel(button)}
        onmousemove={() => hoverTopPannel(button)}
      >
        {button}
      </button>
      {#if isTopPannelOpen && button === selectedTopPannelButton}
        <div class="absolute top-6 flex flex-col whitespace-nowrap bg-gray-400">
          {#if button === "File"}
            <button disabled type="button" class="text-gray-500">
              Open File
            </button>
            <button disabled type="button" class="text-gray-500">
              Save File
            </button>
          {:else if button === "About"}
            <About />
          {/if}
        </div>
      {/if}
    </div>
  {/each}
</div>
<div class="flex flex-col">
  <canvas
    bind:this={canvas}
    onmousemove={draw}
    oncontextmenu={($event) => $event.preventDefault()}
  ></canvas>
</div>

<style>
  @reference "tailwindcss";

  button {
    @apply px-2;
  }
</style>
