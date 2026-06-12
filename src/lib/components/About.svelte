<script lang="ts">
  import { version } from "./../../../package.json";
</script>

<div class="about">
  <p>Russet is simple paint powered by Svelte and Tailwind.</p>
  <p>Created by George Noise (VulpesDust).</p>
  <p>v{version}</p>
</div>

<style>
  @reference "tailwindcss";

  .about {
    @apply px-2;
  }
</style>
