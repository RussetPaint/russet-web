<script lang="ts">
  import { onDestroy } from "svelte";

  let windowContainerRef: HTMLElement;
  let windowRef: HTMLElement;
  let leftRef: HTMLElement;
  let rightRef: HTMLElement;
  let topRef: HTMLElement;
  let bottomRef: HTMLElement;

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

    const { left, right, top, bottom } = windowRef.getBoundingClientRect();
    [windowContainerRef, leftRef, rightRef, topRef, bottomRef].forEach(
      (el) => (el.style.cssText = ""),
    );
    leftRef.style.flex = left.toString();
    rightRef.style.flex = (window.innerWidth - right).toString();
    topRef.style.flex = top.toString();
    bottomRef.style.flex = (window.innerHeight - bottom).toString();
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
  <div bind:this={leftRef} style="flex: 10"></div>
  <div class="flex flex-col">
    <div bind:this={topRef} style="flex: 1000"></div>
    <div bind:this={windowRef} class="window">
      <slot />
    </div>
    <div bind:this={bottomRef} style="flex: 10"></div>
  </div>
  <div bind:this={rightRef} style="flex: 1000"></div>
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
