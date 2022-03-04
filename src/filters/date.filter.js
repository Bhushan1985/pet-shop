export function dateFilter (value) {
  if (!value) return
  return new Date(value).toLocaleString("default", {year: 'numeric', month: 'short', day: 'numeric'})
}

export function timeFilter (value) {
  if (!value) return
  return new Date(value).toLocaleString("default", {hour: '2-digit', minute: '2-digit'})
}

