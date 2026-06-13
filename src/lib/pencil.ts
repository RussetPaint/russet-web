import Palette from "$lib/components/Palette.svelte";
import { draw as brush } from "$lib/brush";

interface pencilDrawParams {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  palette: Palette;
  lastPointerEvent: PointerEvent;
  event: PointerEvent;
}

export function draw(params: pencilDrawParams) {
  brush({ ...params, lineWidth: 1 });
}
