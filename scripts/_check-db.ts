/** Temporary read-only probe: which material does each stored card design use? */
import { runBatch } from "@/lib/neon";

async function main() {
  const rows = await runBatch(
    [{
      query: `select serial,
                     cmf #>> '{material,id}' as material,
                     cmf #>> '{accentHex}' as accent
              from public.card_designs limit 10`,
      params: [],
    }],
    { withContext: false },
  );
  console.log("designs:", JSON.stringify(rows[0]!.rows, null, 1));
}
void main().catch((e) => console.log("FAILED:", (e as Error).message));
