import { systemPrompt } from '@/utils/sql_generator_prompt';
import Database from 'better-sqlite3';

const db = new Database('sqlite.db');

export async function POST(req: Request) {
  const { messages } = await req.json();
  const last = messages[messages.length - 1].content;

  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'phi3',
      prompt: `${systemPrompt}\nUser: ${last}`,
      stream: false,
      format: {
        "type": "object",
        "sql": {
          "type": "string",
        },
        "summary": {
          "type": "string",
        },
      }
    })
  });

  const data = await res.json();
  const parsed = JSON.parse(data.response);

  if (!parsed?.sql) return Response.json({ error: 'invalid LLM output' }, { status: 400 });

  const { sql, summary } = parsed;

  let rows;
  try {
    console.log(`Generated SQL`);
    console.log(sql);
    rows = db.prepare(sql).all();
  } catch (e: any) {
    return Response.json({ error: 'SQL error', details: e.message });
  }

  return Response.json({ rows, summary: summary });
}
