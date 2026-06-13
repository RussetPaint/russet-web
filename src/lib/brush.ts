import Palette from "$lib/components/Palette.svelte";
import { getCoords } from "$lib/canvasUtil";

interface brushDrawParams {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  palette: Palette;
  lastPointerEvent: PointerEvent;
  event: PointerEvent;

  lineWidth: number;
}

export function draw(params: brushDrawParams) {
  const { canvas, ctx, palette, event } = params;
  let { lastPointerEvent, lineWidth } = params;

  if (!lineWidth) {
    lineWidth = 5;
  }

  const lmb = event.buttons === 1;
  const rmb = event.buttons === 2;

  for (const e of event.getCoalescedEvents()) {
    const last = getCoords(canvas, lastPointerEvent);
    const pos = getCoords(canvas, e);

    if (ctx && (lmb || rmb)) {
      ctx.beginPath();
      ctx.strokeStyle = palette.getColor(lmb ? 1 : 2);
      ctx.lineCap = "round";
      ctx.lineWidth = lineWidth;
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    lastPointerEvent = e;
  }
}
