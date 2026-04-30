#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

say() {
  printf '[preflight] %s\n' "$*"
}

fail() {
  printf '[preflight] ERROR: %s\n' "$*" >&2
  exit 1
}

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "required command not found: $1"
}

need_cmd git
need_cmd node
need_cmd npm
need_cmd gh
need_cmd curl

expected_node="$(tr -d '[:space:]' < .nvmrc)"
actual_node="$(node -p 'process.versions.node')"
actual_major="${actual_node%%.*}"

say "repo: $ROOT_DIR"
say "node: $actual_node"
say "npm: $(npm -v)"

[[ "$actual_major" == "$expected_node" ]] || fail "Node major $actual_major does not match .nvmrc ($expected_node)"

[[ -n "${CODEX_HOME:-}" ]] || fail "CODEX_HOME is not set"
[[ -d "$CODEX_HOME" ]] || fail "CODEX_HOME does not exist: $CODEX_HOME"
[[ -w "$CODEX_HOME" ]] || fail "CODEX_HOME is not writable: $CODEX_HOME"
say "CODEX_HOME: $CODEX_HOME"

git remote get-url origin >/dev/null 2>&1 || fail "git remote 'origin' is not configured"
git ls-remote --exit-code origin HEAD >/dev/null 2>&1 || fail "cannot reach git remote origin"
say "git remote origin reachable"

gh auth status >/dev/null 2>&1 || fail "gh is not authenticated for GitHub"
say "GitHub auth OK"

curl -fsSIL https://www.notion.so >/dev/null 2>&1 || fail "cannot reach Notion"
say "Notion reachable"

if ! git diff --quiet || ! git diff --cached --quiet; then
  fail "git worktree is dirty; automation should start from a clean checkout"
fi
say "git worktree clean"

if [[ ! -d node_modules ]]; then
  fail "node_modules missing; run npm ci before automation"
fi
say "node_modules present"

say "preflight passed"
