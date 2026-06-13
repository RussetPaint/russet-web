export function getCoords(canvas: HTMLCanvasElement, event: PointerEvent) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const { clientX, clientY } = event;
  let canvasX = (clientX - rect.left) * scaleX;
  let canvasY = (clientY - rect.top) * scaleY;

  canvasX = Math.min(Math.max(0, canvasX), canvas.width);
  canvasY = Math.min(Math.max(0, canvasY), canvas.height);

  return { x: canvasX, y: canvasY };
}
