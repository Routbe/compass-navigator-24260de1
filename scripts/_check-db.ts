/** Temporary read-only probe: pick a public profile whose card can be opened. */
import { runBatch } from "@/lib/neon";

async function main() {
  const rows = await runBatch(
    [{
      query: `select username, display_name, status, verified, tier,
                     subdomain_alias, alias_status, root_subdomain_status,
                     left(card_style::text, 60) as card_style
              from profiles where username is not null limit 12`,
      params: [],
    }],
    { withContext: false },
  );
  console.log("sample:", JSON.stringify(rows[0]!.rows, null, 1));
}
void main().catch((e) => console.log("FAILED:", (e as Error).message));
