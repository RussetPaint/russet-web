<script lang="ts">
  import { paletteRow1, paletteRow2 } from "$lib";

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

<div class="palette relative">
  <div class="fixed left-10 bottom-10">
    <div class="selected-colors">
      <button
        class="selected"
        style="background-color: {color1};"
        aria-hidden="true"
      ></button>
      <button
        class="selected"
        style="background-color: {color2};"
        aria-hidden="true"
      ></button>
    </div>

    <div class="flex flex-col gap-1">
      {#each [paletteRow1, paletteRow2] as palette}
        <div class="flex gap-1">
          {#each palette as color}
            <button
              type="button"
              style="background-color: {color}"
              aria-hidden="true"
              onmousedown={($event) => selectColor($event, color)}
              oncontextmenu={($event) => $event.preventDefault()}
            ></button>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  @reference "tailwindcss";

  button,
  .selected {
    @apply w-4 h-4;
  }
</style>
