#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

say() {
  printf '[preflight:ci] %s\n' "$*"
}

fail() {
  printf '[preflight:ci] ERROR: %s\n' "$*" >&2
  exit 1
}

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "required command not found: $1"
}

need_cmd git
need_cmd node
need_cmd npm

expected_node="$(tr -d '[:space:]' < .nvmrc)"
actual_node="$(node -p 'process.versions.node')"
actual_major="${actual_node%%.*}"

say "repo: $ROOT_DIR"
say "node: $actual_node"
say "npm: $(npm -v)"

[[ "$actual_major" == "$expected_node" ]] || fail "Node major $actual_major does not match .nvmrc ($expected_node)"

git remote get-url origin >/dev/null 2>&1 || fail "git remote 'origin' is not configured"
say "git remote origin configured"

if [[ ! -d node_modules ]]; then
  fail "node_modules missing; run npm ci before verification"
fi
say "node_modules present"

say "CI preflight passed"
