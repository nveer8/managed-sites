/** Marks demo content so it is never mistaken for a real customer claim. */
export function SampleTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-[3px] border border-current px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] opacity-70 ${className}`}
    >
      Sample
    </span>
  );
}
