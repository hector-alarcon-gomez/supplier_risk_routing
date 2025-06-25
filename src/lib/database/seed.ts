import { Database } from 'better-sqlite3';

export function seedSuppliers(db: Database) {
  const exists: number = db.prepare('SELECT COUNT(*) as count FROM suppliers')?.get()?.count || 0;

  if (exists > 0) return;

  const suppliers = [
    { name: "Zentra Logistics", risk_score: 9, risk_categories: "compliance,financial", location: "New York", industry: "Logistics" },
    { name: "MediCore Ltd", risk_score: 8, risk_categories: "financial,regulatory", location: "Berlin", industry: "Healthcare" },
    { name: "TechNova", risk_score: 6, risk_categories: "operational", location: "San Francisco", industry: "Technology" },
    { name: "AgroWorld", risk_score: 5, risk_categories: "compliance", location: "São Paulo", industry: "Agriculture" },
    { name: "BuildPro", risk_score: 7, risk_categories: "environmental,financial", location: "Toronto", industry: "Construction" },
    { name: "PharmaSure", risk_score: 10, risk_categories: "compliance,regulatory", location: "Zurich", industry: "Healthcare" },
    { name: "SafeFoods", risk_score: 4, risk_categories: "safety", location: "Amsterdam", industry: "Food" },
    { name: "EcoTrans", risk_score: 7, risk_categories: "environmental", location: "Oslo", industry: "Transport" }
  ];

  const stmt = db.prepare(`
    INSERT INTO suppliers (name, risk_score, risk_categories, location, industry)
    VALUES (?, ?, ?, ?, ?)
  `);

  db.transaction(() => {
    for (const s of suppliers) {
      stmt.run(s.name, s.risk_score, s.risk_categories, s.location, s.industry);
    }
  })();
}
