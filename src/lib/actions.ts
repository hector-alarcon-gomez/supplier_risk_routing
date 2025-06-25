import { db } from './database/db';

export function getTopSuppliers({ limit = 3 }) {
  return db.prepare('SELECT * FROM suppliers ORDER BY risk_score DESC LIMIT ?').all(limit);
}

export function getSuppliersByIndustry({ industry }: { industry: string }) {
  return db.prepare('SELECT * FROM suppliers WHERE industry = ?').all(industry);
}

export function getSuppliersByRiskCategory({ category }: { category: string }) {
  return db.prepare('SELECT * FROM suppliers WHERE risk_categories LIKE ?').all(`%${category}%`);
}

export function getSuppliersByLocation({ location }: { location: string }) {
  return db.prepare('SELECT * FROM suppliers WHERE location = ?').all(location);
}
