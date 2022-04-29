import { WebGLRenderer } from 'three';

function createRenderer(canvas: any) {
  const renderer = new WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  return renderer;
}

export { createRenderer };
