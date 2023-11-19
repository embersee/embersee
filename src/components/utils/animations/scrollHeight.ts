export function vhToPixels(vh: number) {
  return Math.round(window.innerHeight / (100 / vh));
}
