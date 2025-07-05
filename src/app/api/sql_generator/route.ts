import { systemPrompt } from '@/utils/sql_generator_prompt';
import { formatRowsSummary } from '@/lib/humanize';
import Database from 'better-sqlite3';

const db = new Database('sqlite.db');

async function queryLLM(userQuery: string) {
  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'phi3',
      prompt: `${systemPrompt}\nUser: ${userQuery}`,
      stream: false,
      format: {
        type: 'object',
        sql: { type: 'string' },
        params: { type: 'array', items: { type: 'string' } },
        summary: { type: 'string' }
      }
    })
  });

  const data = await res.json();
  const parsed = JSON.parse(data.response);

  return parsed;
}

export async function POST(req: Request) {
  const { messages } = await req.json();
  const userMessage = messages[messages.length - 1].content;

  let llmResult = await queryLLM(userMessage);
  console.log("llmResult");
  console.log(llmResult);

  if (!llmResult?.sql) return Response.json({ error: 'invalid LLM output' }, { status: 400 });

  const { sql, params, summary } = llmResult;

  let resultRows;
  try {
    const stmt = db.prepare(sql);
    resultRows = stmt.all(...(params || []));
  } catch (error) {
    const retryPrompt = `${systemPrompt}\nThe last SQL failed with this error:\n${error.message}\nFix it and retry.\nUser: ${userMessage}`;
    llmResult = await queryLLM(retryPrompt);

    try {
      const stmt = db.prepare(sql);
      resultRows = stmt.all(...(params || []));
    } catch (finalError) {
      return Response.json({ error: 'SQL failed again', details: finalError.message }, { status: 500 });
    }
  }

  const friendlySummary = formatRowsSummary(resultRows, summary);
  return Response.json({ rows: resultRows, summary: friendlySummary });
}
