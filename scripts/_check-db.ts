/** Temporary read-only probe: is the gateway reachable and are there profiles? */
import { databaseTransport, runBatch } from "@/lib/neon";

async function main() {
  console.log("transport:", databaseTransport());
  try {
    const r = await runBatch(
      [
        { query: "select current_user as who", params: [] },
        { query: "select count(*)::int as n from profiles", params: [] },
      ],
      { withContext: false },
    );
    console.log("who:", JSON.stringify(r[0]?.rows));
    console.log("profiles:", JSON.stringify(r[1]?.rows));
  } catch (e) {
    console.log("FAILED:", (e as Error).message, (e as Error & { code?: string }).code);
  }
}
void main();
