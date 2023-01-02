interface CornerRadius {
  tl: number;
  tr: number;
  bl: number;
  br: number;
}

export function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number | CornerRadius
) {
  if (radius === 0) {
    context.rect(x, y, width, height);
    return;
  }
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  }

  // restrict radius to a reasonable max
  radius = {
    tl: Math.min(radius.tl, height / 2, width / 2),
    tr: Math.min(radius.tr, height / 2, width / 2),
    bl: Math.min(radius.bl, height / 2, width / 2),
    br: Math.min(radius.br, height / 2, width / 2),
  };

  context.moveTo(x + radius.tl, y);
  context.arcTo(x + width, y, x + width, y + radius.tr, radius.tr);
  context.arcTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height,
    radius.br
  );
  context.arcTo(x, y + height, x, y + height - radius.bl, radius.bl);
  context.arcTo(x, y, x + radius.tl, y, radius.tl);
}
