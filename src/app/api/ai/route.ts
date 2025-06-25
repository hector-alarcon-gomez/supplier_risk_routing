import { systemPrompt } from '@/utils/prompts';
import {
  getTopSuppliers,
  getSuppliersByIndustry,
  getSuppliersByRiskCategory,
  getSuppliersByLocation
} from '@/lib/actions';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const lastMessage = messages[messages.length - 1]?.content;

  // TODO: move LLM logic to another file
  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'phi3',
      prompt: `${systemPrompt}\nUser: ${lastMessage}`,
      stream: false,
      format: {
        "type": "object",
        "actions": {
          "type": "string",
        },
        "filters": {
          "properties": {
            "industry": {
              "type": "string",
            },
            "category": {
              "type": "string",
            },
            "location": {
              "type": "string",
            },
            "limit": {
              "type": "number",
            },
            "invalid": {
              "type": "string",
            }
          },
        },
      }
    })
  });

  const data = await res.json();
  const parsed = JSON.parse(data.response);

  if (!parsed) return new Response('Could not parse JSON', { status: 400 });

  const { action, filters } = parsed;

  // TODO: validate input
  // TODO: conver to lower case
  let result;
  switch (action) {
    case 'getTopSuppliers':
      result = getTopSuppliers(filters);
      break;
    case 'getSuppliersByIndustry':
      result = getSuppliersByIndustry(filters);
      break;
    case 'getSuppliersByRiskCategory':
      result = getSuppliersByRiskCategory(filters);
      break;
    case 'getSuppliersByLocation':
      result = getSuppliersByLocation(filters);
      break;
    default:
      result = { error: 'Unknown action' };
  }

  // TODO: use another LLM to respond using the json as context
  return Response.json({ result });
}
