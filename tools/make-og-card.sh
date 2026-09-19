#!/usr/bin/env bash
#
# Regenerate assets/og-card.png from tools/og-card.html.
#
# This is a design asset, not part of the site build. The Docker build has no
# browser, so the PNG is generated here and committed. Run this only when the
# card's design or copy changes.
#
# Usage:  tools/make-og-card.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT=8939
OUT="$ROOT/assets/og-card.png"

# The agent-browser CLI is a global npm module, not on PATH.
NODE_BIN="${NODE_BIN:-/Users/darms/.workbuddy-ai/binaries/node/versions/22.22.2-2/bin/node}"
CLI="${AGENT_BROWSER_CLI:-/Users/darms/.workbuddy-ai/binaries/node/versions/22.22.2-2/lib/node_modules/agent-browser/bin/agent-browser.js}"

if [ ! -f "$CLI" ]; then
  echo "agent-browser CLI not found at: $CLI" >&2
  echo "Set AGENT_BROWSER_CLI to its path." >&2
  exit 1
fi

echo "serving $ROOT on port $PORT"
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$ROOT" >/dev/null 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT
sleep 1.5

# Exactly 1200x630 at device pixel ratio 1, so the PNG is the right size for
# og:image without any resampling.
"$NODE_BIN" "$CLI" --session ogcard set viewport 1200 630 1 >/dev/null
"$NODE_BIN" "$CLI" --session ogcard open "http://127.0.0.1:$PORT/tools/og-card.html" >/dev/null

# Wait for the webfont. Without this the card renders in a fallback face.
sleep 2.5

"$NODE_BIN" "$CLI" --session ogcard screenshot "$OUT" >/dev/null
"$NODE_BIN" "$CLI" --session ogcard close --all >/dev/null 2>&1 || true

python3 - "$OUT" <<'PY'
import struct, sys, pathlib
p = pathlib.Path(sys.argv[1])
d = p.read_bytes()
w, h = struct.unpack(">II", d[16:24])
print(f"wrote {p}  {w}x{h}px  {len(d) / 1024:.0f} KB")
if (w, h) != (1200, 630):
    raise SystemExit(f"wrong size: expected 1200x630, got {w}x{h}")
PY
