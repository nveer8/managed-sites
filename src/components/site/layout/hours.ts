import type { DayOfWeek, OpeningHours } from "@/engine/schema/types";

const ORDER: DayOfWeek[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const NAMES: Record<DayOfWeek, string> = { Mo: "Mon", Tu: "Tue", We: "Wed", Th: "Thu", Fr: "Fri", Sa: "Sat", Su: "Sun" };

export function formatTime(time: string): string {
  const [h = 0, m = 0] = time.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, "0")}${suffix}`;
}

export function formatDays(days: DayOfWeek[]): string {
  const sorted = [...days].sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  if (!first || !last) return "";
  const contiguous = ORDER.indexOf(last) - ORDER.indexOf(first) === sorted.length - 1;
  if (sorted.length > 2 && contiguous) return `${NAMES[first]}–${NAMES[last]}`;
  return sorted.map((d) => NAMES[d]).join(", ");
}

export function formatHoursLine(h: OpeningHours): string {
  return `${formatDays(h.days)} ${formatTime(h.opens)}–${formatTime(h.closes)}`;
}

export function formatHoursShort(hours: OpeningHours[]): string {
  return hours.map(formatHoursLine).join(" · ");
}
