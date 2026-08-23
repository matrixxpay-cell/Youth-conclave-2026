/** Full-viewport grain plate. Sits above everything, catches no pointer events. */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 z-[150] overflow-hidden"
    />
  );
}
