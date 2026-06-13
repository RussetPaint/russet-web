<script lang="ts">
  let selected = "Brush";
  let tools = ["Pencil", "Brush"]; // "Eraser"

  function select(tool: string) {
    selected = tool;
  }

  export function getTool() {
    return selected;
  }
</script>

<div class="grid grid-cols-2 gap-1">
  {#each tools as tool}
    <button
      title={tool}
      onclick={() => select(tool)}
      class:selected={tool == selected}
    >
      <svg viewBox="0 -960 960 960" fill="#eee">
        {#if tool == "Pencil"}
          <path
            d="M168-121q-21 5-36.5-10.5T121-168l35-170 182 182-170 35Zm235-84L205-403l413-413q23-23 57-23t57 23l84 84q23 23 23 57t-23 57L403-205Z"
          />
        {:else if tool == "Brush"}
          <path
            d="M240-120q-45 0-89-22t-71-58q26 0 53-20.5t27-59.5q0-50 35-85t85-35q50 0 85 35t35 85q0 66-47 113t-113 47Zm230-240L360-470l358-358q11-11 27.5-11.5T774-828l54 54q12 12 12 28t-12 28L470-360Z"
          />
        {:else if tool == "Eraser"}
          <path
            d="M690-240h190v80H610l80-80Zm-500 80-85-85q-23-23-23.5-57t22.5-58l440-456q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L520-160H190Z"
          />
        {/if}
      </svg>
    </button>
  {/each}
</div>

<style>
  @reference "tailwindcss";
  button {
    @apply size-7 rounded-sm bg-gray-500;
  }

  .selected {
    @apply bg-gray-700;
  }
</style>
