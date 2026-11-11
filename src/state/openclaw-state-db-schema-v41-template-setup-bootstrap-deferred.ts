/**
 * Exact predecessor DDL for native admission and PostgreSQL backup restoration.
 *
 * `workspace_setup_state.bootstrap_deferred` is a lazy-additive column, so its
 * introduction did not bump the state schema version. It still edits
 * `openclaw-state-schema.sql`, and every predecessor projection derives from that
 * file - without this transform the edit retires the generated catalog entries for
 * every real database left on the previous layout, including databases that never
 * installed the column.
 *
 * Companion to `withLegacyDevicePairingBrowserRequests` (v40). A database at the
 * 11.2 layout needs BOTH edits reversed for the chain to reproduce its bytes.
 */
export function withLegacyTemplateSetupBootstrapDeferred(schema: string): string {
  return schema.replace(
    /(^CREATE TABLE IF NOT EXISTS workspace_setup_state \([\s\S]*?\) STRICT;)/mu,
    (block) => block.replace(/^[ \t]*bootstrap_deferred[ \t]+INTEGER,[ \t]*\r?\n/mu, ""),
  );
}
