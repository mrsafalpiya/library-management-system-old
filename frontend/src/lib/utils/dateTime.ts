export function formatDateTime(dateTime: Date): string {
  const d = new Date(dateTime);
  return d.toLocaleString({ weekday: "long", year: "numeric", month: "short", day: "numeric" });
}

export function formatDate(dateTime: Date): string {
  const d = new Date(dateTime);
  return d.toLocaleDateString({ weekday: "long", year: "numeric", month: "short", day: "numeric" });
}
