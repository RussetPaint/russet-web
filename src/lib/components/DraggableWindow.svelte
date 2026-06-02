<script lang="ts">
  import { onDestroy } from "svelte";

  let { children, left = 10, right = 1000, top = 1000, bottom = 10 } = $props();

  let windowContainerRef: HTMLElement;
  let windowRef: HTMLElement;

  let dragStart: MouseEvent | null;

  function onMouseDown(event: MouseEvent) {
    event.preventDefault();
    dragStart = event;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(event: MouseEvent) {
    if (dragStart) {
      const deltaX2 = event.clientX - dragStart.clientX;
      const deltaY2 = event.clientY - dragStart.clientY;
      windowContainerRef.style.transform = `translate(${deltaX2}px, ${deltaY2}px)`;
    }
  }

  function onMouseUp() {
    dragStart = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);

    const rect = windowRef.getBoundingClientRect();
    windowContainerRef.style.cssText = "";
    left = rect.left;
    right = window.innerWidth - rect.right;
    top = rect.top;
    bottom = window.innerHeight - rect.bottom;
  }

  onDestroy(() => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  });
</script>

<div
  role="button"
  tabindex="0"
  bind:this={windowContainerRef}
  onmousedown={onMouseDown}
  class="windowContainer flex"
>
  <div style="flex: {left}"></div>
  <div class="flex flex-col">
    <div style="flex: {top}"></div>
    <div bind:this={windowRef} class="window">
      {@render children?.()}
    </div>
    <div style="flex: {bottom}"></div>
  </div>
  <div style="flex: {right}"></div>
</div>

<style>
  @reference "tailwindcss";

  .windowContainer {
    pointer-events: none;
    @apply fixed top-0 left-0 w-full h-full;
  }

  .window {
    pointer-events: auto;
    background: #fff8;
    @apply p-4 rounded-xl;
  }
</style>
