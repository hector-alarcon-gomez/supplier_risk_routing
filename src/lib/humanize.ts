export function formatRowsSummary(rows: any[], summary: string) {
  if (!rows || rows.length === 0) return 'No results found.';
  const lines = rows.map(r => `• ${r.name} (${r.industry}, Risk: ${r.risk_score})`);
  return `${summary}\n\n${lines.join('\n')}`;
}
