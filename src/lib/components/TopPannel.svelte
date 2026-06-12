<script lang="ts">
  import About from "./About.svelte";

  let { canvas }: { canvas: HTMLCanvasElement } = $props();

  let isTopPannelOpen = $state(false);
  let selectedTopPannelButton = $state<string>();

  function switchTopPannel(buttonName: string) {
    isTopPannelOpen = !isTopPannelOpen;
    selectedTopPannelButton = buttonName;
  }

  function hoverTopPannel(buttonName: string) {
    selectedTopPannelButton = buttonName;
  }

  function saveImage() {
    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const link = document.createElement("a");
      link.download = "new Image.jpg";
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    });
  }
</script>

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
            <button type="button" onclick={saveImage}> Save File </button>
          {:else if button === "About"}
            <About />
          {/if}
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  @reference "tailwindcss";

  button {
    @apply px-2;
  }
</style>
