<script lang="ts">
  import TopPannel from "$lib/components/TopPannel.svelte";
  import Palette from "$lib/components/Palette.svelte";
  import { onMount } from "svelte";
  import DraggableWindow from "$lib/components/DraggableWindow.svelte";
  import ToolBox from "$lib/components/ToolBox.svelte";
  import { draw as brush } from "$lib/brush";
  import { draw as pencil } from "$lib/pencil";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let lastPointerEvent: PointerEvent | null;

  let toolbox: ToolBox;
  let palette: Palette;

  onMount(() => {
    canvas.width = 1920;
    canvas.height = 920;
    ctx = canvas.getContext("2d");
  });

  function onpointerdown(event: PointerEvent) {
    lastPointerEvent = event;
  }

  function onpointermove(event: PointerEvent) {
    if (
      !lastPointerEvent ||
      (event.buttons !== 1 && event.buttons !== 2) ||
      !ctx
    ) {
      return;
    }

    switch (toolbox.getTool()) {
      case "Pencil":
        pencil({ canvas, ctx, palette, lastPointerEvent, event });
        break;
      case "Brush":
        brush({
          canvas,
          ctx,
          palette,
          lastPointerEvent,
          event,
          lineWidth: 5,
        });
        break;
      case "Eraser":
        // TODO
        break;
    }

    lastPointerEvent = event;
  }

  function onpointerup(event: PointerEvent) {
    onpointermove(event);
    lastPointerEvent = null;
  }
</script>

<TopPannel {canvas} />
<DraggableWindow top={10} bottom={50}>
  <ToolBox bind:this={toolbox} />
</DraggableWindow>
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
