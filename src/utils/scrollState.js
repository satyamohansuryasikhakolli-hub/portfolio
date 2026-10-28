/**
 * Global high-performance scroll state tracker.
 * Read directly in Three.js useFrame loops to bypass React re-render overhead.
 */
export const scrollState = {
  progress: 0,
  velocity: 0,
  scrollY: 0,
};

export function updateScrollState(progress, velocity = 0, scrollY = 0) {
  scrollState.progress = Math.max(0, Math.min(1, progress));
  scrollState.velocity = velocity;
  scrollState.scrollY = scrollY;
}
