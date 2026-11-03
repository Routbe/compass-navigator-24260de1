/** Temporary read-only probe: pick a public profile whose card can be opened. */
import { runBatch } from "@/lib/neon";

async function main() {
  const cols = await runBatch(
    [{ query: "select column_name from information_schema.columns where table_name='profiles' order by 1", params: [] }],
    { withContext: false },
  );
  console.log("columns:", cols[0]!.rows.map((r) => String(r.column_name)).join(", "));

  const rows = await runBatch(
    [{ query: "select handle, display_name, visibility, is_verified from profiles where handle is not null limit 12", params: [] }],
    { withContext: false },
  );
  console.log("sample:", JSON.stringify(rows[0]!.rows, null, 1));
}
void main().catch((e) => console.log("FAILED:", (e as Error).message));
