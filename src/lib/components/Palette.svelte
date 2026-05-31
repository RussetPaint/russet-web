<script lang="ts">
  import { paletteRows } from "$lib";

  let color1 = $state("#fff");
  let color2 = $state("#000");

  function selectColor(event: MouseEvent, color: string) {
    if (event.button === 0) {
      color1 = color;
    } else if (event.button === 2) {
      color2 = color;
    }
  }

  export function getColor(colorNumber: 1 | 2) {
    if (colorNumber === 1) {
      return color1;
    }
    if (colorNumber === 2) {
      return color2;
    }
    return "black";
  }
</script>

<div class="palette left-10 bottom-10">
  <div class="selected-colors">
    <button
      type="button"
      class="color"
      style="background: {color1};"
      title="Left mouse button color {color1}"
    ></button>
    <button
      type="button"
      class="color"
      style="background: {color2};"
      title="Right mouse button color {color2}"
    ></button>
  </div>

  <div class="flex flex-col">
    {#each paletteRows as palette}
      <div class="flex">
        {#each palette as color}
          <button
            type="button"
            class="color"
            style="background: {color}"
            title="color {color}"
            onmousedown={($event) => selectColor($event, color)}
            oncontextmenu={($event) => $event.preventDefault()}
          ></button>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  @reference "tailwindcss";

  .palette {
    @apply fixed;
  }

  .selected-colors {
    @apply flex mb-2;
  }

  button.color {
    @apply w-5 h-5;
  }
</style>
